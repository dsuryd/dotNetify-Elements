import { Frame, Panel } from "../_components/Panel";
import createWebComponent from "../../web-components/PanelComponent";

createWebComponent(Panel, "d-panel");

let frameComponent = createWebComponent(Frame, "d-frame");
frameComponent.prototype._connectedCallback = function () {
  this.defaultProps = {
    noMargin: false
  };
};

export default Panel;
export { Frame, Panel };
