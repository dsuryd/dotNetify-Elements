import React from 'react';
import { BarChart, LineChart, PieChart } from 'dotnetify-elements';
import { Button, Markdown, Panel, TabItem, VMContext, withTheme } from 'dotnetify-elements';
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

class LineChartExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { LineChart, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="ChartExample">
      <LineChart id="Waveform" />
   </VMContext>
);
\`\`\``;
      return (
         <VMContext vm="LineChartExample">
            <Panel css="margin-bottom: 2rem">
               <LineChart id="Waveform" />
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

const MyApp = _ => (
   <VMContext vm="ChartExample">
      <BarChart id="MonthlySales" />
   </VMContext>
);
\`\`\``;
      return (
         <VMContext vm="BarChartExample">
            <Panel css="margin-bottom: 2rem">
               <BarChart id="MonthlySales" />
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

const MyApp = _ => (
   <VMContext vm="ChartExample">
      <PieChart id="Utilization" />
      <Button id="Refresh" label="Refresh" />
   </VMContext>
);
\`\`\``;
      return (
         <VMContext vm="PieChartExample">
            <Panel css="margin-bottom: 2rem">
               <PieChart id="Utilization" />
               <Button id="Refresh" label="Refresh" />
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
            <LineChart id="Chart" height="5rem" />
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayChart);
