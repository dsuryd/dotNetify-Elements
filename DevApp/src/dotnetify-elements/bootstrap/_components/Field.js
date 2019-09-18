import { Field } from '../../structure/Field';
import { PlainText } from '../form/PlainText';

Field.componentTypes.PlainTextComponent = PlainText;

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Field };

export default Field;
export { Field };
