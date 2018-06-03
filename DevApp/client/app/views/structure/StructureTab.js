import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Markdown, Tab, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureTab = props => (
   <TabsArticle vm="StructureTab" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <TabCustomize />
      </TabItem>
   </TabsArticle>
);

class TabCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Tab.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Tab" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Tab>
               <TabItem label="TabItem 1" />
               <TabItem label="TabItem 2" />
            </Tab>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureTab);
