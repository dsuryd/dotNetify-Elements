import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Element, NavMenu, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const NavigationNavMenu = props => (
   <TabsArticle vm="NavigationNavMenu" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <NavMenuExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <NavMenuCustomize />
      </TabItem>
   </TabsArticle>
);

class NavMenuExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Card, NavMenu, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="NavMenuExample">
      <Card>
         <NavMenu id="NavMenu" selected="examples/customer-info" ${props}/>
      </Card>   
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { ...NavMenu.propTypes };
      return (
         <RenderExample vm="NavMenuExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <Card>
                  <NavMenu id="NavMenu" selected="examples/customer-info" {...this.state} />
               </Card>
            </Panel>
         </RenderExample>
      );
   }
}

class NavMenuCustomize extends React.Component {
   state = {};
   render() {
      const componentTypes = NavMenu.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="NavMenu" vm="NavMenuCustomize" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <NavMenu id="MyNavMenu" />
         </RenderCustomize>
      );
   }
}

export default withTheme(NavigationNavMenu);
