import { FormContextTypes } from '../form/Form';
import VMInput from '../_internal/VMInput';
import VMInputValidator from '../_internal/VMInputValidator';
import Element from './Element';

export default class InputElement extends Element {
   static contextTypes = FormContextTypes;

   get formContext() {
      return this.context.formContext;
   }

   get vmProperty() {
      if (this._vmInput) return this._vmInput;

      // Returns the object that provides data from the back-end view model, and manages input validation
      // and sending back of data to the back-end.
      if (this.isVMProperty) {
         this._vmInput = new VMInput(this.vmContext, this.props.id);
         return this._vmInput;
      }

      // Fallback is this component isn't associated with a back-end view model.
      const propId = this.props.id || Math.random().toString(36).substring(2);
      const vmContext = {
         getState: id => (id === propId && this.props.hasOwnProperty('value') ? this.props.value : this.state && this.state[id]),
         setState: state => this.setState(state),
         getPropAttributes: _ => this.props.attrs || {},
         getPropValidations: _ => this.props.validations || null,
         getValidator: _ => new VMInputValidator(vmContext, propId),
         dispatchState: state => this.props.onChange && this.props.onChange(state[propId])
      };
      this._vmInput = new VMInput(vmContext, propId);
      return this._vmInput;
   }

   get changed() {
      return this._changed;
   }

   set changed(value) {
      if (value && !this._changed && this.formContext) this.formContext.setChanged(value);
      this._changed = value;
   }

   dispatch(value, toServer) {
      return this.vmProperty.dispatch(value, toServer);
   }
}
