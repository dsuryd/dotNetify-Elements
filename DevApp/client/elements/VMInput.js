import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import * as utils from './utils';

export class VMInput {

    constructor(context, propId) {
        this.context = context;
        this.propId = propId;
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
            onChange: this.onChange,
            attrs: attrs
        }
    }

    get isRequired() {
        return this.context.getValidations(this.propId).filter(v => v.Type === "Required").length > 0;
    }

    set(value) {
        this.context.setState({ [this.propId]: value });
    }

    dispatch(value) {
        value = value === undefined ? this.value : value;
        this.validate(value);
        this.context.dispatchState({ [this.propId]: value });
    }

    validate(value) {
        return this.context.getValidations(this.propId)
            .map(v => this.getValidator(v.Type)(value) === true ? v.Message : null)
            .filter(e => e);
    }

    getValidator(type) {
        const funcName = "validate" + type;
        const prototype = Object.getPrototypeOf(this);
        return prototype.hasOwnProperty(funcName) ? prototype[funcName] : () => true;
    }

    validateRequired(value) {
        return !value || value.trim() === "";
    }
}