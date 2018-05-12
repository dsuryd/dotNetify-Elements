import { Alert as _Alert } from './Alert';

import { Alert } from '../../../elements/display/Alert';
import { DataGrid, GridColumn } from '../../../elements/display/DataGrid';
import { Label } from '../../../elements/display/Label';
import { Markdown } from '../../../elements/display/Markdown';

import ReactDataGrid from 'react-data-grid';

Alert.componentTypes.AlertComponent = _Alert;
DataGrid.componentTypes.DataGridComponent = ReactDataGrid;

export { Alert, DataGrid, GridColumn, Label, Markdown };
