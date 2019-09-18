import { Input, InputGroup } from '../form/Input';
import { PasswordField } from '../../form/PasswordField';
import './TextField';

Object.assign(PasswordField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, PasswordField };

export default PasswordField;
export { PasswordField };
