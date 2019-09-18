import { Input, InputGroup } from '../form/Input';
import { NumberField } from '../../form/NumberField';

Object.assign(NumberField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, NumberField };

export default NumberField;
export { NumberField };
