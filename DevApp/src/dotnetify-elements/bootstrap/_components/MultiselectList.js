import { Multiselect } from "../form/Multiselect";
import { MultiselectList } from "../../form/MultiselectList";

Object.assign(MultiselectList.componentTypes, {
  InputComponent: Multiselect
});

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, MultiselectList };

export default MultiselectList;
export { MultiselectList };
