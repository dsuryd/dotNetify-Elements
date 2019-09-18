import { RichTextEditor } from '../../form/RichTextEditor';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, RichTextEditor };

export default RichTextEditor;
export { RichTextEditor };
