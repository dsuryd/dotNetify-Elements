import { Tab as _Tab, TabItem as _TabItem } from "../structure/Tab";
import { Tab, TabItem } from "../../structure/Tab";

Tab.componentTypes.TabContainer = _Tab;
TabItem.componentTypes.TabItemComponent = _TabItem;

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Tab, TabItem };

export default Tab;
export { Tab, TabItem };
