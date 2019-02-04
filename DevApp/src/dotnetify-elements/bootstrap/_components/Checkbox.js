import { CheckboxInput, CheckboxLabel, CheckboxContainer, CheckboxPlainText } from '../form/Checkbox';
import { Checkbox } from '../../form/Checkbox';
import { CheckboxGroup } from '../../form/CheckboxGroup';

Object.assign(Checkbox.componentTypes, {
   Container: CheckboxContainer,
   LabelComponent: CheckboxLabel,
   InputComponent: CheckboxInput,
   PlainTextComponent: CheckboxPlainText
});

Object.assign(CheckboxGroup.componentTypes, {
   CheckboxContainer: CheckboxContainer,
   LabelComponent: CheckboxLabel,
   InputComponent: CheckboxInput
});

export { Checkbox, CheckboxGroup };
