import PropTypes from 'prop-types';

export default function createCustomElement(Component, elementName, useShadowDom) {
   class CustomElement extends HTMLElement {
      constructor() {
         super();
         this.mountRoot = useShadowDom ? this.attachShadow({ mode: 'open' }) : this;

         // Watch for attribute change on the custom element to render (and re-render) the React component.
         this.observer = new MutationObserver(() => this.remountComponent());
         this.observer.observe(this, { attributes: true });
      }

      onVMContextStateChange = _ => this.remountComponent();
      onVMContextLocalStateChange = _ => this.component && this.component.forceUpdate();

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
         // Move any custom element's child node to a document fragment, to be made the React component's children.
         const fragment = document.createDocumentFragment();
         this.childNodes.forEach(node => fragment.appendChild(node));

         this.props = this.getProps().reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {
            ...this.getEvents(),
            vmContext: this.vmContext
         });

         this.component = ReactDOM.render(<Component {...this.props} />, this.mountRoot);

         // If the React component can accept children, it will have "slotParent" reference as the append target.
         if (this.component.refs.slotParent) {
            const slotNode = ReactDOM.findDOMNode(this.component.refs.slotParent);
            if (slotNode && fragment.childNodes.length > 0) {
               slotNode.appendChild(fragment);
            }
         }
      }

      unmountComponent() {
         if (this.component) {
            ReactDOM.unmountComponentAtNode(this.mountRoot);
            this.component = null;
         }
      }

      remountComponent() {
         if (!this.component) this.mountComponent();
         else {
            this.unmountComponent();
            this.mountComponent();
         }
      }

      convertAttributeToProp(attrName, attrValue) {
         const propName = Object.keys(Component.propTypes).find(key => key.toLowerCase() == attrName);

         // Convert attribute value type, which is always string, to the expected property type.
         let value = attrValue;
         if (attrValue === 'true' || attrValue === 'false') value = !!attrValue;
         else if (!isNaN(attrValue)) value = +attrValue;
         else if (/{.*}/.exec(attrValue)) value = JSON.parse(attrValue);
         else if (propName && Component.propTypes[propName] == PropTypes.func) value = parseFunctionString(attrValue);

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

   window.customElements.define(elementName, CustomElement);
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
