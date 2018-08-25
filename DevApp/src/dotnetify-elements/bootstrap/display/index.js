import { Alert as _Alert } from './Alert';

import { Alert } from '../../display/Alert';
import { BarChart } from '../../display/BarChart';
import { LineChart } from '../../display/LineChart';
import { PieChart } from '../../display/PieChart';
import { DataGrid, GridColumn } from '../../display/DataGrid';
import { Image } from '../../display/Image';
import { Label } from '../../display/Label';
import { Markdown } from '../../display/Markdown';
import { MarkdownTOC } from '../../display/MarkdownTOC';

import ReactDataGrid from 'react-data-grid';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

Alert.componentTypes.AlertComponent = _Alert;
BarChart.componentTypes.ChartComponent = Bar;
LineChart.componentTypes.ChartComponent = Line;
PieChart.componentTypes.ChartComponent = Doughnut;
DataGrid.componentTypes.DataGridComponent = ReactDataGrid;

export { Alert, BarChart, DataGrid, GridColumn, Image, Label, LineChart, Markdown, MarkdownTOC, PieChart };
