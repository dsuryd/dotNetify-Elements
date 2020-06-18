import { InputGroup } from "../form/Input";
import { TextArea } from "../form/TextArea";
import { TextAreaField } from "../../form/TextAreaField";
import "./TextField";

Object.assign(TextAreaField.componentTypes, {
  InputComponent: TextArea,
  InputGroupComponent: InputGroup
});

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, TextAreaField };

export default TextAreaField;
export { TextAreaField };
