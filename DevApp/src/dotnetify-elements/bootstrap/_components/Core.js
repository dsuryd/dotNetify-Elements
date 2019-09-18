import dotnetify from 'dotnetify';
import { Element, VMContext, ContextTypes } from '../../core';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Element, VMContext, ContextTypes };

export default VMContext;
export { dotnetify, Element, VMContext, ContextTypes };
