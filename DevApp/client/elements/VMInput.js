import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import * as utils from './utils';

export class VMInput {

    constructor(context, propId) {
        this.context = context;
        this.propId = propId;
    }

    set = value => this.context.setState({ [this.propId]: value });
    dispatch = value => this.context.dispatchState({ [this.propId]: value === undefined ? this.value : value });

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
}