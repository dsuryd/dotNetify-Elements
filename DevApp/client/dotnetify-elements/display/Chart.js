import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';

const ChartContainer = styled.div``;

class Chart extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string
   };

   static componentTypes = {
      ChartContainer,
      ChartComponent: undefined
   };

   render() {
      const [ ChartContainer, _Chart ] = this.resolveComponents(Chart);
      const { fullId, style, css, ...props } = this.attrs;
      const data = [ this.value ] || [ 1, 2, 3 ];
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
      };
      console.log(this.value);
      return (
         <ChartContainer id={fullId} style={style} css={css}>
            <_Chart data={config} {...props} />
         </ChartContainer>
      );
   }
}

export const LineChart = props => <Chart chartComponent={LineChart.componentTypes.ChartComponent} {...props} />;

LineChart.propTypes = { ...Chart.propTypes };
LineChart.componentTypes = { ...Chart.componentTypes };
