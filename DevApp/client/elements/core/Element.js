import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import { FormContextTypes } from '../form/Form';
import VMProperty from '../_internal/VMProperty';
import VMInput from '../_internal/VMInput';
import * as utils from '../utils';

export default class Element extends React.Component {
   static contextTypes = ContextTypes;

   static propTypes = {
      id: PropTypes.string.isRequired
   };

   get vm() {
      return this.vmProperty.vm;
   }

   get vmContext() {
      return this.vmProperty.vmContext;
   }

   get value() {
      return this.vmProperty.value;
   }

   set value(value) {
      this.vmProperty.value = value;
   }

   get attrs() {
      return Object.assign({ fullId: this.vmProperty.fullId }, this.vmProperty.attrs, this.props);
   }

   get isVMProperty() {
      // Returns whether this component is associated with a back-end view model property.
      return this.context.vmContext && this.context.vmContext.getState().hasOwnProperty(this.props.id);
   }

   get vmProperty() {
      // Returns the object that provides data from the back-end view model.
      if (this.isVMProperty) {
         this._vmProperty = this._vmProperty || new VMProperty(this.context.vmContext, this.props.id);
         return this._vmProperty;
      }

      return {
         // Fallback is this component isn't associated with a back-end view model.
         fullId: this.props.id,
         value: this.props.value,
         attrs: this.props.attrs || {}
      };
   }

   dispatch(value) {
      return this.vmProperty.dispatch(value);
   }

   dispatchProp(propId, value) {
      return this.vmProperty.dispatchProp(propId, value);
   }

   resolveComponents(componentType) {
      return utils.resolveComponents(componentType, this.props);
   }

   render() {
      return this.vmProperty.value;
   }
}

export class InputElement extends Element {
   static contextTypes = FormContextTypes;

   get vmProperty() {
      // Returns the object that provides data from the back-end view model, and manages input validation
      // and sending back of data to the back-end.
      if (this.isVMProperty) {
         this._vmInput = this._vmInput || new VMInput(this.context.vmContext, this.props.id);
         return this._vmInput;
      }

      return {
         // Fallback is this component isn't associated with a back-end view model.
         fullId: this.props.id,
         value: this.props.value,
         attrs: this.props.attrs || {},
         dispatch: value => (this.props.onChange ? this.props.onChange(value) : null),
         onValidated: handler => (this.props.onValidated ? this.props.onValidated(handler) : null),
         initMask: _ => (this.props.initMask ? this.props.initMask() : null)
      };
   }

   get changed() {
      return this._changed;
   }

   set changed(value) {
      if (value && !this._changed && this.context.formContext) this.context.formContext.setChanged(value);
      this._changed = value;
   }

   dispatch(value) {
      return this.vmProperty.dispatch(value);
   }
}
