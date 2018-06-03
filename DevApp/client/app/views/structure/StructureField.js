import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, Markdown, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureField = props => (
   <TabsArticle vm="StructureField" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <FieldCustomize />
      </TabItem>
   </TabsArticle>
);

class FieldCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Field.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Field" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Field />
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureField);
