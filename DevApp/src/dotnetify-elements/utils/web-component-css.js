import WebComponentHelper from "./web-component-helper";
import "./web-component-es5-adapter";
import { css } from "emotion";

export default function createWebComponent(Component, elementName, defaultProps, getCss) {
  if (!window.hasOwnProperty("customElements")) return { prototype: {} };

  class CustomElement extends HTMLElement {
    constructor() {
      super();
      this.helper = new WebComponentHelper(this);
      this.defaultProps = defaultProps || {};

      this.observer = new MutationObserver(mutationList => this.onAttributeChange(mutationList));
      this.observer.observe(this, { attributes: true });
    }

    get props() {
      return {
        css: "",
        ...this.defaultProps,
        ...this.helper.getProps(this.attributes, Component.propTypes)
      };
    }

    connectedCallback() {
      // Backdoor for components to add their own specific initialization.
      if (typeof this._connectedCallback == "function") this._connectedCallback();

      this.cssString = getCss(this);
      this.addCssClass(this.cssString);
    }

    onAttributeChange = _ => {
      const css = getCss(this);
      if (this.cssString !== css) {
        this.cssString = css;
        this.addCssClass(this.cssString);
      }
    };

    addCssClass(styles) {
      const cssClass = css`
        ${styles};
      `;
      if (this.cssClass && this.cssClass !== cssClass) this.classList.remove(this.cssClass);

      this.cssClass = cssClass;
      this.classList.add(this.cssClass);
    }
  }

  if (!window.customElements.get(elementName)) window.customElements.define(elementName, CustomElement);
  return CustomElement;
}
