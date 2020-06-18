import { Tab, TabItem } from "../_components/Tab";
import createWebComponent from "../../utils/web-component";

let tabComponent = createWebComponent(Tab, "d-tab");
tabComponent.prototype._isContainer = true;

let tabItemComponent = createWebComponent(TabItem, "d-tab-item");
tabItemComponent.prototype._isContainer = true;

export default Tab;
export { Tab, TabItem };
