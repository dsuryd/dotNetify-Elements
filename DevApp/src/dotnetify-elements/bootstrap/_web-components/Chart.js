import { BarChart, LineChart, PieChart } from '../_components/Chart';
import createWebComponent from '../../utils/web-component';

createWebComponent(LineChart, 'd-line-chart');
createWebComponent(BarChart, 'd-bar-chart');
createWebComponent(PieChart, 'd-pie-chart');

export { BarChart, LineChart, PieChart };
