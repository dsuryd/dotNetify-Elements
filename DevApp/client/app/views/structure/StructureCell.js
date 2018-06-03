import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell, CellPanel, Markdown, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureCell = props => (
   <TabsArticle vm="StructureCell" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CellCustomize />
      </TabItem>
   </TabsArticle>
);

class CellCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Cell.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Cell" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Cell />
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureCell);
