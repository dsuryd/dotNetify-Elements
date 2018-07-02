import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';

const ChartContainer = styled.div``;

export class PieChart extends Element {
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

   toChartJsData(config, props, value) {
      let { labels, xAxisLabel, yAxisLabel } = props;

      let data;
      if (typeof value[1] != 'undefined') {
         labels = value.map(x => x[0]);
         data = value.map(x => x[1]);
      }
      else {
         data = value.map(x => x[0]);
      }

      return {
         labels: labels,
         datasets: [
            {
               label: '',
               data: data
            }
         ]
      };
   }

   render() {
      const [ Container, Chart ] = this.resolveComponents(PieChart);
      const { fullId, config, style, css, ...props } = this.attrs;

      if (!Array.isArray(this.value)) return null;
      const data = this.toChartJsData(config, props, this.value);

      return (
         <Container id={fullId} style={style} css={css}>
            <Chart data={data} options={options} {...props} />
         </Container>
      );
   }
}
