import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import VMInputValidator from './VMInputValidator';
import * as utils from './utils';

export default class VMInput {

    constructor(context, propId) {
        this.context = context;
        this.propId = propId;

        // If this input field is inside the Form context, get the validator from the context
        // so that the Form can validate all its input fields.  Otherwise, create it here.
        this.validator = this.context.getValidator ? this.context.getValidator(context, propId) : new VMInputValidator(context, propId);
    }

    get value() {
        return this.context.getState(this.propId);
    }

    set value(value) {
        this.context.setState({ [this.propId]: value });
    }

    get props() {
        const attrs = this.context.getPropAttributes(this.propId);
        return {
            id: `${this.context.vmId}.${this.propId}`,
            value: this.value,
            attrs: attrs
        }
    }

    get isRequired() {
        return this.validator.isRequired;
    }

    addValidation(validation) {
        // This is used for adding client-side validation(s).
        validation = Array.isArray(validation) ? validation : [validation];
        this.validator.addValidation(validation);
    }

    dispatch(newValue) {
        if (typeof newValue != "undefined")
            this.value = newValue;

        const value = typeof newValue != "undefined" ? newValue : this.value;
        this.validator.validate(value);
        this.context.dispatchState({ [this.propId]: value });
    }

    onValidated(handler) {
        this.validator.onValidated(handler);
    }
}