import { Input, InputGroup } from '../form/Input';
import { PasswordField } from '../../form/PasswordField';

Object.assign(PasswordField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

export default PasswordField;
export { PasswordField };
