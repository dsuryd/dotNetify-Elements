import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import * as utils from './utils';

export default class VMInputValidator {

   constructor(context, propId) {
      this.context = context;
      this.propId = propId;
      this.handleValidated = null;
   }

   get value() {
      return this.context.getState(this.propId);
  }

   get isRequired() {
      return this.context.getPropValidations(this.propId).filter(v => v.Type === "Required").length > 0;
   }

   validate(value) {
      if (value === undefined)
         value = this.value;

      const validationMessages = this.context.getPropValidations(this.propId)
         .map(validation => this.getValidator(validation.Type)(value, validation) === false ? validation.Message : null)
         .filter(message => message);
      
      const result = {
         valid: validationMessages.length == 0,
         messages: validationMessages
      }

      this.handleValidated && this.handleValidated(result);
      return result;
   }

   getValidator(type) {
      const funcName = "validate" + type;
      const prototype = Object.getPrototypeOf(this);
      return prototype.hasOwnProperty(funcName) ? prototype[funcName] : () => true;
   }

   validateRequired(value) {
      return typeof value != 'undefined' && value != null && (typeof value != 'string' || value.trim().length > 0) ;
   }

   validatePattern(value, validation) {
      return new RegExp(validation.Pattern).test(value);
   }

   onValidated(handler) {
      if (typeof handler === "function")
         this.handleValidated = handler;
   }
}