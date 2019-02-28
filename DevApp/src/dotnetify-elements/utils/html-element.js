export default function createHtmlElement(Component, elementName, useShadowDom) {
   class CustomElement extends HTMLElement {
      constructor() {
         super();
         this.mountRoot = useShadowDom ? this.attachShadow({ mode: 'open' }) : this;

         // Watch for attribute change on the custom element to render (and re-render) the React component.
         const observer = new MutationObserver(() => {
            this.unmountComponent();
            this.mountComponent();
         });
         observer.observe(this, { attributes: true });
      }

      disconnectedCallback() {
         this.unmountComponent();
      }

      mountComponent() {
         // Move any custom element's child node to a document fragment, to be made the React component's children.
         const fragment = document.createDocumentFragment();
         this.childNodes.forEach(node => fragment.appendChild(node));

         this.props = this.getAttributes().reduce((props, attribute) => ({ ...props, [attribute.name]: attribute.value }), {
            ...this.getEvents()
         });
         this.component = <Component {...this.props} />;
         const element = ReactDOM.render(this.component, this.mountRoot);

         // If the React component can accept children, it will have "slotParent" reference as the append target.
         if (element.refs.slotParent) {
            const slotNode = ReactDOM.findDOMNode(element.refs.slotParent);
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

      correctName(name) {
         const propName = Object.keys(Component.propTypes).find(key => key.toLowerCase() == name);
         return propName ? propName : name;
      }

      correctType(value) {
         if (value === 'true' || value === 'false') return !!value;
         if (!isNaN(value)) return +value;
         return value;
      }

      getAttributes() {
         return [ ...this.attributes ].map(attr => ({ name: this.correctName(attr.name), value: this.correctType(attr.value) }));
      }

      getEvents() {
         return Object.keys(Component.propTypes).filter(key => /on([A-Z].*)/.exec(key)).reduce(
            (events, e) => ({
               ...events,
               [e]: args => {
                  if (typeof this[e] == 'function') this[e](args);
                  dispatchEvent(new CustomEvent(e, { ...args }));
               }
            }),
            {}
         );
      }
   }

   window.customElements.define(elementName, CustomElement);
}
