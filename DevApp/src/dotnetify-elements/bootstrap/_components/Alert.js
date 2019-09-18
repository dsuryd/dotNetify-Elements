import { Alert as _Alert } from '../display/Alert';
import { Alert } from '../../display/Alert';

Alert.componentTypes.AlertComponent = _Alert;

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Alert };

export default Alert;
export { Alert };
