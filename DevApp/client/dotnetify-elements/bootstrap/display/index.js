import { Alert as _Alert } from './Alert';

import { Alert } from '../../display/Alert';
import { LineChart } from '../../display/Chart';
import { DataGrid, GridColumn } from '../../display/DataGrid';
import { Image } from '../../display/Image';
import { Label } from '../../display/Label';
import { Markdown } from '../../display/Markdown';
import { MarkdownTOC } from '../../display/MarkdownTOC';

import ReactDataGrid from 'react-data-grid';
import { Line } from 'react-chartjs-2';

Alert.componentTypes.AlertComponent = _Alert;
LineChart.componentTypes.ChartComponent = Line;
DataGrid.componentTypes.DataGridComponent = ReactDataGrid;

export { Alert, Chart, DataGrid, GridColumn, Image, Label, LineChart, Markdown, MarkdownTOC };
