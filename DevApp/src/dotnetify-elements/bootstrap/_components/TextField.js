import { Input, InputGroup } from "../form/Input";
import { TextField } from "../../form/TextField";

Object.assign(TextField.componentTypes, {
  InputComponent: Input,
  InputGroupComponent: InputGroup
});

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, TextField };

export default TextField;
export { TextField };
