import { InputGroup } from '../form/Input';
import { Select } from '../form/Select';
import { DropdownList } from '../../form/DropdownList';

Object.assign(DropdownList.componentTypes, {
   InputComponent: Select,
   InputGroupComponent: InputGroup
});

export default DropdownList;
export { DropdownList };
