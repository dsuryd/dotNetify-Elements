import Cell from '../_components/Cell';
import createWebComponent from '../../utils/web-component';

let cellComponent = createWebComponent(Cell, 'd-cell');
cellComponent.prototype._isContainer = true;
cellComponent.prototype._connectedCallback = function() {
   this.style.display = 'flex';
   this.style.flex = '1';
};

export default Cell;
export { Cell };
