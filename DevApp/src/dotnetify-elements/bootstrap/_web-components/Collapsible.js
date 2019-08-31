import Collapsible from '../_components/Collapsible';
import createWebComponent from '../../utils/web-component';

let collapsibleComponent = createWebComponent(Collapsible, 'd-collapsible');
collapsibleComponent.prototype._isContainer = true;
