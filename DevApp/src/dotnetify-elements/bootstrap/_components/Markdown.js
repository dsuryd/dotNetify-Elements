import { Markdown } from '../../display/Markdown';
import { MarkdownTOC } from '../../display/MarkdownTOC';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Markdown, MarkdownTOC };

export default Markdown;
export { Markdown, MarkdownTOC };
