import { Input, InputGroup } from '../form/Input';
import { PasswordField } from '../../form/PasswordField';
import './TextField';

Object.assign(PasswordField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

export default PasswordField;
export { PasswordField };
