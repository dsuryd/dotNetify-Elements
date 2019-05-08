import WebComponentHelper from './web-component-helper';
import * as utils from '../utils';

export default function createWebComponent(Component, elementName, useShadowDom) {
   if (utils.isIE11() || !window.hasOwnProperty('customElements')) return { prototype: {} };

   class CustomElement extends HTMLElement {
      constructor() {
         super();

         this.mountRoot = useShadowDom ? this.attachShadow({ mode: 'open' }) : this;

         // Watch for attribute change on the custom element to render the React component.
         this.observer = new MutationObserver(() => this.onAttributeChange());
         this.observer.observe(this, { attributes: true });
      }

      onAttributeChange = _ => {
         // Handle when this is a <d-element> with a template.
         this.setElementTemplate();

         // If the element is within a VMContext element, don't render the component until it has state.
         const vmContextElem = this.closest('d-vm-context');
         if (!vmContextElem || vmContextElem.context.getState()) this.renderComponent(true);
      };

      onFormContextStateChange = e => {
         // Re-mount the component if it's nested inside a form component and its 'plainText'
         // property changes, indicating edit mode is toggled.
         this.component && this.renderComponent(e.detail.state.hasOwnProperty('plainText'));
      };

      onVMContextStateChange = _ => this.renderComponent();

      onVMContextLocalStateChange = _ => this.component && this.renderComponent();

      connectedCallback() {
         // Backdoor for components to add their own specific initialization.
         if (typeof this._connectedCallback == 'function') this._connectedCallback();

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

         // Handle when this is a <d-element> with a template.
         this.setElementTemplate();

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

      getChildrenProp(helper) {
         this.childrenHtml = this.childrenHtml || this.innerHTML;
         if (this.childrenHtml) return { children: helper.parseHtmlToReact(this.childrenHtml) };
      }

      getTemplateProp() {
         if (this.template) return { template: this.template };
      }

      mountComponent() {
         const helper = new WebComponentHelper(this);
         this.props = {
            ...helper.getProps(this.attributes, Component.propTypes),
            ...helper.getEvents(this.attributes, Component.propTypes),
            vmContext: this.vmContext,
            formContext: this.formContext
         };

         // If this is a nested container, mount only after the parent container is mounted.
         if (this._isContainer) {
            const container = helper.getContainerParent();
            if (container && container.mountState !== 'mounted') return;
         }

         Object.assign(this.props, this.getTemplateProp() || this.getChildrenProp(helper));

         this.mountState = 'mounting';
         this.component = ReactDOM.render(<Component {...this.props} />, this.mountRoot);
         this.mountState = 'mounted';
      }

      unmountComponent() {
         if (this.component) {
            ReactDOM.unmountComponentAtNode(this.mountRoot);
            this.component = null;
         }
         this.mountState = null;
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

      setElementTemplate() {
         // We may expect the child of <d-element> to be a template, in which case store it in a local
         // variable so we can pass to the inner React component on mount.
         if (this.nodeName === 'D-ELEMENT' && !this.template && this.children.length > 0) {
            const elem = this.cloneNode(true);
            this.template = document.createElement('template');
            while (elem.children.length) this.template.content.appendChild(elem.children[0]);
         }
      }
   }

   if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement);
   return CustomElement;
}
