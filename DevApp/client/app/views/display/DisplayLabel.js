import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label, Markdown, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayLabel = props => (
   <TabsArticle vm="DisplayLabel" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <LabelCustomize />
      </TabItem>
   </TabsArticle>
);

class LabelCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Label.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Label" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Label>Label Content</Label>
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayLabel);
