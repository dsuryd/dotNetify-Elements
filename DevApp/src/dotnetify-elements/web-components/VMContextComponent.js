import VMContextStore from '../_internal/VMContextStore';
import WebComponentHelper from '../utils/web-component-helper';
import '../utils/web-component-es5-adapter';

export default function createWebComponent(Component, elementName) {
   if (!window.hasOwnProperty('customElements')) return { prototype: {} };

   class CustomElement extends HTMLElement {
      static get observedAttributes() {
         return [ 'vm', 'options' ];
      }

      get context() {
         return { _type: 'custom', ...this.store.context };
      }

      constructor() {
         super();
         this.store = new VMContextStore(this);
         this.helper = new WebComponentHelper(this);
      }

      onStateChange = state => {
         const onStateChange = this.helper.parseFunctionString(this.getAttribute('onstatechange'));
         if (typeof onStateChange == 'function') onStateChange(state);
         this.dispatchVMEvent('onStateChange', { detail: state });
      };

      dispatchVMEvent(eventName, eventArg) {
         this.dispatchEvent(new CustomEvent(eventName, eventArg));
         document.dispatchEvent(new CustomEvent(`${this.vmId}_${eventName}`, eventArg));
      }

      onVMContextStateChange = _ => this.vmId && !this.vm && this.connect(this.vmId, this.getAttribute('options'));

      attributeChangedCallback() {
         if (this.init) {
            this.vmId = this.getAttribute('vm');
            this.disconnect();
            this.connect(this.vmId, this.getAttribute('options'));
         }
      }
      connectedCallback() {
         this.vmContextElem = this.parentElement.closest('d-vm-context');
         if (this.vmContextElem) {
            this.vmContext = this.vmContextElem.context;
            this.vmContextElem.addEventListener('onStateChange', this.onVMContextStateChange);
         }

         // If this is nested inside a container element, connect only on container mounting.
         const container = this.helper.getContainerParent();
         if (container && container.mountState !== 'mounting') return;

         this.vmId = this.getAttribute('vm');
         if (this.vmId && (!this.vmContextElem || this.vmContextElem.state)) this.connect(this.vmId, this.getAttribute('options'));

         this.init = true;
      }

      disconnectedCallback() {
         this.disconnect();
         this.vmContextElem && this.vmContextElem.removeEventListener('onStateChange', this.onVMContextStateChange);
      }

      connect(vmId, optionsStr) {
         const options = /{.*}/.exec(optionsStr) ? JSON.parse(optionsStr) : null;
         this.vm = this.store.connect(vmId, options, this.onStateChange);

         this.props = {
            ...this.helper.getProps(this.attributes, Component.propTypes),
            ...this.helper.getEvents(this.attributes, Component.propTypes)
         };
      }

      disconnect() {
         if (this.vm) {
            this.store.destroy();
            this.vm = null;
         }
      }

      setState(state) {
         this.state = Object.assign(this.state || {}, state);
         this.dispatchEvent(new CustomEvent('onLocalStateChange', { detail: state }));
      }
   }

   if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement);
}
