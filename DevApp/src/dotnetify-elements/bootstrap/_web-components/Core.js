import { Element, VMContext } from '../../core';
import createVMContextWebComponent from '../../web-components/VMContextComponent';
import createWebComponent from '../../utils/web-component';

export { createWebComponent };
createWebComponent(Element, 'd-element');
createVMContextWebComponent(VMContext, 'd-vm-context');
