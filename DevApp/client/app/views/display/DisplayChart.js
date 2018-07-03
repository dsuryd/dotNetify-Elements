import React from 'react';
import { BarChart, LineChart, PieChart } from 'dotnetify-elements';
import { Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayChart = props => (
   <TabsArticle vm="DisplayChart" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <ChartExample />
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
      datasets: [
         {
            backgroundColor: [ 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)' ]
         }
      ]
   }
};

class ChartExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { LineChart, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="ChartExample">
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};
      return (
         <RenderExample vm="ChartExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <Panel horizontal>
                  <Panel flex="1 1 60%">
                     <LineChart id="Waveform" config={lineConfig} />
                  </Panel>
                  <Panel flex="1 1 40%">
                     <PieChart id="Utilization" config={pieConfig} height={200} />
                  </Panel>
               </Panel>
               <Panel>
                  <BarChart id="MonthlySales" height={50} config={barConfig} />
               </Panel>
            </Panel>
         </RenderExample>
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
         <RenderCustomize name="Chart" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <LineChart id="Chart" />
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayChart);
