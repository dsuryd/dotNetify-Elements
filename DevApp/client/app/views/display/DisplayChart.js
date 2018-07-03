import React from 'react';
import { BarChart, LineChart, PieChart } from 'dotnetify-elements';
import { Markdown, Panel, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayChart = props => (
   <TabsArticle vm="DisplayChart" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <LineChartExample />
            <BarChartExample />
            <PieChartExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <ChartCustomize />
      </TabItem>
   </TabsArticle>
);

const lineConfig = {
   data: {
      datasets: [
         {
            backgroundColor: 'rgba(217,237,245,0.2)',
            borderColor: '#9acfea',
            borderWidth: 2
         }
      ]
   }
};

const barConfig = {
   data: {
      datasets: [
         {
            backgroundColor: [
               'rgba(255, 99, 132, 0.8)',
               'rgba(54, 162, 235, 0.8)',
               'rgba(255, 206, 86, 0.8)',
               'rgba(75, 192, 192, 0.8)',
               'rgba(153, 102, 255, 0.8)',
               'rgba(255, 159, 64, 0.8)',
               'rgba(255, 99, 132, 0.8)',
               'rgba(54, 162, 235, 0.8)',
               'rgba(255, 206, 86, 0.8)',
               'rgba(75, 192, 192, 0.8)',
               'rgba(153, 102, 255, 0.8)',
               'rgba(255, 159, 64, 0.8)'
            ]
         }
      ]
   }
};

const pieConfig = {
   data: {
      datasets: [ { backgroundColor: [ 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)' ] } ]
   },
   options: {
      legend: { display: true, position: 'right' }
   }
};

class LineChartExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { LineChart, VMContext } from 'dotnetify-elements';

const lineConfig = {
   data: { 
      datasets: [ { 
         backgroundColor: 'rgba(217,237,245,0.2)', 
         borderColor: '#9acfea', 
         borderWidth: 2 
      } ] 
   }
};
const MyApp = _ => (
   <VMContext vm="ChartExample">
      <LineChart id="Waveform" config={lineConfig} />
   </VMContext>
);
\`\`\``;
      return (
         <VMContext vm="LineChartExample">
            <Panel css="margin-bottom: 2rem">
               <LineChart id="Waveform" config={lineConfig} />
            </Panel>
            <Markdown>{buildCode()}</Markdown>
         </VMContext>
      );
   }
}

class BarChartExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { BarChart, VMContext } from 'dotnetify-elements';

const barConfig = { 
   data: { 
      datasets: [ { backgroundColor: [ /* colors */ ] } ] 
   } 
};
const MyApp = _ => (
   <VMContext vm="ChartExample">
      <BarChart id="MonthlySales" config={barConfig} />
   </VMContext>
);
\`\`\``;
      return (
         <VMContext vm="BarChartExample">
            <Panel css="margin-bottom: 2rem">
               <BarChart id="MonthlySales" config={barConfig} />
            </Panel>
            <Markdown>{buildCode()}</Markdown>
         </VMContext>
      );
   }
}

class PieChartExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { PieChart, VMContext } from 'dotnetify-elements';

const pieConfig = {
   data: { datasets: [ { backgroundColor: [ /* colors */ ] } ] },
   options: { legend: { display: true, position: 'right' } }
};
const MyApp = _ => (
   <VMContext vm="ChartExample">
      <PieChart id="Utilization" config={pieConfig} />
   </VMContext>
);
\`\`\``;
      return (
         <VMContext vm="PieChartExample">
            <Panel css="margin-bottom: 2rem">
               <PieChart id="Utilization" config={pieConfig} />
            </Panel>
            <Markdown>{buildCode()}</Markdown>
         </VMContext>
      );
   }
}

class ChartCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = LineChart.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize vm="ChartCustomize" name="Chart" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <LineChart id="Chart" />
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayChart);
