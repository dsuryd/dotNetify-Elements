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
        return this.validations.filter(v => v.type === "Required").length > 0;
    }

    addValidation(validation) {
        this.validations.push(validation);
    }

    validate(value) {
        if (value === undefined)
            value = this.value;

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

    getValidator(validation) {
        if (typeof validation.validate === 'function')
            return validation.validate;

        const funcName = "validate" + validation.type;
        const prototype = Object.getPrototypeOf(this);
        return prototype.hasOwnProperty(funcName) ? prototype[funcName] : () => true;
    }

    validateRequired(value) {
        return typeof value != 'undefined' && value != null && (typeof value != 'string' || value.trim().length > 0);
    }

    validatePattern(value, validation) {
        return !value || new RegExp(validation.pattern).test(value);
    }

    onValidated(handler) {
        if (typeof handler === "function")
            this.handleValidated = handler;
    }
}