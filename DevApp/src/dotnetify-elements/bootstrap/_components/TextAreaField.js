import { InputGroup } from '../form/Input';
import { TextArea } from '../form/TextArea';
import { TextAreaField } from '../../form/TextAreaField';

Object.assign(TextAreaField.componentTypes, {
   InputComponent: TextArea,
   InputGroupComponent: InputGroup
});

export { TextAreaField };
