import VMProperty from "./VMProperty";
import VMInputValidator from "./VMInputValidator";
import * as utils from "../utils";
import { createTextMaskInputElement } from "text-mask-core";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export default class VMInput extends VMProperty {
  constructor(vmContext, propId, onInputRef) {
    super(vmContext, propId);
    this.onInputRef = onInputRef;

    // If this input field is inside the Form context, get the validator from the context
    // so that the Form can validate all its input fields.  Otherwise, create it here.
    this.validator = this.vmContext.getValidator
      ? this.vmContext.getValidator(this)
      : new VMInputValidator(vmContext, propId);
  }

  get domValue() {
    this._textMask && this._textMask.update();
    return this._inputElement.value;
  }

  get dom() {
    return this._inputElement;
  }

  set dom(elem) {
    this._inputElement = elem;
    if (typeof this.onInputRef == "function") this.onInputRef(elem);
  }

  get isRequired() {
    return this.validator.isRequired;
  }

  addValidation(validation) {
    // This is used for adding client-side validation(s).
    validation = Array.isArray(validation) ? validation : [validation];
    this.validator.addValidation(validation);
  }

  dispatch(newValue, toServer) {
    if (typeof newValue != "undefined") {
      newValue =
        typeof this.value == "number" ? parseFloat(newValue) : newValue;
      this.value = newValue;
    }

    let value = typeof newValue != "undefined" ? newValue : this.value;
    value = this._unmask ? this._unmask(value) : value;

    this.validator.validate(value);
    this.vmContext.dispatchState({ [this.propId]: value }, toServer);
  }

  initMask() {
    if (this._inputElement && this.attrs.mask) {
      const maskMap = {
        "9": /[0-9]/,
        U: /[A-Z]/,
        A: /[a-zA-Z]/,
        "*": /[0-9a-zA-Z]/
      };
      let { type, ...inputMask } = utils.toCamelCase(this.attrs.mask);
      if (type === "NumberMask") {
        if (inputMask.includeThousandsSeparator) {
          const regex = new RegExp(inputMask.thousandsSeparatorSymbol, "g");
          this._unmask = value =>
            typeof value == "string" ? value.replace(regex, "") : value;
        }
        inputMask = createNumberMask(inputMask);
      } else
        inputMask = inputMask.mask
          .split("")
          .map(c => (maskMap.hasOwnProperty(c) ? maskMap[c] : c));

      this._textMask = createTextMaskInputElement({
        inputElement: this._inputElement,
        mask: inputMask
      });
      this._textMask.update(this.value || "");
    }
  }

  onValidated(handler) {
    return this.validator.onValidated(handler);
  }
}
