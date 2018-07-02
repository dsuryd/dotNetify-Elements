import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';

const ChartContainer = styled.div``;

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
               ...config.datasets[0],
               data: data
            }
         ]
      };
   }

   render() {
      const [ Container, Chart ] = this.resolveComponents(LineChart);
      const { fullId, config, style, css, ...props } = this.attrs;

      if (!Array.isArray(this.value)) return null;
      const data = this.toChartJsData(config, props, this.value);

      /*
      const config = {
         labels: new Array(data.length),
         datasets: [
            {
               data: data,
               fill: false,
               backgroundColor: 'white',
               borderColor: '#8884d8',
               borderWidth: 2,
               pointBorderWidth: 2,
               cubicInterpolationMode: 'monotone'
            }
         ]
      };*/
      const options = {
         legend: false,
         scales: {
            yAxes: [
               {
                  scaleLabel: {
                     display: true,
                     labelString: 'Freq'
                  }
               }
            ],
            xAxes: [
               {
                  scaleLabel: {
                     display: true,
                     labelString: 'TIme'
                  }
               }
            ]
         }
      };

      return (
         <Container id={fullId} style={style} css={css}>
            <Chart data={data} options={options} {...props} />
         </Container>
      );
   }
}
