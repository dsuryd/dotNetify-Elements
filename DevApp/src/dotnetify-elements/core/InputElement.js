import { FormContextTypes } from '../form/Form';
import VMInput from '../_internal/VMInput';
import VMInputValidator from '../_internal/VMInputValidator';
import Element from './Element';

export default class InputElement extends Element {
   static contextTypes = FormContextTypes;

   get formContext() {
      return this.context.formContext || this.props.formContext;
   }

   get vmProperty() {
      if (this._vmInput) return this._vmInput;

      // Returns the object that provides data from the back-end view model, and manages input validation
      // and sending back of data to the back-end.
      if (this.isVMProperty) {
         this._vmInput = new VMInput(this.vmContext, this.props.id, this.props.onInputRef);
         return this._vmInput;
      }

      // Fallback is this component isn't associated with a back-end view model.
      const vmContext = {
         getState: id => this.state && this.state[id],
         setState: state => this.setState(state),
         getPropAttributes: _ => this.props.attrs || {},
         getPropValidations: _ => this.props.validations || null,
         getValidator: _ => new VMInputValidator(vmContext, this.propId),
         dispatchState: state => this.props.onChange && this.props.onChange(state[this.propId])
      };
      this._vmInput = new VMInput(vmContext, this.propId, this.props.onInputRef);

      if (this.props.hasOwnProperty('value') && !this.state.hasOwnProperty(this.propId)) {
         this.setControlledValue(this.props.value);
      }
      return this._vmInput;
   }

   get changed() {
      return this._changed;
   }

   set changed(value) {
      if (value && !this._changed && this.formContext) this.formContext.setChanged(value);
      this._changed = value;
   }

   constructor(props, context) {
      super(props, context);
      this.inputRef = React.createRef();
      this.propId = this.props.id || Math.random().toString(36).substring(2);

      if (this.props.hasOwnProperty('value')) this.state = { [this.propId]: this.props.value };
   }

   dispatch(value, toServer) {
      return this.vmProperty.dispatch(value, toServer);
   }

   setControlledValue(value) {
      this.setState({ [this.propId]: value });
   }
}
