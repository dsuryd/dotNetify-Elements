import { Label } from "../../display/Label";

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Label };

export default Label;
export { Label };
