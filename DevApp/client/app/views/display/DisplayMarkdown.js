import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Markdown, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayMarkdown = props => (
   <TabsArticle vm="DisplayMarkdown" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <MarkdownCustomize />
      </TabItem>
   </TabsArticle>
);

class MarkdownCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Markdown.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Markdown" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Markdown>Markdown Content</Markdown>
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayMarkdown);
