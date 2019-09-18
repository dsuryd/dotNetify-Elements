import { Checkbox, CheckboxGroup } from '../_components/Checkbox';
import createWebComponent from '../../utils/web-component';

createWebComponent(Checkbox, 'd-checkbox');
createWebComponent(CheckboxGroup, 'd-checkbox-group');

export default Checkbox;
export { Checkbox, CheckboxGroup };
