import React from 'react';
import VMProperty from './VMProperty';
import VMInputValidator from './VMInputValidator';

export default class VMInput extends VMProperty {

    constructor(vmContext, propId) {
        super(vmContext, propId);

        // If this input field is inside the Form context, get the validator from the context
        // so that the Form can validate all its input fields.  Otherwise, create it here.
        this.validator = this.vmContext.getValidator ? this.vmContext.getValidator(vmContext, propId) : new VMInputValidator(vmContext, propId);
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
        this.vmContext.dispatchState({ [this.propId]: value });
    }

    onValidated(handler) {
        this.validator.onValidated(handler);
    }
}