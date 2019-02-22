import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from './VMContext';
import { FormContextTypes } from '../form/Form';
import VMProperty from '../_internal/VMProperty';
import VMInput from '../_internal/VMInput';
import * as utils from '../utils';
import VMInputValidator from '../_internal/VMInputValidator';

export default class Element extends React.Component {
   static contextTypes = ContextTypes;

   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Prevent element from being rendered.
      hidden: PropTypes.bool,

      // Occurs when the property value changes.
      onChange: PropTypes.func
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
      const state = this.context.vmContext && this.context.vmContext.getState();
      return state ? state.hasOwnProperty(this.props.id) : false;
   }

   get vmProperty() {
      if (this._vmProperty) return this._vmProperty;

      // Returns the object that provides data from the back-end view model.
      if (this.isVMProperty) {
         this._vmProperty = new VMProperty(this.context.vmContext, this.props.id);
         return this._vmProperty;
      }

      // Fallback is this component isn't associated with a back-end view model.
      const propId = this.props.id || Math.random().toString(36).substring(2);
      this._vmProperty = new VMProperty(
         {
            getState: id => (id === propId ? this.props.value : (this.state && this.state[id]) || this.props[id]),
            setState: state => this.setState(state),
            getPropAttributes: _ => this.props.attrs || {},
            dispatchState: _ => {}
         },
         propId
      );
      return this._vmProperty;
   }

   componentDidMount() {
      this.props.onChange && this.props.onChange(this.vmProperty.value);
   }

   componentWillUpdate(props) {
      if (props.id) this._vmProperty = null;
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
      return !this.props.hidden ? this.vmProperty.value : null;
   }
}

export class InputElement extends Element {
   static contextTypes = FormContextTypes;

   get vmProperty() {
      if (this._vmInput) return this._vmInput;

      // Returns the object that provides data from the back-end view model, and manages input validation
      // and sending back of data to the back-end.
      if (this.isVMProperty) {
         this._vmInput = new VMInput(this.context.vmContext, this.props.id);
         return this._vmInput;
      }

      let value = this.props.value;
      return {
         // Fallback is this component isn't associated with a back-end view model.
         fullId: this.props.id,
         value: value,
         attrs: this.props.attrs || {},
         dispatch: value => (this.props.onChange ? this.props.onChange(value) : null),
         onValidated: handler => (this.props.onValidated ? this.props.onValidated(handler) : null),
         initMask: _ => (this.props.initMask ? this.props.initMask() : null)
      };

      // Fallback is this component isn't associated with a back-end view model.
      setTimeout(() => this.setState({ [propId]: this.props.value }));

      const propId = this.props.id || Math.random().toString(36).substring(2);
      const vmContext = {
         getState: id => (id === propId ? this.props.value : (this.state && this.state[id]) || this.props[id]),
         setState: state => this.setState(state),
         getPropAttributes: _ => this.props.attrs || {},
         getPropValidations: _ => {},
         getValidator: _ => new VMInputValidator(vmContext, propId),
         dispatchState: state => this.props.onChange && this.props.onChange(state)
      };
      this._vmInput = new VMInput(vmContext, propId);
      return this._vmInput;
   }

   get changed() {
      return this._changed;
   }

   set changed(value) {
      if (value && !this._changed && this.context.formContext) this.context.formContext.setChanged(value);
      this._changed = value;
   }

   dispatch(value, toServer) {
      return this.vmProperty.dispatch(value, toServer);
   }
}
