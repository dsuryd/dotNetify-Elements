import VMContextStore from './VMContextStore';
import WebComponentHelper from '../utils/web-component-helper';
import * as utils from '../utils';

export default function createWebComponent(Component, elementName) {
   if (utils.isIE11() || !window.hasOwnProperty('customElements')) return { prototype: {} };

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
         this.dispatchEvent(new CustomEvent('onStateChange', { detail: state }));
      };

      connectedCallback() {
         this.vmContextElem = this.parentElement.closest('d-vm-context');
         if (this.vmContextElem) this.vmContext = this.vmContextElem.context;

         // If this is nested inside a container element, connect only on container mounting.
         const container = this.helper.getContainerParent();
         if (container && container.mountState !== 'mounting') return;

         const vmId = this.getAttribute('vm');
         if (vmId) this.connect(vmId, this.getAttribute('options'));
      }

      disconnectedCallback() {
         this.disconnect();
      }

      attributeChangedCallback() {
         const vmId = this.getAttribute('vm');
         if (vmId) {
            this.disconnect();
            this.connect(vmId, this.getAttribute('options'));
         }
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
