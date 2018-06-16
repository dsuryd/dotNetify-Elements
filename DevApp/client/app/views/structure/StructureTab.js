import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Frame, Image, Markdown, Panel, Tab, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureTab = props => (
   <TabsArticle vm="StructureTab" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <TabExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <TabCustomize />
      </TabItem>
   </TabsArticle>
);

class TabExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Frame, Panel, Tab, TabItem, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="TabExample">
      <Panel css="padding: 2rem; background: white">
         <Tab active="2">
            <TabItem label="Home">
               <Markdown id="Home" />
            </TabItem>
            <TabItem label="Menu">
               <Markdown id="Menu">
                  <Image id="MenuPicture" />
               </Markdown>
            </TabItem>
            <TabItem label="About">
               <Markdown id="About" />
            </TabItem>
         </Tab>
      </Panel>
   </VMContext>   
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="TabExample" propTypes={Tab.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="padding: 2rem; margin-bottom: 2rem; background: white">
               <Tab active="2">
                  <TabItem label="Home">
                     <Markdown id="Home" />
                  </TabItem>
                  <TabItem label="Menu">
                     <Markdown id="Menu">
                        <Image id="MenuPicture" />
                     </Markdown>
                  </TabItem>
                  <TabItem label="About">
                     <Markdown id="About" />
                  </TabItem>
               </Tab>
            </Panel>
         </RenderExample>
      );
   }
}

class TabCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Tab.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Tab" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Tab>
               <TabItem label="Tab 1 Label">Tab 1 Body</TabItem>
               <TabItem label="Tab 2 Label">Tab 2 Body</TabItem>
            </Tab>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureTab);
