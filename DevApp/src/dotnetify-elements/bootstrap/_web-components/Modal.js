import Modal from '../_components/Modal';
import createWebComponent from '../../utils/web-component';

let modalComponent = createWebComponent(Modal, 'd-modal');

modalComponent.prototype.open = function () {
   this.setAttribute('open', 'true');
};
modalComponent.prototype.close = function () {
   // Use setTimeout to allow the click event that triggers the modal close to bubble down first.
   setTimeout(() => {
      this.setAttribute('open', 'false');
      this.dispatchEvent(new CustomEvent('onclose'));
   });
};

// Don't unmount on re-render (due to setting 'open' attribute) so it can display closing animation.
modalComponent.unmountOnRerender = false;

export default Modal;
export { Modal };
