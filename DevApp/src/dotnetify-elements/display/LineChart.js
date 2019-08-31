import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';
import { toChartJsConfig, toDataLabelPair } from './chart';
import 'chartjs-plugin-streaming';

const ChartContainer = styled.div`
   overflow-x: hidden;
   ${props => (props.width ? 'width: ' + props.width : '')};
   ${props => props.theme.LineChart};
   ${props => props.css};
`;

ChartContainer.defaultProps = { theme: utils.getDefaultTheme() };

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

   constructor(props) {
      super(props);
      this.isStreaming = this.checkStreaming(props);
   }

   checkDate(value) {
      return value && value.length >= 8 && Date.parse(value) !== NaN;
   }

   checkStreaming(props) {
      const xAxes = utils.nestedGet(props, 'config.options.scales.xAxes');
      return Array.isArray(xAxes) && xAxes.length > 0 && xAxes[0].type === 'realtime';
   }

   getConfig = (config, theme) => ({
      data: {
         datasets: [
            {
               backgroundColor: theme.LineChart.AreaColor,
               borderColor: theme.LineChart.LineColor,
               borderWidth: theme.LineChart.LineWidth
            }
         ]
      },
      ...config
   });

   shouldComponentUpdate() {
      if (this.isStreaming && this.value.length > 0) {
         const { data, label } = toDataLabelPair(this.value[this.value.length - 1]);
         this.chartData.datasets[0].data.push({ x: this.checkDate(label) ? new Date(label) : Date.now(), y: data });
         return false;
      }
      return true;
   }

   render() {
      if (!Array.isArray(this.value)) return null;

      const [ Container, Chart ] = this.resolveComponents(LineChart);
      const { fullId, config, width, height, style, css, ...props } = this.attrs;

      let theme = this.context && this.context.theme;
      if (!theme) theme = utils.getDefaultTheme();

      const _config = this.getConfig(config, theme);
      const { data, options } = toChartJsConfig(_config, props, this.value);

      this.chartData = data;

      // If using chartjs-plugin-streaming, data type is {x, y} where x is date.
      // Use label for x if it's date string, otherwise set Date.now() to latest data and works backward.
      if (this.isStreaming) {
         const maxIdx = this.value.length - 1;
         if (this.checkDate(this.chartData.labels[0]))
            this.chartData.datasets[0].data = this.value.map((data, idx) => ({ x: new Date(data[0]), y: data[1] }));
         else this.chartData.datasets[0].data = this.value.map((data, idx) => ({ x: Date.now() - (maxIdx - idx) * 1000, y: data[1] }));
      }

      return (
         <Container id={fullId} width={width} style={style} css={css}>
            <Chart data={this.chartData} options={options} height={utils.toPixel(height)} {...props} />
         </Container>
      );
   }
}
