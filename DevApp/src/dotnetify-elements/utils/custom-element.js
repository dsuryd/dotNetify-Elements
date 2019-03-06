import htmlToReact from 'html-to-react';

export default function createCustomElement(Component, elementName, useShadowDom) {
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

      connectedCallback() {
         this.vmContextElem = this.closest('d-vm-context');
         if (this.vmContextElem) {
            this.vmContext = this.vmContextElem.context;
            this.vmContextElem.addEventListener('onStateChange', this.onVMContextStateChange);
            this.vmContextElem.addEventListener('onLocalStateChange', this.onVMContextLocalStateChange);
         }
      }

      disconnectedCallback() {
         this.unmountComponent();
         this.observer.disconnect();
         if (this.vmContextElem) {
            this.vmContextElem.removeEventListener('onStateChange', this.onVMContextStateChange);
            this.vmContextElem.removeEventListener('onLocalStateChange', this.onVMContextLocalStateChange);
         }
      }

      mountComponent() {
         this.props = this.getProps().reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {
            ...this.getEvents(),
            vmContext: this.vmContext
         });

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
         else if (this.vmContext && !remount) this.component.forceUpdate();
         else {
            this.unmountComponent();
            this.mountComponent();
         }
      }

      convertAttributeToProp(attrName, attrValue) {
         const propName = Object.keys(Component.propTypes).find(key => key.toLowerCase() == attrName);

         // Convert attribute value type, which is always string, to the expected property type.
         let value = attrValue;
         if (attrValue === 'true' || attrValue === 'false') value = attrValue == 'true';
         else if (!isNaN(attrValue) && attrValue !== '') value = +attrValue;
         else if (/{.*}/.exec(attrValue)) value = JSON.parse(attrValue);
         else if (/([A-z0-9$_]*)\(.*\)/.exec(attrValue)) value = parseFunctionString(attrValue);

         return {
            name: propName ? propName : attrName,
            value: value
         };
      }

      getProps() {
         return [ ...this.attributes ].map(attr => this.convertAttributeToProp(attr.name, attr.value));
      }

      getEvents() {
         return Object.keys(Component.propTypes).filter(key => /on([A-Z].*)/.exec(key)).reduce(
            (events, e) => ({
               ...events,
               [e]: args => {
                  if (typeof this[e] == 'function') this[e](args);
                  this.dispatchEvent(new CustomEvent(e, { ...args }));
               }
            }),
            {}
         );
      }
   }

   if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement);
}

export function parseFunctionString(funcString) {
   if (!funcString) return null;
   return args => {
      // Parse the function name from the attribute value.
      const match = /([A-z0-9$_]*)\(?\)?/.exec(funcString);
      const fnName = match ? match[1] : funcString;
      if (typeof window[fnName] === 'function') window[fnName](args);
      else eval(funcString.replace('$event', `'${JSON.stringify(args)}'`));
   };
}
