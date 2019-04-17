import React from 'react';
import { Markdown, Panel, TabItem, RichTextEditor, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormRichTextEditor = props => (
   <TabsArticle vm="FormRichTextEditor" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <RichTextEditorExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <RichTextEditorCustomize />
      </TabItem>
   </TabsArticle>
);

class RichTextEditorExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, RichTextEditor } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="RichTextEditorExample">
      <RichTextEditor id="Notes"${props} />
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="RichTextEditorExample">
   <d-rich-text-editor id="Notes"${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { enable: null, horizontal: null, plainText: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="RichTextEditorExample"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel style={{ minHeight: '11rem' }}>
               {!webComponent ? (
                  <RichTextEditor id="Notes" {...this.state} />
               ) : (
                  <d-vm-context vm="RichTextEditorExample">
                     <d-rich-text-editor id="Comment" {...this.state} />
                  </d-vm-context>
               )}
            </Panel>
         </RenderExample>
      );
   }
}

class RichTextEditorCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText } = this.state;
      const componentTypes = RichTextEditor.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent'
      });
      return (
         <RenderCustomize
            vm="RichTextEditorCustomize"
            name="RichTextEditor"
            componentTypes={componentTypes}
            select={select}
            onSelected={handleSelected}
         >
            <RichTextEditor id="MyField" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormRichTextEditor);
