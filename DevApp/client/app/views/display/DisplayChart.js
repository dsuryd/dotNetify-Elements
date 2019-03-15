import React from 'react';
import { BarChart, LineChart, PieChart } from 'dotnetify-elements';
import { Button, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
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
   <VMContext vm="LineChartExample">
      <LineChart id="Waveform" />
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};
      return (
         <RenderExample vm="LineChartExample" panelCss="padding-left: 3px" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <LineChart id="Waveform" />
            </Panel>
         </RenderExample>
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
   <VMContext vm="BarChartExample">
      <BarChart id="MonthlySales" />
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};
      return (
         <RenderExample vm="BarChartExample" panelCss="padding-left: 3px" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <BarChart id="MonthlySales" />
            </Panel>
         </RenderExample>
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
   <VMContext vm="PieChartExample">
      <PieChart id="Utilization" />
      <Button id="Refresh" label="Refresh" />
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};
      return (
         <RenderExample vm="PieChartExample" panelCss="padding-left: 3px" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <PieChart id="Utilization" />
               <Button id="Refresh" label="Refresh" />
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
         <RenderCustomize vm="ChartCustomize" name="Chart" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <LineChart id="Chart" height="5rem" />
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayChart);
