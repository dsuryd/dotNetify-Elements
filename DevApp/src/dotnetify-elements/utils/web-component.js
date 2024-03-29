import WebComponentHelper from "./web-component-helper";
import "./web-component-es5-adapter";

export default function createWebComponent(Component, elementName, useShadowDom) {
  if (!window.hasOwnProperty("customElements")) return { prototype: {} };

  class CustomElement extends HTMLElement {
    get vmContext() {
      if (this.formElem) return this.formElem.context.vmContext;
      else if (this.vmContextElem) return this.vmContextElem.context;
      return null;
    }

    get formContext() {
      return this.formElem ? this.formElem.context.formContext : null;
    }

    constructor() {
      super();

      this.mountRoot = useShadowDom ? this.attachShadow({ mode: "open" }) : this;

      // Watch for attribute change on the custom element to render the React component.
      this.observer = new MutationObserver(mutations => this.onAttributeChange(mutations));
      this.observer.observe(this, { attributes: true });
    }

    onAttributeChange = mutations => {
      const props = mutations.reduce(
        (prev, x) => ({
          ...prev,
          [x.attributeName]: this.getAttribute(x.attributeName)
        }),
        {}
      );

      // If the element is within a VMContext element, don't render the component until it has state.
      const vmContextElem = this.closest("d-vm-context");
      if (!vmContextElem || vmContextElem.context.getState()) this.renderComponent(props);
    };

    onFormContextStateChange = e => {
      // Re-mount the component if it's nested inside a form component and its 'plainText'
      // property changes, indicating edit mode is toggled.
      const props = e.detail.state.hasOwnProperty("plainText") ? { plainText: e.detail.state.plainText } : null;
      this.component && this.renderComponent(props);
    };

    onVMContextStateChange = _ => this.renderComponent();

    onVMContextLocalStateChange = _ => this.component && this.renderComponent();

    connectedCallback() {
      // Backdoor for components to add their own specific initialization.
      if (typeof this._connectedCallback == "function") this._connectedCallback();

      this.vmContextElem = this.closest("d-vm-context");
      if (!this.vmContextElem) {
        const modals = document.getElementsByTagName("d-modal");
        if (modals.length > 0) this.vmContextElem = modals[0].closest("d-vm-context");
      }
      if (this.vmContextElem) {
        this.vmContextElem.addEventListener("onStateChange", this.onVMContextStateChange);
        this.vmContextElem.addEventListener("onLocalStateChange", this.onVMContextLocalStateChange);
      }

      this.formElem = this.closest("d-form");
      if (this.formElem) {
        this.formElem.addEventListener("onStateChange", this.onFormContextStateChange);
      }

      // Use setTimeout to have this element rendered after its parent.
      if (!this.vmContextElem || this.vmContextElem.state) setTimeout(() => this.renderComponent());
    }

    disconnectedCallback() {
      this.unmountComponent();
      this.observer.disconnect();
      if (this.vmContextElem) {
        this.vmContextElem.removeEventListener("onStateChange", this.onVMContextStateChange);
        this.vmContextElem.removeEventListener("onLocalStateChange", this.onVMContextLocalStateChange);
      }
      if (this.formElem) this.formElem.removeEventListener("onStateChange", this.onFormContextStateChange);
    }

    getChildrenProp(helper) {
      this.childrenHtml = this.childrenHtml || this.innerHTML;
      let children = helper.parseHtmlToReact(this.childrenHtml);
      if (Array.isArray(children)) children = children.filter(x => typeof x !== "string" || !!x.trim());
      if (this.childrenHtml) return { children };
    }

    getTemplateProp() {
      this.loadElementTemplate();
      if (this.template) return { template: this.template };
    }

    loadElementTemplate() {
      // We may expect the child of <d-element> to be a template, in which case store it in a local
      // variable so we can pass to the inner React component on mount.
      if (this.nodeName === "D-ELEMENT" && !this.template && this.children.length > 0) {
        const elem = this.cloneNode(true);
        this.template = document.createElement("template");
        while (elem.children.length) this.template.content.appendChild(elem.children[0]);
      }
    }

    mountComponent() {
      const helper = new WebComponentHelper(this);
      this.props = {
        ...helper.getProps(this.attributes, Component.propTypes),
        ...helper.getEvents(this.attributes, Component.propTypes),
        vmContext: this.vmContext,
        formContext: this.formContext
      };

      // If this is nested in a container, mount only after the parent container is mounted.
      const container = helper.getContainerParent();
      if (container && container.mountState !== "mounted") return;

      Object.assign(this.props, this.getTemplateProp() || this.getChildrenProp(helper));

      this.mountState = "mounting";
      this.component = ReactDOM.render(<Component {...this.props} />, this.mountRoot);
      this.mountState = "mounted";
      this.dispatchEvent(new CustomEvent("mounted"));
    }

    unmountComponent() {
      if (this.component) {
        ReactDOM.unmountComponentAtNode(this.mountRoot);
        this.component = null;
      }
      this.mountState = null;
    }

    renderComponent(props) {
      if (this.component) {
        if (this.vmContext && props == null) {
          if (typeof this.component.shouldComponentUpdate == "function") {
            if (this.component.shouldComponentUpdate({})) this.component.forceUpdate();
          } else this.component.forceUpdate();
          return;
        } else if (props && props.hasOwnProperty("value") && typeof this.component.setControlledValue == "function") {
          // If the 'value' property changes on a controlled component, use the provided function
          // to set the value so that React can update the component.
          this.component.setControlledValue(props.value);
          return;
        } else if (this.unmountOnRerender !== false) {
          this.unmountComponent();
        }
      }
      this.mountComponent();
    }
  }

  if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement);
  return CustomElement;
}
