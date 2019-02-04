import { Input, InputGroup } from '../form/Input';
import { TextField } from '../../form/TextField';

Object.assign(TextField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

export { TextField };
