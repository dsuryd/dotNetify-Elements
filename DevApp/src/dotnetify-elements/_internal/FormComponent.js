import FormStore from './FormStore';
import WebComponentHelper from '../utils/web-component-helper';
import * as utils from '../utils';

export default function createWebComponent(Component, elementName) {
   if (utils.isIE11()) return;

   class CustomElement extends HTMLElement {
      static get observedAttributes() {
         return [ 'plaintext' ];
      }

      get hasVMContextState() {
         return !!(this.vmContext && this.vmContext.getState() && Object.entries(this.vmContext.getState()).length > 0);
      }

      constructor() {
         super();
         this.state = {};
         this.formStore = new FormStore(this);
         this.helper = new WebComponentHelper(this);
      }

      onChanged = field => {
         const onChanged = this.helper.parseFunctionString(this.getAttribute('onchanged'));
         if (typeof onChanged == 'function') onChanged(field);
         this.dispatchEvent(new CustomEvent('onChanged', { detail: field }));
      };

      onStateChange = state => {
         const onStateChange = this.helper.parseFunctionString(this.getAttribute('onstatechange'));
         if (typeof onStateChange == 'function') onStateChange(state);
         this.dispatchEvent(new CustomEvent('onStateChange', { detail: state }));
      };

      onSubmit = formData => {
         const onSubmit = this.helper.parseFunctionString(this.getAttribute('onsubmit'));
         if (typeof onSubmit == 'function') onSubmit(formData);
         this.dispatchEvent(new CustomEvent('onSubmit', { detail: formData }));
      };

      onSubmitError = error => {
         const onSubmitError = this.helper.parseFunctionString(this.getAttribute('onsubmiterror'));
         if (typeof onSubmitError == 'function') onSubmitError(error);
         this.dispatchEvent(new CustomEvent('onSubmitError', { detail: error }));
      };

      connectedCallback() {
         this.vmContextElem = this.closest('d-vm-context');

         if (!this.vmContextElem) {
            const modals = document.getElementsByTagName('d-modal');
            if (modals.length > 0) {
               this.vmContextElem = modals[0].closest('d-vm-context');
               this.setAttribute('onsubmit', modals[0].getAttribute('onsubmit'));
               this.setAttribute('onsubmiterror', modals[0].getAttribute('onsubmiterror'));
            }
         }

         if (this.vmContextElem) {
            this.vmContext = this.vmContextElem.context;
         }

         this.formElem = this.parentElement.closest('d-form');
         if (this.formElem) this.formContext = this.formElem.context.formContext;

         this.props = {
            ...this.helper.getProps(this.attributes, Component.propTypes),
            ...this.helper.getEvents(this.attributes, Component.propTypes),
            onChanged: this.onChanged,
            onSubmit: this.onSubmit,
            onSubmitError: this.onSubmitError
         };

         setTimeout(() => this.formStore.init());
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
