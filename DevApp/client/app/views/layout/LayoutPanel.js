import React from 'react';
import styled from 'styled-components';
import { Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const LayoutPanel = props => (
   <TabsArticle vm="LayoutPanel" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <PanelExample />
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

const MyApp = _ => (
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample propTypes={Panel.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel />
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
