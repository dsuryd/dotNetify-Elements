import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';
import { Rectangle, Square } from './demo-helper';

const LayoutPanel = props => (
   <TabsArticle vm="LayoutPanel" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <PanelExample />
            <FlexLayoutExample />
            <ChildPropsExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
   </TabsArticle>
);

class PanelExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Panel } from 'dotnetify-elements';
import { Square, Rectangle } from './demo-helper';

const MyApp = _ => (
   <Panel css="border: 2px dashed gray">
      <Panel css="border: 2px dashed tomato" ${props}>
         <Square />      
         <Rectangle />
      </Panel>
   </Panel>   
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { ...Panel.propTypes, wrap: null };
      return (
         <RenderExample
            propTypes={propTypes}
            defaultProps={Panel.defaultProps}
            buildCode={buildCode}
            onChange={setState}
         >
            <Panel height="16rem">
               <Panel css="border: 2px dashed #ccc">
                  <Panel css="border: 2px dashed tomato" {...this.state}>
                     <Square />
                     <Rectangle />
                  </Panel>
               </Panel>
            </Panel>
         </RenderExample>
      );
   }
}

const FlexLayoutExample = props => (
   <Panel>
      <Panel horizontal noGap css="border: 2px dashed #ccc">
         <Panel flex css="border: 2px dashed red">
            <Square />
         </Panel>
         <Panel flex css="border: 2px dashed red">
            <Rectangle />
         </Panel>
      </Panel>
   </Panel>
);

class ChildPropsExample extends React.Component {
   state = {};

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Panel } from 'dotnetify-elements';
import { Square, Rectangle } from './demo-helper';

const MyApp = _ => (
   <Panel horizontal noGap childProps={{ ${Object.keys(this.state)
      .map(key => `${key}: ${this.state[key]}`)
      .join(', ')}}}>
      <Panel>
         <Square />
      </Panel>
      <Panel>
         <Rectangle />
      </Panel>
   </Panel>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { flex: PropTypes.bool, right: PropTypes.bool };
      return (
         <RenderExample propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 8rem">
               <Panel flex="0" horizontal noGap childProps={{ ...this.state, css: 'border: 2px dashed tomato' }}>
                  <Panel>
                     <Square />
                  </Panel>
                  <Panel>
                     <Rectangle />
                  </Panel>
               </Panel>
            </Panel>
         </RenderExample>
      );
   }
}

class PanelCustomize extends React.Component {
   render() {
      const componentTypes = Panel.componentTypes;
      return (
         <RenderCustomize name="Panel" componentTypes={componentTypes}>
            <Panel />
         </RenderCustomize>
      );
   }
}

export default withTheme(LayoutPanel);
