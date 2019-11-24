import React from 'react';
import { BarChart, LineChart, PieChart } from 'dotnetify-elements';
import { Button, Checkbox, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayChart = props => (
   <TabsArticle vm="DisplayChart" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <LineChartExample />
            <BarChartExample />
            <PieChartExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <ChartCustomize />
      </TabItem>
   </TabsArticle>
);

const realtimeConfig = {
   options: {
      scales: {
         xAxes: [ { type: 'realtime', realtime: { delay: 2000 } } ],
         yAxes: [ { ticks: { suggestedMin: -1.5, suggestedMax: 1.5 } } ]
      }
   }
};

class LineChartExample extends React.Component {
   state = { streaming: true };
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { LineChart, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="LineChartExample">
      <LineChart id="Waveform" ${this.state.streaming ? 'streaming="true"' : ''} tooltip={true}/>
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="LineChartExample">
   <d-line-chart id="Waveform" ${this.state.streaming ? 'streaming="true"' : ''} tooltip="true" />
</d-vm-context>
\`\`\``;
      let propTypes = {};
      const setState = state => this.setState(state);
      const extraToggles = (
         <Checkbox
            id="_streaming"
            label={<span style={{ fontWeight: '500' }}>Streaming</span>}
            switch={true}
            value={this.state.streaming}
            onChange={value => setState({ streaming: value })}
         />
      );

      const { webComponent } = this.state;
      const setWebComponent = show => this.setState({ webComponent: show });
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="LineChartExample"
            panelCss="padding-left: 3px"
            propTypes={propTypes}
            extraToggles={extraToggles}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel css="margin-bottom: 2rem">
               {!webComponent ? (
                  <LineChart id="Waveform" key={this.state.streaming} streaming={this.state.streaming} tooltip={true} />
               ) : (
                  <d-vm-context vm="LineChartExample">
                     <d-line-chart id="Waveform" streaming={this.state.streaming} tooltip={true} />
                  </d-vm-context>
               )}
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
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="BarChartExample">
   <d-bar-chart id="MonthlySales" />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="BarChartExample"
            panelCss="padding-left: 3px"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            {!webComponent ? (
               <Panel css="margin-bottom: 2rem">
                  <BarChart id="MonthlySales" />
               </Panel>
            ) : (
               <d-vm-context vm="BarChartExample">
                  <d-bar-chart id="MonthlySales" />
               </d-vm-context>
            )}
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
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="PieChartExample">
   <d-pie-chart id="Utilization" />
   <d-button id="Refresh">Refresh</d-button>
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="PieChartExample"
            panelCss="padding-left: 3px"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel css="margin-bottom: 2rem">
               {!webComponent ? (
                  <React.Fragment>
                     <PieChart id="Utilization" />
                     <Button id="Refresh" label="Refresh" />
                  </React.Fragment>
               ) : (
                  <d-vm-context vm="PieChartExample">
                     <d-pie-chart id="Utilization" />
                     <d-button id="Refresh">Refresh</d-button>
                  </d-vm-context>
               )}
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
