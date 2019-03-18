import React from 'react';
import PropTypes from 'prop-types';
import { ContextTypes } from '../core/VMContext';
import FormStore from '../_internal/FormStore';
import createWebComponent from '../_internal/FormComponent';

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
      return this.context.formContext || this.props.formContext;
   }

   get vmContext() {
      return this.context.vmContext || this.props.vmContext;
   }

   constructor(props) {
      super(props);
      this.state = {};
      this.formStore = new FormStore(this);
   }

   componentDidMount() {
      this.formStore.init();
   }

   shouldComponentUpdate(props) {
      if (props.hasOwnProperty('plainText') && props.plainText !== this.formStore.plainText) this.formStore.plainText = props.plainText;
      if (props.plainText === false) this.formStore.enterEditMode();
      return true;
   }

   getChildContext() {
      let { vmContext, formContext, ...context } = this.context;
      return {
         ...context,
         ...this.formStore.getContext(this.vmContext, this.formContext)
      };
   }

   render() {
      return this.formContext ? (
         this.props.children
      ) : (
         <form style={{ width: 'inherit' }} onSubmit={e => e.preventDefault()}>
            {this.props.children}
         </form>
      );
   }
}

createWebComponent(Form, 'd-form');
