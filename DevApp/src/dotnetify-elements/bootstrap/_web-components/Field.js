import Field from "../_components/Field";
import createWebComponent from "../../utils/web-component";

let fieldComponent = createWebComponent(Field, "d-field");
fieldComponent.prototype._isContainer = true;

export default Field;
export { Field };
