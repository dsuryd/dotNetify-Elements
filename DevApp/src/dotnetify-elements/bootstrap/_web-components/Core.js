import { Element, VMContext } from '../../core';
import createVMContextWebComponent from '../../web-components/VMContextComponent';
import createWebComponent from '../../utils/web-component';

createWebComponent(Element, 'd-element');
createVMContextWebComponent(VMContext, 'd-vm-context');
