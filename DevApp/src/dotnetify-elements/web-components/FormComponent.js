import FormStore from "../_internal/FormStore";
import WebComponentHelper from "../utils/web-component-helper";
import "../utils/web-component-es5-adapter";

export default function createWebComponent(Component, elementName) {
  if (!window.hasOwnProperty("customElements")) return { prototype: {} };

  class CustomElement extends HTMLElement {
    static get observedAttributes() {
      return ["plaintext"];
    }

    get vmContext() {
      return this.vmContextElem ? this.vmContextElem.context : null;
    }

    get hasVMContextState() {
      return !!(this.vmContext && this.vmContext.getState() && Object.entries(this.vmContext.getState()).length > 0);
    }

    constructor() {
      super();
      this.state = {};
      this.props = {};
      this.formStore = new FormStore(this);
      this.helper = new WebComponentHelper(this);
    }

    onChanged = field => {
      const onChanged = this.helper.parseFunctionString(this.getAttribute("onchanged"));
      if (typeof onChanged == "function") onChanged(field);
      this.dispatchEvent(new CustomEvent("onChanged", { detail: field }));
    };

    onSubmit = formData => {
      const onSubmit = this.helper.parseFunctionString(this.getAttribute("onsubmit"));
      if (typeof onSubmit == "function") onSubmit(formData);
      this.dispatchEvent(new CustomEvent("onSubmit", { detail: formData }));
    };

    onSubmitError = error => {
      const onSubmitError = this.helper.parseFunctionString(this.getAttribute("onsubmiterror"));
      if (typeof onSubmitError == "function") onSubmitError(error);
      this.dispatchEvent(new CustomEvent("onSubmitError", { detail: error }));
    };

    onVMContextStateChange = e => this.shouldEnterEditMode(e.detail);

    connectedCallback() {
      this.vmContextElem = this.closest("d-vm-context");

      if (!this.vmContextElem) {
        const modals = document.getElementsByTagName("d-modal");
        if (modals.length > 0) {
          this.vmContextElem = modals[0].closest("d-vm-context");
          this.setAttribute("onsubmit", modals[0].getAttribute("onsubmit"));
          this.setAttribute("onsubmiterror", modals[0].getAttribute("onsubmiterror"));
        }
      }

      if (this.vmContextElem) {
        this.vmContextElem.addEventListener("onStateChange", this.onVMContextStateChange);
      }

      this.formElem = this.parentElement && this.parentElement.closest("d-form");
      if (this.formElem) this.formContext = this.formElem.context.formContext;

      this.props = {
        ...this.helper.getProps(this.attributes, Component.propTypes),
        ...this.helper.getEvents(this.attributes, Component.propTypes),
        onChanged: this.onChanged,
        onSubmit: this.onSubmit,
        onSubmitError: this.onSubmitError
      };

      this.setPlainText(this.formElem ? this.formElem.props.plainText : this.getAttribute("plaintext") == "true");

      setTimeout(() => this.formStore.init());
    }

    disconnectedCallback() {
      this.vmContextElem && this.vmContextElem.removeEventListener("onStateChange", this.onVMContextStateChange);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "plaintext") {
        const plainText = newValue === "true";
        plainText !== this.formStore.plainText && this.setPlainText(plainText);
      }
    }

    get context() {
      return {
        _type: "custom",
        ...this.formStore.getContext(this.vmContext, this.formContext)
      };
    }

    setPlainText(plainText) {
      this.formStore.plainText = plainText;
      this.props.plainText = plainText;
      this.setState({ plainText });
    }

    setState(state) {
      this.shouldEnterEditMode(state);

      this.state = { ...this.state, ...state };
      this.dispatchEvent(new CustomEvent("onStateChange", { detail: { state } }));
    }

    shouldEnterEditMode(state) {
      if (!this.formStore.editMode && state.plainText !== "true" && this.hasVMContextState)
        this.formStore.enterEditMode();
    }
  }

  if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement);
}
