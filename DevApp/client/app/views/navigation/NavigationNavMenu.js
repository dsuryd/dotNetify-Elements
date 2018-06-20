import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Element, NavMenu, Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
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
import { Element, NavMenu, Panel, VMContext } from 'dotnetify-elements';
import { Badge, BigIcon } from './demo-helper';

const MyApp = _ => (
   <VMContext vm="NavMenuExample">
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { ...NavMenu.propTypes };
      return (
         <RenderExample vm="NavMenuExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem" />
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
         <RenderCustomize name="NavMenu" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <div />
         </RenderCustomize>
      );
   }
}

export default withTheme(NavigationNavMenu);
