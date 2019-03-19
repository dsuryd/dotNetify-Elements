import htmlToReact from 'html-to-react';
import WebComponentHelper from './web-component-helper';

export default function createWebComponent(Component, elementName, useShadowDom) {
   class CustomElement extends HTMLElement {
      constructor() {
         super();

         this.mountRoot = useShadowDom ? this.attachShadow({ mode: 'open' }) : this;

         // Watch for attribute change on the custom element to render the React component.
         this.observer = new MutationObserver(() => {
            // If the element is within a VMContext element, don't render the component until it has state.
            const vmContextElem = this.closest('d-vm-context');
            if (!vmContextElem || vmContextElem.context.getState()) this.renderComponent(true);
         });
         this.observer.observe(this, { attributes: true });
      }

      onVMContextStateChange = _ => this.renderComponent();
      onVMContextLocalStateChange = _ => this.renderComponent();
      onFormContextStateChange = _ => this.renderComponent();

      connectedCallback() {
         this.vmContextElem = this.closest('d-vm-context');

         if (!this.vmContextElem) {
            const modals = document.getElementsByTagName('d-modal');
            if (modals.length > 0) this.vmContextElem = modals[0].closest('d-vm-context');
         }

         if (this.vmContextElem) {
            this.vmContext = this.vmContextElem.context;
            this.vmContextElem.addEventListener('onStateChange', this.onVMContextStateChange);
            this.vmContextElem.addEventListener('onLocalStateChange', this.onVMContextLocalStateChange);
         }

         this.formElem = this.closest('d-form');
         if (this.formElem) {
            this.vmContext = this.formElem.context.vmContext;
            this.formContext = this.formElem.context.formContext;
            this.formElem.addEventListener('onStateChange', this.onFormContextStateChange);
         }

         // React render occurs when an attribute is set, but if there's no attribute, call
         // the render here, but use setTimeout to have it rendered after its parent.
         if (!this.hasAttributes()) setTimeout(() => this.renderComponent());
      }

      disconnectedCallback() {
         this.unmountComponent();
         this.observer.disconnect();
         if (this.vmContextElem) {
            this.vmContextElem.removeEventListener('onStateChange', this.onVMContextStateChange);
            this.vmContextElem.removeEventListener('onLocalStateChange', this.onVMContextLocalStateChange);
         }
         if (this.formElem) this.formElem.removeEventListener('onStateChange', this.onFormContextStateChange);
      }

      mountComponent() {
         const helper = new WebComponentHelper(this);
         this.props = {
            ...helper.getProps(this.attributes, Component.propTypes),
            ...helper.getEvents(this.attributes, Component.propTypes),
            vmContext: this.vmContext,
            formContext: this.formContext
         };

         this.childrenHtml = this.childrenHtml || this.innerHTML;
         if (this.childrenHtml) Object.assign(this.props, { children: new htmlToReact.Parser().parse(this.childrenHtml) });
         this.component = ReactDOM.render(<Component {...this.props} />, this.mountRoot);
      }

      unmountComponent() {
         if (this.component) {
            ReactDOM.unmountComponentAtNode(this.mountRoot);
            this.component = null;
         }
      }

      renderComponent(remount) {
         if (!this.component) this.mountComponent();
         else if (this.vmContext && !remount) {
            if (typeof this.component.shouldComponentUpdate == 'function') {
               if (this.component.shouldComponentUpdate()) this.component.forceUpdate();
            }
            else this.component.forceUpdate();
         }
         else {
            this.unmountComponent();
            this.mountComponent();
         }
      }
   }

   if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement);
}
