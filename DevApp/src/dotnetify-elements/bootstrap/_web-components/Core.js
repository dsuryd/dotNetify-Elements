import { dotnetify, Element, VMContext, ContextTypes } from "../../core";
import createVMContextWebComponent from "../../web-components/VMContextComponent";
import createWebComponent from "../../utils/web-component";

createWebComponent(Element, "d-element");
createVMContextWebComponent(VMContext, "d-vm-context");

export default VMContext;
export { dotnetify, Element, VMContext, ContextTypes };
export { createWebComponent };
