export default function createHtmlElement(Component, elementName, observedAttributes, useShadowDom) {
   class CustomElement extends HTMLElement {
      constructor() {
         const self = super();

         const customElement = this;
         const shadowRoot = useShadowDom ? this.attachShadow({ mode: 'open' }) : null;

         function getChildren(el) {
            const fragment = document.createDocumentFragment();
            while (el.childNodes.length) {
               fragment.appendChild(el.childNodes[0]);
            }
            return fragment;
         }

         const observer = new MutationObserver((list, obsv) => {
            ReactDOM.unmountComponentAtNode(useShadowDom ? shadowRoot : this);
            const props = [ ...this.attributes ].reduce((props, attribute) => ({ ...props, [attribute.name]: attribute.value }), {
               children: getChildren(this),
               customElement,
               shadowRoot
            });
            const instance = <Component {...props} />;
            ReactDOM.render(instance, useShadowDom ? shadowRoot : this);
            this.instance = instance;
            this.props = props;
         });

         observer.observe(self, {
            attributes: true
         });
      }

      connectedCallback() {
         // const customElement = this;
         // const shadowRoot = useShadowDom ? this.attachShadow({ mode: 'open' }) : null;
         // const props = [ ...this.attributes ].reduce((props, attribute) => ({ ...props, [attribute.name]: attribute.value }), {
         //    customElement,
         //    shadowRoot
         // });
         // const instance = <Component {...props} />;
         // ReactDOM.render(instance, useShadowDom ? shadowRoot : this);
         // this.instance = instance;
         // this.props = props;
      }
      // attributeChangedCallback(name, oldValue, newValue) {
      //    const { instance, shadowRoot, props } = this;
      //    if (!instance) return;

      //    const newProps = { ...props, ...{ [name]: newValue } };
      //    const newInstance = <Component {...newProps} />;

      //    ReactDOM.render(newInstance, useShadowDom ? shadowRoot : this);

      //    this.instance = newInstance;
      //    this.props = newProps;
      // }
   }

   window.customElements.define(elementName, CustomElement);
}
