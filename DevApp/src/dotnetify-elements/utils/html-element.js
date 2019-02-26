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

         this.props = [ ...this.attributes ].reduce(
            (props, attribute) => ({ ...props, [attribute.name]: this.correctValueType(attribute.value) }),
            { onChange: e => console.warn(e) }
         );
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

      correctValueType(value) {
         if (value === 'true' || value === 'false') return !!value;
         if (!isNaN(value)) return +value;
         return value;
      }
   }

   window.customElements.define(elementName, CustomElement);
}
