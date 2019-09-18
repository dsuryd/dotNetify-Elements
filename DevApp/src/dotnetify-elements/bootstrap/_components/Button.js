import { Button as _Button } from '../form/Button';
import { Button } from '../../form/Button';

Button.componentTypes.ButtonComponent = _Button;

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Button };

export default Button;
export { Button };
