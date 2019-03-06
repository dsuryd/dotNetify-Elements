import VMInputValidator from './VMInputValidator';

export default class FormStore {
   constructor() {
      this.validators = [];
      this.inputs = [];
      this.subForms = [];
      this.plainText = false;
      this.preEditState = null;
      this.vmContextState = null;
   }

   cancel() {
      this.subForms.forEach(form => form.cancel());
      this.validators.forEach(validator => validator.clear());
   }

   enteringEditMode(plainText) {
      const result = this.plainText && !plainText;
      this.plainText = plainText;
      return result;
   }

   getPreEditState() {
      // Get the pre-edit state of the input fields so we can restore them on Cancel.
      return Object.entries(this.vmContextState)
         .filter(pair => this.inputs.some(input => input.propId === pair[0]))
         .reduce((aggregate, pair) => Object.assign(aggregate, { [pair[0]]: pair[1] }), {});
   }

   getValidator(vmInput) {
      // Create a validator for an input field.
      const validator = new VMInputValidator(vmInput.vmContext, vmInput.propId);
      this.validators.push(validator);
      this.inputs.push(vmInput);
      return validator;
   }

   initPreEditState() {
      this.preEditState = this.preEditState || this.getPreEditState();
   }

   reset(vmContextState, plainText) {
      this.preEditState = null;
      this.vmContextState = vmContextState;
      this.plainText = plainText;
   }

   setInputFocus(inputId) {
      const input = this.inputs.filter(input => input.propId === inputId).shift();
      if (input && input.dom) input.dom.focus();
   }

   validate(formId) {
      // Run all the input validators and aggregate the results.
      return Promise.all(this.validators.map(validator => validator.validate())).then(results =>
         results.reduce(
            (aggregate, current) => ({
               formId: formId,
               valid: aggregate.valid && current.valid,
               messages: [ ...aggregate.messages, ...current.messages ],
               failedIds: !current.valid ? [ ...aggregate.failedIds, current.inputId ] : aggregate.failedIds
            }),
            { valid: true, messages: [], failedIds: [] }
         )
      );
   }
}
