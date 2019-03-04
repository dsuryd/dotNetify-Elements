import VMContextStore from '../_internal/VMContextStore';
import { parseFunctionString } from '../utils/custom-element';

export default class VMContextCustomElement extends HTMLElement {
   constructor() {
      super();
      this.store = new VMContextStore(this);
   }

   onStateChange = state => {
      const onStateChange = parseFunctionString(this.getAttribute('onStateChange'));
      if (typeof onStateChange == 'function') onStateChange(state);
      this.dispatchEvent(new CustomEvent('onStateChange', state));
   };

   connectedCallback() {
      const vmId = this.getAttribute('vm');
      const optionsStr = this.getAttribute('options');

      const options = /{.*}/.exec(optionsStr) ? JSON.parse(optionsStr) : null;
      this.store.connect(vmId, options, this.onStateChange);
   }

   disconnectedCallback() {
      this.store.destroy();
   }

   get context() {
      return { _type: 'custom', ...this.store.context };
   }

   setState(state) {
      this.state = Object.assign(this.state || {}, state);
      this.dispatchEvent(new CustomEvent('onLocalStateChange', state));
   }
}
