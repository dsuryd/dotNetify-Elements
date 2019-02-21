import { Multiselect } from '../form/Multiselect';
import { MultiselectList } from '../../form/MultiselectList';

Object.assign(MultiselectList.componentTypes, {
   InputComponent: Multiselect
});

export default MultiselectList;
export { MultiselectList };
