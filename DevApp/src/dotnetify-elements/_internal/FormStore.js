import VMInputValidator from './VMInputValidator';

export default class FormStore {
   constructor(host) {
      this.host = host;
      this.formId = host.props.id;
      this.validators = [];
      this.inputs = [];
      this.subForms = [];
      this.editMode = false;
      this.preEditState = null;
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

   get plainText() {
      return this.host.state.plainText;
   }

   set plainText(value) {
      this.host.setState({ plainText: value });
   }

   get props() {
      return this.host.props || {};
   }

   cancel() {
      this.host.vmContext.setState(this.preEditState);
      this.subForms.forEach(form => form.cancel());
      this.validators.forEach(validator => validator.clear());
      this.leaveEditMode();
   }

   dispatchState(state, toServer) {
      // Intercept dispatchState calls from the input fields to group them all first here,
      // and only send them on Submit button click. But use 'toServer' to override this
      // for special cases, e.g. letting field value go through to be validated server-side.
      if (toServer === true) this.host.vmContext.dispatchState(state);
      else this.store(state);

      this.setChanged(state);
   }

   enterEditMode() {
      if (!this.editMode) {
         this.editMode = true;
         this.preEditState = this.getPreEditState(this.host.vmContext.getState());
         this.subForms.forEach(form => form.enterEditMode());
      }
   }

   getContext(vmContext, formContext) {
      formContext = formContext || {
         subForms: this.subForms,
         changed: this.changed,
         plainText: this.plainText,
         setChanged: state => this.setChanged(state),
         setPlainText: state => (this.plainText = state),
         submit: propId => this.handleSubmit(propId),
         cancel: _ => this.cancel()
      };

      return {
         formContext,
         vmContext: Object.assign({}, vmContext, {
            dispatchState: (state, toServer) => this.dispatchState(state, toServer),
            getValidator: vmInput => this.getValidator(vmInput),
            getPropAttributes: propId => this.getPropAttributes(vmContext, propId)
         })
      };
   }

   getPreEditState(vmContextState) {
      // Get the pre-edit state of the input fields so we can restore them on Cancel.
      return Object.entries(vmContextState)
         .filter(pair => this.inputs.some(input => input.propId === pair[0]))
         .reduce((aggregate, pair) => Object.assign(aggregate, { [pair[0]]: pair[1] }), {});
   }

   getPropAttributes(vmContext, propId) {
      const plainText = this.host.formContext ? this.host.formContext.plainText : this.props.plainText;
      return Object.assign({ plainText }, vmContext.getPropAttributes(propId));
   }

   getValidator(vmInput) {
      // Create a validator for an input field.
      const validator = new VMInputValidator(vmInput.vmContext, vmInput.propId);
      this.validators.push(validator);
      this.inputs.push(vmInput);
      return validator;
   }

   handleSubmit(propId) {
      const submit = (_propId, data) => this.submit(_propId, data);
      if (this.subForms.length > 0) return this.handleSubmitSubForms(propId, submit, this.props.onSubmitError);

      return this.submitOnValidated(propId, submit)
         .then(result => {
            if (!result.valid) {
               this.props.onSubmitError && this.props.onSubmitError(result);
               this.setInputFocus(result.failedIds[0]);
            }
            return result;
         })
         .then(result => result.valid);
   }

   handleSubmitSubForms(propId, submit, onSubmitError) {
      let subFormData = {};
      const subFormSubmit = (id, data) => Object.assign(subFormData, id ? { [id]: data } : data);

      return Promise.all(this.subForms.map(form => form.submitOnValidated(form.props.id, subFormSubmit)))
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

   init() {
      this.host.formContext && this.host.formContext.subForms.push(this);
      this.plainText = this.props.plainText;
   }

   leaveEditMode() {
      this.host.setState({ changed: false, edits: null });
      this.subForms.forEach(form => form.leaveEditMode());
      this.editMode = false;
   }

   setChanged(state) {
      if (!this.changed) {
         this.changed = true;
         this.props.onChanged && this.props.onChanged(state);
      }

      if (this.host.formContext && !this.host.formContext.changed) this.host.formContext.setChanged(state);
   }

   setInputFocus(inputId) {
      const input = this.inputs.filter(input => input.propId === inputId).shift();
      if (input && input.dom) input.dom.focus();
   }

   store(edit) {
      this.host.setState({ changed: true, edits: Object.assign({}, this.edits, edit) });
   }

   submit(propId, data) {
      let formData = Object.assign({}, this.preEditState, data);
      if (!this.props.onSubmit || this.props.onSubmit(formData) !== false)
         this.host.vmContext.dispatchState(propId ? { [propId]: formData } : data);

      this.leaveEditMode();
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
