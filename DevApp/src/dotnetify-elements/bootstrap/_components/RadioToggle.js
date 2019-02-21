import { RadioToggleInput, RadioToggleLabel, RadioToggleGroupContainer, RadioToggleContainer } from '../form/RadioToggle';
import { RadioToggle } from '../../form/RadioToggle';

Object.assign(RadioToggle.componentTypes, {
   GroupContainer: RadioToggleGroupContainer,
   ToggleContainer: RadioToggleContainer,
   LabelComponent: RadioToggleLabel,
   InputComponent: RadioToggleInput
});

export default RadioToggle;
export { RadioToggle };
