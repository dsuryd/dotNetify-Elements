import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';
import { toChartJsConfig } from './chart';
import lightTheme from '../theme-light';
import createWebComponent from '../utils/web-component';
import 'chartjs-plugin-streaming';

const ChartContainer = styled.div`
   overflow-x: hidden;
   ${props => (props.width ? 'width: ' + props.width : '')};
   ${props => props.theme.LineChart};
   ${props => props.css};
`;

ChartContainer.defaultProps = { theme: lightTheme };

export class LineChart extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Chart configuration.
      config: PropTypes.object,

      // Sets custom height.
      height: PropTypes.string,

      // Sets custom width.
      width: PropTypes.string
   };

   static componentTypes = {
      ChartContainer,
      ChartComponent: undefined
   };

   getConfig = (config, theme) => ({
      data: {
         datasets: [
            {
               // backgroundColor: theme.LineChart.AreaColor,
               // borderColor: theme.LineChart.LineColor,
               backgroundColor: 'rgba(217,237,245,0.4)',
               borderColor: '#9acfea',
               borderWidth: theme.LineChart.LineWidth
            }
         ]
      },
      options: {
         scales: {
            xAxes: [
               {
                  type: 'realtime',
                  realtime: { delay: 2000 }
               }
            ],
            yAxes: [
               {
                  ticks: {
                     suggestedMin: -1,
                     suggestedMax: 1
                  }
               }
            ]
         }
      },
      ...config
   });

   shouldComponentUpdate() {
      if (this.value.length > 0) {
         const data = this.value[this.value.length - 1];
         this.chartData.datasets[0].data.push({ x: Date.now(), y: data[1] });
         return false;
      }
      return true;
   }

   render() {
      if (!Array.isArray(this.value)) return null;

      const [ Container, Chart ] = this.resolveComponents(LineChart);
      const { fullId, config, width, height, style, css, ...props } = this.attrs;

      let theme = this.context && this.context.theme;
      if (!theme) theme = lightTheme;

      const _config = this.getConfig(config, theme);
      const { data, options } = toChartJsConfig(_config, props, this.value);
      this.chartData = data;
      const maxIdx = this.value.length - 1;
      // this.chartData.labels = data.map(x => x[0]);
      this.chartData.datasets[0].data = this.value.map((data, idx) => ({ x: Date.now() - (maxIdx - idx) * 1000, y: data[1] }));

      return (
         <Container id={fullId} width={width} style={style} css={css}>
            <Chart data={this.chartData} options={options} height={utils.toPixel(height)} {...props} />
         </Container>
      );
   }
}

createWebComponent(LineChart, 'd-line-chart');
