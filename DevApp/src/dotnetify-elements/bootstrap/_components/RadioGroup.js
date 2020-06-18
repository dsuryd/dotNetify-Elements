import { RadioInput, RadioLabel, RadioContainer } from "../form/Radio";
import { RadioGroup } from "../../form/RadioGroup";

Object.assign(RadioGroup.componentTypes, {
  RadioContainer: RadioContainer,
  LabelComponent: RadioLabel,
  InputComponent: RadioInput
});

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, RadioGroup };

export default RadioGroup;
export { RadioGroup };
