import { Form } from '../../form/Form';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Form };

export default Form;
export { Form };
