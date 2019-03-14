import FormStore from './FormStore';
import WebComponentHelper from '../utils/web-component-helper';

export default function createWebComponent(Component, elementName) {
   class CustomElement extends HTMLElement {
      static get observedAttributes() {
         return [ 'plaintext' ];
      }

      constructor() {
         super();
         this.state = {};
         this.formStore = new FormStore(this);
         this.helper = new WebComponentHelper(this);
      }

      onStateChange = state => {
         const onStateChange = this.helper.parseFunctionString(this.getAttribute('onStateChange'));
         if (typeof onStateChange == 'function') onStateChange(state);
         this.dispatchEvent(new CustomEvent('onStateChange', state));
      };

      onSubmit = formData => {
         const onSubmit = this.helper.parseFunctionString(this.getAttribute('onSubmit'));
         if (typeof onSubmit == 'function') onSubmit(formData);
         this.dispatchEvent(new CustomEvent('onSubmit', formData));
      };

      onSubmitError = error => {
         const onSubmitError = this.helper.parseFunctionString(this.getAttribute('onSubmitError'));
         if (typeof onSubmitError == 'function') onSubmitError(error);
         this.dispatchEvent(new CustomEvent('onSubmitError', error));
      };

      onChanged = field => {
         const onChanged = this.helper.parseFunctionString(this.getAttribute('onChanged'));
         if (typeof onChanged == 'function') onChanged(field);
         this.dispatchEvent(new CustomEvent('onChanged', field));
      };

      connectedCallback() {
         this.vmContextElem = this.closest('d-vm-context');
         if (this.vmContextElem) this.vmContext = this.vmContextElem.context;

         this.formElem = this.parentElement.closest('d-form');
         if (this.formElem) this.formContext = this.formElem.context.formContext;

         this.props = {
            ...this.helper.getProps(this.attributes, Component.propTypes),
            ...this.helper.getEvents(Component.propTypes)
         };
         this.formStore.init();
      }

      disconnectedCallback() {}

      attributeChangedCallback(name, oldValue, newValue) {
         const plainText = newValue === 'true';
         if (name === 'plaintext' && plainText !== this.formStore.plainText) this.formStore.plainText = plainText;
         if (oldValue !== null && !plainText) this.formStore.enterEditMode();
      }

      get context() {
         return {
            _type: 'custom',
            ...this.formStore.getContext(this.vmContext, this.formContext)
         };
      }

      setState(state) {
         this.state = Object.assign(this.state, state);
         this.dispatchEvent(new CustomEvent('onStateChange', state));
      }
   }

   if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement, { extends: 'form' });
}
