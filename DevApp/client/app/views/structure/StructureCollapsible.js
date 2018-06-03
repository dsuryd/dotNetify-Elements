import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Collapsible, CollapsiblePanel, Markdown, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureCollapsible = props => (
   <TabsArticle vm="StructureCollapsible" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CollapsibleCustomize />
      </TabItem>
   </TabsArticle>
);

class CollapsibleCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Collapsible.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Collapsible" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Collapsible />
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureCollapsible);
