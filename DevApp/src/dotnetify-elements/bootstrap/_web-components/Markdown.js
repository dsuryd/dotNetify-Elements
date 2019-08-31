import { Markdown, MarkdownTOC } from '../_components/Markdown';
import createWebComponent from '../../utils/web-component';

let markdownComponent = createWebComponent(Markdown, 'd-markdown');
markdownComponent.prototype._isContainer = true;

createWebComponent(MarkdownTOC, 'd-markdown-toc');
