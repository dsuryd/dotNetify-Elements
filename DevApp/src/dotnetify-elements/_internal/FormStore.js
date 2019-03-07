import VMInputValidator from './VMInputValidator';

export default class FormStore {
   constructor(host) {
      this.host = host;
      this.formId = host.props.id;
      this.validators = [];
      this.inputs = [];
      this.subForms = [];
      this.plainText = false;
      this.preEditState = null;
      this.vmContextState = null;
   }

   get edits() {
      return this.host.state.edits;
   }

   set edits(value) {
      this.host.setState({ edits: value });
   }

   get changed() {
      return this.host.state.changed;
   }

   set changed(value) {
      this.host.setState({ changed: value });
   }

   cancel() {
      this.subForms.forEach(form => form.handleCancel());
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

   handleSubmitSubForms(formId, propId, submit, onSubmitError) {
      let subFormData = {};
      const subFormSubmit = (id, data) => Object.assign(subFormData, id ? { [id]: data } : data);

      return Promise.all(this.subForms.map(form => form.formStore.submitOnValidated(form.props.id, subFormSubmit)))
         .then(results =>
            results.reduce(
               (aggregate, current) => ({
                  failedForms:
                     current.failedIds.length > 0
                        ? [ ...aggregate.failedForms, { formId: current.formId, failedIds: current.failedIds } ]
                        : aggregate.failedForms,
                  valid: aggregate.valid && current.valid,
                  messages: [ ...aggregate.messages, ...current.messages ]
               }),
               { valid: true, messages: [], failedForms: [] }
            )
         )
         .then(result => {
            if (!result.valid) {
               onSubmitError && onSubmitError(result);
               const form = this.subForms.filter(form => form.props.id === result.failedForms[0].formId).shift();
               form && form.formStore.setInputFocus(result.failedForms[0].failedIds[0]);
            }
            return result;
         })
         .then(result => {
            result.valid && submit(propId, subFormData);
            return result.valid;
         });
   }

   initPreEditState() {
      this.preEditState = this.preEditState || this.getPreEditState();
   }

   reset(vmContextState, plainText) {
      this.preEditState = null;
      if (typeof vmContextState != 'undefined') this.vmContextState = vmContextState;
      if (typeof plainText != 'undefined') this.plainText = plainText;

      this.host.setState({ changed: false, edits: null });
   }

   setInputFocus(inputId) {
      const input = this.inputs.filter(input => input.propId === inputId).shift();
      if (input && input.dom) input.dom.focus();
   }

   store(edit) {
      this.host.setState({ changed: true, edits: Object.assign({}, this.host.state.edits, edit) });
   }

   submitOnValidated(propId, submit) {
      const edits = this.edits;
      const isDirty = !!edits;
      const shouldValidate = isDirty || this.validators.some(validator => validator.isRequired);

      return shouldValidate
         ? this.validate(this.formId).then(result => {
              if (result.valid && isDirty) submit(propId, edits);
              return result;
           })
         : Promise.resolve({ formId: this.formId, valid: true, messages: [], failedIds: [] });
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
