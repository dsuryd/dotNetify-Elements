import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Frame, Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
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
      <Panel css="border: 2px dashed red" ${props}>
         <Square />      
         <Rectangle />
      </Panel>
   </Panel>   
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { ...Panel.propTypes, wrap: null };
      return (
         <RenderExample propTypes={propTypes} defaultProps={Panel.defaultProps} buildCode={buildCode} onChange={setState}>
            <Panel height="15rem">
               <Panel css="border: 2px dashed #ccc">
                  <Panel css="border: 2px dashed red" {...this.state}>
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
   <Panel css="border: 2px dashed #ccc">
      <Frame>
         <Panel horizontal>
            <Panel horizontal flex css="border: 2px dashed red">
               <Square />
               <Square />
               <Square />
            </Panel>
            <Panel flex css="border: 2px dashed green">
               <Rectangle />
               <Rectangle />
            </Panel>
         </Panel>
         <Panel horizontal>
            <Panel flex="0 1 20%" right css="border: 2px dashed blue">
               <Square />
            </Panel>
            <Panel flex middle css="border: 2px dashed orange">
               <Square />
               <Rectangle />
            </Panel>
            <Panel flex="0 1 30%" css="border: 2px dashed purple">
               <Square />
            </Panel>
         </Panel>
      </Frame>
   </Panel>
);

class ChildPropsExample extends React.Component {
   state = {};

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Panel, Button } from 'dotnetify-elements';

const MyApp = _ => (
   <Panel horizontal childProps={{ css: 'border: 2px dashed red', ${Object.keys(this.state).map(key => `${key}: ${this.state[key]}`).join(', ')}}}>
      <Panel>
         <Button label="Button 1" primary />
      </Panel>
      <Panel>
         <Button label="Button 2" secondary />
      </Panel>
   </Panel>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { flex: PropTypes.bool, right: PropTypes.bool };
      return (
         <RenderExample propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 5rem">
               <Panel flex="0" horizontal childProps={{ ...this.state, css: 'border: 2px dashed red' }}>
                  <Panel>
                     <Button label="Button 1" primary />
                  </Panel>
                  <Panel>
                     <Button label="Button 2" secondary />
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
