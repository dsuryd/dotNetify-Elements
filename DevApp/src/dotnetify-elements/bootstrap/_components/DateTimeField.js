import { InputGroup } from "../form/Input";
import { DateTimePicker } from "../form/DateTimePicker";
import { DateTimeField, DateField, TimeField } from "../../form/DateTimeField";

Object.assign(DateTimeField.componentTypes, {
  InputComponent: DateTimePicker,
  InputGroupComponent: InputGroup
});

const window = window || global || {};
window.dotNetifyElements = {
  ...window.dotNetifyElements,
  DateTimeField,
  DateField,
  TimeField
};

export default DateTimeField;
export { DateTimeField, DateField, TimeField };
