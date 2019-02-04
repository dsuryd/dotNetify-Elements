import { BarChart } from '../../display/BarChart';
import { LineChart } from '../../display/LineChart';
import { PieChart } from '../../display/PieChart';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

BarChart.componentTypes.ChartComponent = Bar;
LineChart.componentTypes.ChartComponent = Line;
PieChart.componentTypes.ChartComponent = Doughnut;

export { BarChart, LineChart, PieChart };
