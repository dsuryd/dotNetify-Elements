import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import * as utils from './utils';

export default class VMInputValidator {

    constructor(context, propId) {
        this.context = context;
        this.propId = propId;
        this.handleValidated = null;
        this.validations = this.context.getPropValidations(propId) || [];
    }

    get value() {
        return this.context.getState(this.propId);
    }

    get isRequired() {
        return this.validations.filter(v => v.type.toLowerCase() === "required").length > 0;
    }

    addValidation(validation) {
        this.validations.push(...validation);
    }

    getValidator(validation) {
        if (typeof validation.validate === 'function')
            return validation.validate;

        const funcName = "validate" + validation.type;
        const prototype = Object.getPrototypeOf(this);
        return prototype.hasOwnProperty(funcName) ? (prototype[funcName]).bind(this) : () => true;
    }

    onValidated(handler) {
        if (typeof handler === "function")
            this.handleValidated = handler;
    }

    validate(value) {
        value = value === undefined ? this.value : value;

        const validationMessages = this.validations
            .map(validation => this.getValidator(validation)(value, validation) === false ? validation.message : null)
            .filter(message => message);

        const result = {
            valid: validationMessages.length == 0,
            messages: validationMessages
        }

        this.handleValidated && this.handleValidated(result);
        return result;
    }

    validateRequired(value) {
        return typeof value != 'undefined' && value != null && (typeof value != 'string' || value.trim().length > 0);
    }

    validatePattern(value, validation) {
        return !value || new RegExp(validation.pattern).test(value);
    }

    validateServer(value, validation) {
        this.context.dispatchState({[this.propId]: value}, true);
    }
}