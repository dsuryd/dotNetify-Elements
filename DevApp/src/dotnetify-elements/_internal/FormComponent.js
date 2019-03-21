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
         this.hasVMContextState = false;
      }

      onChanged = field => {
         const onChanged = this.helper.parseFunctionString(this.getAttribute('onchanged'));
         if (typeof onChanged == 'function') onChanged(field);
         this.dispatchEvent(new CustomEvent('onChanged', field));
      };

      onStateChange = state => {
         const onStateChange = this.helper.parseFunctionString(this.getAttribute('onstatechange'));
         if (typeof onStateChange == 'function') onStateChange(state);
         this.dispatchEvent(new CustomEvent('onStateChange', state));
      };

      onSubmit = formData => {
         const onSubmit = this.helper.parseFunctionString(this.getAttribute('onsubmit'));
         if (typeof onSubmit == 'function') onSubmit(formData);
         this.dispatchEvent(new CustomEvent('onSubmit', formData));
      };

      onSubmitError = error => {
         const onSubmitError = this.helper.parseFunctionString(this.getAttribute('onsubmiterror'));
         if (typeof onSubmitError == 'function') onSubmitError(error);
         this.dispatchEvent(new CustomEvent('onSubmitError', error));
      };

      onVMContextStateChange = _ => {
         this.hasVMContextState = true;
      };

      connectedCallback() {
         this.vmContextElem = this.closest('d-vm-context');

         if (!this.vmContextElem) {
            const modals = document.getElementsByTagName('d-modal');
            if (modals.length > 0) this.vmContextElem = modals[0].closest('d-vm-context');
         }

         if (this.vmContextElem) {
            this.vmContext = this.vmContextElem.context;
            this.vmContextElem.addEventListener('onStateChange', this.onVMContextStateChange);
         }

         this.formElem = this.parentElement.closest('d-form');
         if (this.formElem) this.formContext = this.formElem.context.formContext;

         this.props = {
            ...this.helper.getProps(this.attributes, Component.propTypes),
            ...this.helper.getEvents(this.attributes, Component.propTypes)
         };
         this.formStore.init();
      }

      disconnectedCallback() {
         if (this.vmContextElem) {
            this.vmContextElem.removeEventListener('onStateChange', this.onVMContextStateChange);
         }
      }

      attributeChangedCallback(name, oldValue, newValue) {
         const plainText = newValue === 'true';
         if (name === 'plaintext' && plainText !== this.formStore.plainText) this.formStore.plainText = plainText;
      }

      get context() {
         return {
            _type: 'custom',
            ...this.formStore.getContext(this.vmContext, this.formContext)
         };
      }

      setState(state) {
         if (state.plainText !== 'true' && this.hasVMContextState) this.formStore.enterEditMode();

         this.state = Object.assign(this.state, state);
         this.dispatchEvent(new CustomEvent('onStateChange', state));
      }
   }

   if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement, { extends: 'form' });
}
