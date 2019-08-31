import VMProperty from './VMProperty';

export default class VMInputValidator extends VMProperty {
   constructor(vmContext, propId) {
      super(vmContext, propId);
      this.handleValidated = null;
      this.validations = this.vmContext.getPropValidations(propId) || [];
   }

   get isRequired() {
      return this.validations.filter(v => v.type && v.type.toLowerCase() === 'required').length > 0;
   }

   addValidation(validation) {
      this.validations.push(...validation);
   }

   clear() {
      const result = { valid: true, messages: [] };
      this.handleValidated && this.handleValidated(result);
   }

   getValidator(validation) {
      // Custom client-side validator.
      if (typeof validation.validate === 'function') return validation.validate;

      // Pre-defined client-side validator.
      const funcName = 'validate' + validation.type;
      const prototype = Object.getPrototypeOf(this);
      return prototype.hasOwnProperty(funcName) ? prototype[funcName].bind(this, validation) : () => true;
   }

   onValidated(handler) {
      if (typeof handler === 'function') this.handleValidated = handler;
      return () => (this.handleValidated = null);
   }

   validate(value) {
      // Not all validator may run synchronously, so we'll use promise for all.
      return new Promise(resolve => {
         value = typeof value == 'undefined' ? this.value || null : value;

         // Run every validator of the input field and aggregate the results.
         Promise.all(this.validations.map(validation => this.runValidator(validation, value))).then(results => {
            const messages = results.map(result => (result.isValid === false ? result.message : null)).filter(message => message);

            const result = { inputId: this.propId, valid: messages.length == 0, messages: messages };
            this.handleValidated && this.handleValidated(result);
            resolve(result);
         });
      });
   }

   runValidator(validation, value) {
      // Not all validator runs synchronously, so turn every validator output into a promise.
      const result = this.getValidator(validation)(value);
      return result instanceof Promise ? result : new Promise(resolve => resolve({ isValid: result, message: validation.message }));
   }

   validatePattern(validation, value) {
      return !value || new RegExp(validation.pattern).test(value);
   }

   validateRange(validation, value) {
      const num = parseFloat(value);
      const validMin = !(typeof validation.min == 'number' && num < validation.min);
      const validMax = !(typeof validation.max == 'number' && num > validation.max);
      return validMin && validMax;
   }

   validateRequired(validation, value) {
      return !(typeof value == 'undefined' || value == null) && !(typeof value == 'string' && value.trim().length == 0);
   }

   validateServer(validation, value) {
      // Set an internal view model property to instruct the server to run a validation.
      const validationResultPropId = `${this.propId}__validation_${validation.id}`;
      this.vmContext.setState({ [validationResultPropId]: null });

      // Get notified when the server validation result is received.
      const promise = this.vmContext.once(validationResultPropId, null);

      // Dispatch the server validation request to the server.
      this.vmContext.dispatchState({ [this.propId]: value }, true);
      return promise.then(result => ({ isValid: result, message: validation.message }));
   }
}
