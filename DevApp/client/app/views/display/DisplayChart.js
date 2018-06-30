import React from 'react';
import { LineChart, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
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
               <LineChart id="LineData" {...this.state} />
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
