import React from 'react';
import { PropTypes } from 'prop-types';
import VMInputValidator from '../_internal/VMInputValidator';
import { ContextTypes } from '../core/VMContext';

export const FormContextTypes = {
   formContext: PropTypes.object,
   ...ContextTypes
};

export class Form extends React.Component {
   static contextTypes = FormContextTypes;

   static childContextTypes = FormContextTypes;

   static propTypes = {
      // Identifies a nested form. This Id will become property name in the master form data.
      id: PropTypes.string,

      // Replaces all input fields with plain text.
      plainText: PropTypes.bool,

      // Occurs when the form is submitted; emits the form data. To prevent server dispatch, return false.
      onSubmit: PropTypes.func,

      // Occurs when there's validation error on submit; emits the error.
      onSubmitError: PropTypes.func,

      // Occurs when a field is changed.
      onChanged: PropTypes.func
   };

   get plainText() {
      return this.context.formContext ? this.context.formContext.plainText : this.props.plainText;
   }

   get enteringEditMode() {
      const result = this._plainText && !this.plainText;
      this._plainText = this.plainText;
      return result;
   }

   constructor(props) {
      super(props);
      this.state = { changed: false, plainText: !!this.props.plainText };
      this.validators = [];
      this.inputs = [];
      this.subForms = [];
   }

   componentDidMount() {
      this.resetForm();
      this.context.formContext && this.context.formContext.subForms.push(this);
   }

   componentWillUpdate(props) {
      if (typeof props.plainText == 'boolean' && props.plainText !== this.state.plainText) this.setState({ plainText: props.plainText });
   }

   componentDidUpdate() {
      if (this.enteringEditMode) this.resetForm();

      // Keep the pre-edit state so we can restore them on Cancel action.
      this.preEditState = this.preEditState || this.getPreEditState();
   }

   changed(state) {
      if (!this.state.changed) {
         this.setState({ changed: true });
         this.props.onChanged && this.props.onChanged(state);
      }

      if (this.context.formContext && !this.context.formContext.changed) this.context.formContext.setChanged(state);
   }

   dispatchState(state, toServer) {
      // Intercept dispatchState calls from the input fields to group them all first here,
      // and only send them on Submit button click. But use 'toServer' to override this
      // for special cases, e.g. letting field value go through to be validated server-side.
      toServer === true ? this.context.vmContext.dispatchState(state) : this.setState({ changed: true, data: Object.assign({}, this.state.data, state) });

      this.changed(state);
   }

   getChildContext() {
      let { vmContext, formContext, ...context } = this.context;

      formContext = formContext || {
         subForms: this.subForms,
         changed: this.state.changed,
         plainText: this.state.plainText,
         setChanged: state => this.changed(state),
         setPlainText: state => this.setState({ plainText: state }),
         submit: propId => this.handleSubmit(propId),
         cancel: _ => this.handleCancel()
      };

      return {
         ...context,
         formContext: formContext,
         vmContext: Object.assign({}, vmContext, {
            dispatchState: (state, toServer) => this.dispatchState(state, toServer),
            getValidator: vmInput => this.getValidator(vmInput),
            getPropAttributes: propId => this.getPropAttributes(vmContext, propId)
         })
      };
   }

   getPreEditState() {
      // Get the pre-edit state of the input fields so we can restore them on Cancel.
      return Object.entries(this.vmContextState)
         .filter(pair => this.inputs.some(input => input.propId === pair[0]))
         .reduce((aggregate, pair) => Object.assign(aggregate, { [pair[0]]: pair[1] }), {});
   }

   getPropAttributes(vmContext, propId) {
      return Object.assign({ plainText: this.plainText }, vmContext.getPropAttributes(propId));
   }

   getValidator(vmInput) {
      // Create a validator for an input field.
      const validator = new VMInputValidator(vmInput.vmContext, vmInput.propId);
      this.validators.push(validator);
      this.inputs.push(vmInput);
      return validator;
   }

   setInputFocus(inputId) {
      const input = this.inputs.filter(input => input.propId === inputId).shift();
      if (input && input.dom) input.dom.focus();
   }

   handleSubmit(propId) {
      if (this.subForms.length > 0) return this.handleSubmitSubForms(propId);

      return this.submitOnValidated(propId)
         .then(result => {
            if (!result.valid) {
               this.props.onSubmitError && this.props.onSubmitError(result);
               this.setInputFocus(result.failedIds[0]);
            }
            return result;
         })
         .then(result => result.valid);
   }

   handleSubmitSubForms(propId) {
      let subFormData = {};
      const submit = (id, data) => Object.assign(subFormData, id ? { [id]: data } : data);

      return Promise.all(this.subForms.map(form => form.submitOnValidated(form.props.id, submit)))
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
               this.props.onSubmitError && this.props.onSubmitError(result);
               const form = this.subForms.filter(form => form.props.id === result.failedForms[0].formId).shift();
               form && form.setInputFocus(result.failedForms[0].failedIds[0]);
            }
            return result;
         })
         .then(result => {
            result.valid && this.submit(propId, subFormData);
            return result.valid;
         });
   }

   handleCancel() {
      this.subForms.forEach(form => form.cancel());
      this.cancel();
   }

   cancel() {
      this.context.vmContext.setState(this.preEditState);
      this.setState({ changed: false, data: null });
      this.validators.forEach(validator => validator.clear());
   }

   render() {
      return this.context.formContext ? (
         this.props.children
      ) : (
         <form style={{ width: 'inherit' }} onSubmit={e => e.preventDefault()}>
            {this.props.children}
         </form>
      );
   }

   resetForm() {
      this.preEditState = null;
      this.vmContextState = this.context.vmContext && this.context.vmContext.getState();
      this._plainText = this.plainText;
      this.setState({ changed: false, data: null });
   }

   submitOnValidated(propId, submit) {
      const { data } = this.state;
      const isDirty = !!data;
      const shouldValidate = isDirty || this.validators.some(validator => validator.isRequired);

      return shouldValidate
         ? this.validate().then(result => {
              if (result.valid && isDirty) submit ? submit(propId, data) : this.submit(propId, data);
              return result;
           })
         : Promise.resolve({ formId: this.props.id, valid: true, messages: [], failedIds: [] });
   }

   submit(propId, data) {
      let formData = Object.assign({}, this.preEditState, data);
      if (!this.props.onSubmit || this.props.onSubmit(formData) !== false) this.context.vmContext.dispatchState(propId ? { [propId]: formData } : data);
      this.resetForm();
   }

   validate() {
      // Run all the input validators and aggregate the results.
      return Promise.all(this.validators.map(validator => validator.validate())).then(results =>
         results.reduce(
            (aggregate, current) => ({
               formId: this.props.id,
               valid: aggregate.valid && current.valid,
               messages: [ ...aggregate.messages, ...current.messages ],
               failedIds: !current.valid ? [ ...aggregate.failedIds, current.inputId ] : aggregate.failedIds
            }),
            { valid: true, messages: [], failedIds: [] }
         )
      );
   }
}
