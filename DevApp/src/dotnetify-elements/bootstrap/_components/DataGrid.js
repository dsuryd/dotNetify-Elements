import { DataGrid, GridColumn } from '../../display/DataGrid';
import ReactDataGrid from 'react-data-grid';

DataGrid.componentTypes.DataGridComponent = ReactDataGrid;

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, DataGrid, GridColumn };

export default DataGrid;
export { DataGrid, GridColumn };
