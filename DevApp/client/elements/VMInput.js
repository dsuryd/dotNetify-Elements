import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import VMInputValidator from './VMInputValidator';
import * as utils from './utils';

export default class VMInput {

    constructor(context, propId) {
        this.context = context;
        this.propId = propId;
        this.validator = this.context.getValidator ? this.context.getValidator(context, propId) : new VMInputValidator(context, propId);
    }

    get value() {
        return this.context.getState(this.propId);
    }

    set value(value) {
        this.set(value);
        this.dispatch(value);
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

    set(value) {
        this.context.setState({ [this.propId]: value });
    }

    dispatch(value) {
        value = value === undefined ? this.value : value;

        this.validator.validate(value);
        this.context.dispatchState({ [this.propId]: value });
    }

    onValidated(handler) {
        this.validator.onValidated(handler);
    }
}