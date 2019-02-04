import { InputGroup } from '../form/Input';
import { DateTimePicker } from '../form/DateTimePicker';
import { DateTimeField, DateField, TimeField } from '../../form/DateTimeField';

Object.assign(DateTimeField.componentTypes, {
   InputComponent: DateTimePicker,
   InputGroupComponent: InputGroup
});

export { DateTimeField, DateField, TimeField };
