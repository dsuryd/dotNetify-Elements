import React from 'react';
import { Markdown, Panel, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';
import { Square } from '../layout/demo-helper';

const DisplayMarkdown = props => (
   <TabsArticle vm="DisplayMarkdown" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <MarkdownExample />
            <InsetExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
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
      <Markdown id="Content" css="padding: 1rem; background: #fff"${props} />
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="MarkdownExample">
   <d-markdown id="Content" css="padding: 1rem; background: #fff"${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="MarkdownExample"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel css="margin-bottom: 2rem">
               {!webComponent ? (
                  <Markdown id="Content" css="padding: 1rem; color: #000; background: #fff" {...this.state} />
               ) : (
                  <d-vm-context vm="MarkdownExample">
                     <d-markdown id="Content" css="padding: 1rem; background: #fff" {...this.state} />
                  </d-vm-context>
               )}
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
