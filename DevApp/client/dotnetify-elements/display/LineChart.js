import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import { toChartJsData, toChartJsOptions } from './chart';

const ChartContainer = styled.div`
   ${props => props.theme.LineChart};
   ${props => props.css};
`;

export class LineChart extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string,

      // Chart configuration.
      config: PropTypes.object
   };

   static componentTypes = {
      ChartContainer,
      ChartComponent: undefined
   };

   render() {
      const [ Container, Chart ] = this.resolveComponents(LineChart);
      const { fullId, config, width, height, style, css, ...props } = this.attrs;

      if (!Array.isArray(this.value)) return null;
      const data = toChartJsData(config, props, this.value);
      const options = toChartJsOptions(config, props);

      return (
         <Container id={fullId} width={width} height={height} style={style} css={css}>
            <Chart data={data} options={options} {...props} />
         </Container>
      );
   }
}
