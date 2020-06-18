import WebComponentHelper from "./web-component-helper";
import "./web-component-es5-adapter";
import { css } from "emotion";

export default function createWebComponent(
  Component,
  elementName,
  defaultProps,
  getCss
) {
  if (!window.hasOwnProperty("customElements")) return { prototype: {} };

  class CustomElement extends HTMLElement {
    constructor() {
      super();
      this.helper = new WebComponentHelper(this);
      this.defaultProps = defaultProps || {};

      this.observer = new MutationObserver((mutationList) =>
        this.onAttributeChange(mutationList)
      );
      this.observer.observe(this, { attributes: true });
    }

    get props() {
      return {
        ...this.defaultProps,
        ...this.helper.getProps(this.attributes, Component.propTypes)
      };
    }

    connectedCallback() {
      // Backdoor for components to add their own specific initialization.
      if (typeof this._connectedCallback == "function")
        this._connectedCallback();

      this.addCssClass(getCss(this));
    }

    onAttributeChange = (mutationList) => {
      // Avoid infinite loop due to class name update.
      if (mutationList.length == 1 && mutationList[0].attributeName === "class")
        return;
      this.addCssClass(getCss(this));
    };

    addCssClass(styles) {
      const cssClass = css`
        ${styles};
      `;
      if (this.cssClass && this.cssClass !== cssClass)
        this.classList.remove(this.cssClass);

      this.cssClass = cssClass;
      this.classList.add(this.cssClass);
    }
  }

  if (!window.customElements.get(elementName))
    window.customElements.define(elementName, CustomElement);
  return CustomElement;
}
