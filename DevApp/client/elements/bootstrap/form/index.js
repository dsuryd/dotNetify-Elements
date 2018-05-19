import { Button as _Button } from './Button';
import { CheckboxInput, CheckboxLabel, CheckboxContainer } from './Checkbox';
import { DateTimePicker } from './DateTimePicker';
import { Input, InputGroup } from './Input';
import { Multiselect } from './Multiselect';
import { PlainText } from './PlainText';
import { RadioInput, RadioLabel, RadioContainer } from './Radio';
import { RadioToggleInput, RadioToggleLabel, RadioToggleGroupContainer, RadioToggleContainer } from './RadioToggle';
import { Select } from './Select';
import { TextArea } from './TextArea';

import { Button } from '../../../elements/form/Button';
import { Checkbox } from '../../../elements/form/Checkbox';
import { CheckboxGroup } from '../../../elements/form/CheckboxGroup';
import { DateTimeField, DateField, TimeField } from '../../../elements/form/DateTimeField';
import { DropdownList } from '../../../elements/form/DropdownList';
import { Form } from '../../../elements/form/Form';
import { MultiselectList } from '../../../elements/form/MultiselectList';
import { NumberField } from '../../../elements/form/NumberField';
import { PasswordField } from '../../../elements/form/PasswordField';
import { RadioGroup } from '../../../elements/form/RadioGroup';
import { RadioToggle } from '../../../elements/form/RadioToggle';
import { TextField } from '../../../elements/form/TextField';
import { TextAreaField } from '../../../elements/form/TextAreaField';

Button.componentTypes.ButtonComponent = _Button;

Object.assign(Checkbox.componentTypes, {
   Container: CheckboxContainer,
   LabelComponent: CheckboxLabel,
   InputComponent: CheckboxInput
});

Object.assign(CheckboxGroup.componentTypes, {
   CheckboxContainer: CheckboxContainer,
   LabelComponent: CheckboxLabel,
   InputComponent: CheckboxInput
});

Object.assign(DateTimeField.componentTypes, {
   InputComponent: DateTimePicker,
   InputGroupComponent: InputGroup
});

Object.assign(DropdownList.componentTypes, {
   InputComponent: Select,
   InputGroupComponent: InputGroup
});

Object.assign(MultiselectList.componentTypes, {
   InputComponent: Multiselect
});

Object.assign(NumberField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

Object.assign(PasswordField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

Object.assign(RadioGroup.componentTypes, {
   RadioContainer: RadioContainer,
   LabelComponent: RadioLabel,
   InputComponent: RadioInput
});

Object.assign(RadioToggle.componentTypes, {
   GroupContainer: RadioToggleGroupContainer,
   ToggleContainer: RadioToggleContainer,
   LabelComponent: RadioToggleLabel,
   InputComponent: RadioToggleInput
});

Object.assign(TextField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

Object.assign(TextAreaField.componentTypes, {
   InputComponent: TextArea,
   InputGroupComponent: InputGroup
});

export {
   Button,
   Checkbox,
   CheckboxGroup,
   DateTimeField,
   DateField,
   DropdownList,
   Form,
   MultiselectList,
   NumberField,
   PasswordField,
   PlainText,
   RadioGroup,
   RadioToggle,
   TextField,
   TextAreaField,
   TimeField
};
