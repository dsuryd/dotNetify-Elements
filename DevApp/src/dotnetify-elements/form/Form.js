import React from 'react';
import PropTypes from 'prop-types';

import { ContextTypes } from '../core/VMContext';
import FormStore from '../_internal/FormStore';

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

   get formContext() {
      return this.context.formContext;
   }

   get plainText() {
      return this.formContext ? this.formContext.plainText : this.props.plainText;
   }

   get vmContext() {
      return this.context.vmContext;
   }

   constructor(props) {
      super(props);
      this.state = { plainText: !!this.props.plainText };

      this.formStore = new FormStore(this);
   }

   componentDidMount() {
      this.resetForm();
      this.formContext && this.formContext.subForms.push(this);
   }

   componentWillUpdate(props) {
      if (typeof props.plainText == 'boolean' && props.plainText !== this.state.plainText) this.setState({ plainText: props.plainText });
   }

   componentDidUpdate() {
      if (this.formStore.enteringEditMode(this.plainText)) this.resetForm();

      // Keep the pre-edit state so we can restore them on Cancel action.
      this.formStore.initPreEditState();
   }

   changed(state) {
      if (!this.formStore.changed) {
         this.formStore.changed = true;
         this.props.onChanged && this.props.onChanged(state);
      }

      if (this.formContext && !this.formContext.changed) this.formContext.setChanged(state);
   }

   dispatchState(state, toServer) {
      // Intercept dispatchState calls from the input fields to group them all first here,
      // and only send them on Submit button click. But use 'toServer' to override this
      // for special cases, e.g. letting field value go through to be validated server-side.
      if (toServer === true) this.vmContext.dispatchState(state);
      else this.formStore.store(state);

      this.changed(state);
   }

   getChildContext() {
      let { vmContext, formContext, ...context } = this.context;

      formContext = formContext || {
         subForms: this.formStore.subForms,
         changed: this.formStore.changed,
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
            getValidator: vmInput => this.formStore.getValidator(vmInput),
            getPropAttributes: propId => this.getPropAttributes(vmContext, propId)
         })
      };
   }

   getPropAttributes(vmContext, propId) {
      return Object.assign({ plainText: this.plainText }, vmContext.getPropAttributes(propId));
   }

   handleSubmit(propId) {
      const submit = this.submit.bind(this);

      if (this.formStore.subForms.length > 0)
         return this.formStore.handleSubmitSubForms(this.props.id, propId, submit, this.props.onSubmitError);

      return this.formStore
         .submitOnValidated(propId, submit)
         .then(result => {
            if (!result.valid) {
               this.props.onSubmitError && this.props.onSubmitError(result);
               this.formStore.setInputFocus(result.failedIds[0]);
            }
            return result;
         })
         .then(result => result.valid);
   }

   handleCancel() {
      this.vmContext.setState(this.formStore.preEditState);
      this.formStore.cancel();
      this.formStore.reset();
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
      this.formStore.reset(this.vmContext && this.vmContext.getState(), this.plainText);
   }

   submit(propId, data) {
      let formData = Object.assign({}, this.formStore.preEditState, data);
      if (!this.props.onSubmit || this.props.onSubmit(formData) !== false)
         this.vmContext.dispatchState(propId ? { [propId]: formData } : data);
      this.resetForm();
   }
}
