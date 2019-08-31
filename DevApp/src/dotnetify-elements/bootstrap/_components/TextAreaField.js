import { InputGroup } from '../form/Input';
import { TextArea } from '../form/TextArea';
import { TextAreaField } from '../../form/TextAreaField';
import './TextField';

Object.assign(TextAreaField.componentTypes, {
   InputComponent: TextArea,
   InputGroupComponent: InputGroup
});

export default TextAreaField;
export { TextAreaField };
