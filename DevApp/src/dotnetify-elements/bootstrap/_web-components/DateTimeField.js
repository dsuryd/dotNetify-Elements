import { DateTimeField, DateField, TimeField } from '../_components/DateTimeField';
import createWebComponent from '../../utils/web-component';

createWebComponent(DateTimeField, 'd-date-time-field');
createWebComponent(DateField, 'd-date-field');
createWebComponent(TimeField, 'd-time-field');

export default DateTimeField;
export { DateTimeField, DateField, TimeField };
