import { DataGrid, GridColumn } from '../../display/DataGrid';
import ReactDataGrid from 'react-data-grid';

DataGrid.componentTypes.DataGridComponent = ReactDataGrid;

export default DataGrid;
export { DataGrid, GridColumn };
