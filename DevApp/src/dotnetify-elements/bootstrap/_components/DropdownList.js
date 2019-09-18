import { InputGroup } from '../form/Input';
import { Select } from '../form/Select';
import { DropdownList } from '../../form/DropdownList';

Object.assign(DropdownList.componentTypes, {
   InputComponent: Select,
   InputGroupComponent: InputGroup
});

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, DropdownList };

export default DropdownList;
export { DropdownList };
