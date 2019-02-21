import { Cell as _Cell, CellHeader, CellBody } from '../structure/Cell';
import { Cell } from '../../structure/Cell';

Object.assign(Cell.componentTypes, {
   Container: _Cell,
   HeaderContainer: CellHeader,
   BodyContainer: CellBody
});

export default Cell;
export { Cell };
