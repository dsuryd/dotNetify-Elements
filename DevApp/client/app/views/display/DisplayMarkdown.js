import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Markdown, Panel, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';
import { Rectangle, Square } from '../layout/demo-helper';

const DisplayMarkdown = props => (
   <TabsArticle vm="DisplayMarkdown" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <MarkdownExample />
            <InsetExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <MarkdownCustomize />
      </TabItem>
   </TabsArticle>
);

class MarkdownExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Markdown, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="MarkdownExample">
      <Markdown id="Content" css="padding: 1rem; background: white"${props} />
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { ...Image.propTypes };
      return (
         <RenderExample vm="MarkdownExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <Markdown id="Content" css="padding: 1rem; background: white" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

const InsetExample = props => (
   <VMContext vm="InsetExample">
      <Markdown id="Content">
         <Square />
      </Markdown>
   </VMContext>
);

class MarkdownCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Markdown.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Markdown" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Markdown>{'##### Markdown Header\r\nContent'}</Markdown>
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayMarkdown);
