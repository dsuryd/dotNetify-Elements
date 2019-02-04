import { Input, InputGroup } from '../form/Input';
import { NumberField } from '../../form/NumberField';

Object.assign(NumberField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

export { NumberField };
