import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Markdown, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureCard = props => (
   <TabsArticle vm="StructureCard" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CardCustomize />
      </TabItem>
   </TabsArticle>
);

class CardCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Card.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Card" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Card />
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureCard);
