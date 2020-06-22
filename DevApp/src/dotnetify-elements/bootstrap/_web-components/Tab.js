import { Tab, TabItem } from "../_components/Tab";
import createTabComponent, { createTabItemComponent } from "../../web-components/structure/TabComponent";

createTabComponent(Tab, "d-tab");
createTabItemComponent(TabItem, "d-tab-item");

export default Tab;
export { Tab, TabItem };
