import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import VMInputValidator from '../_internal/VMInputValidator';
import * as utils from '../utils';

export const FormContextTypes = Object.assign(
   {
      formContext: PropTypes.object
   },
   ContextTypes
);

export class Form extends React.Component {
   static contextTypes = FormContextTypes;

   static childContextTypes = FormContextTypes;

   static propTypes = {
      id: PropTypes.string,
      onSubmit: PropTypes.func,
      onChanged: PropTypes.func,
      plainText: PropTypes.bool
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
      this.inputProps = [];
      this.subForms = [];
   }

   componentWillMount() {
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
            getValidator: (context, propId) => this.getValidator(vmContext, propId),
            getPropAttributes: propId => this.getPropAttributes(vmContext, propId)
         })
      };
   }

   getPreEditState() {
      // Get the pre-edit state of the input fields so we can restore them on Cancel.
      return Object.entries(this.vmContextState)
         .filter(pair => this.inputProps.includes(pair[0]))
         .reduce((aggregate, pair) => Object.assign(aggregate, { [pair[0]]: pair[1] }), {});
   }

   getPropAttributes(vmContext, propId) {
      return Object.assign({ plainText: this.plainText }, vmContext.getPropAttributes(propId));
   }

   getValidator(context, propId) {
      // Create a validator for an input field.
      const validator = new VMInputValidator(context, propId);
      this.validators.push(validator);
      this.inputProps.push(propId);
      return validator;
   }

   handleSubmit(propId) {
      if (this.subForms.length == 0) return this.submitOnValidated(propId).then(result => result.valid);

      let subFormData = {};
      const submit = (id, data) => Object.assign(subFormData, id ? { [id]: data } : data);

      return Promise.all(this.subForms.map(form => form.submitOnValidated(form.props.id, submit)))
         .then(results =>
            results.reduce((aggregate, current) => ({
               valid: aggregate.valid && current.valid,
               messages: [ ...aggregate.messages, ...current.messages ]
            }))
         )
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
      return this.props.children;
   }

   resetForm() {
      this.preEditState = null;
      this.vmContextState = this.context.vmContext && this.context.vmContext.getState();
      this._plainText = this.plainText;
      this.setState({ changed: false, data: null });
   }

   submitOnValidated(propId, submit) {
      const { data } = this.state;
      const shouldValidate = this.validators.some(validator => validator.isRequired);
      const isDirty = !!data;

      return isDirty || shouldValidate
         ? this.validate().then(result => {
              if (result.valid && isDirty) submit ? submit(propId, data) : this.submit(propId, data);
              return result;
           })
         : Promise.resolve({ valid: true, messages: [] });
   }

   submit(propId, data) {
      let formData = Object.assign({}, this.preEditState, data);
      if (!this.props.onSubmit || this.props.onSubmit(formData) !== false) this.context.vmContext.dispatchState(propId ? { [propId]: formData } : data);
      this.resetForm();
   }

   validate() {
      // Run all the input validators and aggregate the results.
      return Promise.all(this.validators.map(validator => validator.validate())).then(results =>
         results.reduce((aggregate, current) => ({
            valid: aggregate.valid && current.valid,
            messages: [ ...aggregate.messages, ...current.messages ]
         }))
      );
   }
}
