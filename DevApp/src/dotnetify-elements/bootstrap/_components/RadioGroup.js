import { RadioInput, RadioLabel, RadioContainer } from '../form/Radio';
import { RadioGroup } from '../../form/RadioGroup';

Object.assign(RadioGroup.componentTypes, {
   RadioContainer: RadioContainer,
   LabelComponent: RadioLabel,
   InputComponent: RadioInput
});

export { RadioGroup };
