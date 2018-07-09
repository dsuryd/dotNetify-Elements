import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';
import { toChartJsConfig } from './chart';

const ChartContainer = styled.div`
   overflow-x: hidden;
   ${props => (props.width ? 'width: ' + props.width : '')};
   ${props => props.theme.LineChart};
   ${props => props.css};
`;

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
               backgroundColor: theme.LineChart.AreaColor,
               borderColor: theme.LineChart.LineColor,
               borderWidth: theme.LineChart.LineWidth
            }
         ]
      },
      ...config
   });

   render() {
      if (!this.context.theme) {
         console.error('ERROR: LineChart must be nested inside a Theme component.');
         throw 'error';
      }
      if (!Array.isArray(this.value)) return null;

      const [ Container, Chart ] = this.resolveComponents(LineChart);
      const { fullId, config, width, height, style, css, ...props } = this.attrs;

      const _config = this.getConfig(config, this.context && this.context.theme);
      const { data, options } = toChartJsConfig(_config, props, this.value);

      return (
         <Container id={fullId} width={width} style={style} css={css}>
            <Chart data={data} options={options} height={utils.toPixel(height)} {...props} />
         </Container>
      );
   }
}
