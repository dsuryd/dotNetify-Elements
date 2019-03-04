import React from 'react';
import { Markdown, Panel, Tab, TabItem, TextField, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormTextField = props => (
   <TabsArticle vm="FormTextField" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <TextFieldExample />
         </Markdown>
      </TabItem>
      <TabItem label="Input Mask" key="Mask">
         <Markdown id="Mask" />
      </TabItem>
      <TabItem label="API" key="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <TextFieldCustomize />
      </TabItem>
   </TabsArticle>
);

class TextFieldExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, TextField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="TextFieldExample">
      <Panel>
         <TextField id="Name"${props} />
         <TextField id="Phone"${props} />
         <TextField id="Amount"${props} />
      </Panel>
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="TextFieldExample">
   <d-text-field id="Name"${props} />
   <d-text-field id="Phone"${props} />
   <d-text-field id="Amount"${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { enable: null, horizontal: null, plainText: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;

      return (
         <RenderExample
            vm="TextFieldExample"
            propTypes={propTypes}
            buildCode={webComponent ? buildWebComponentCode : buildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            {!webComponent ? (
               <Panel style={{ minHeight: '17rem' }}>
                  <TextField id="Name" {...this.state} />
                  <TextField id="Phone" {...this.state} />
                  <TextField id="Amount" {...this.state} />
               </Panel>
            ) : (
               <d-vm-context vm="TextFieldExample">
                  <Panel style={{ minHeight: '17rem' }}>
                     <d-text-field id="Name" {...this.state} />
                     <d-text-field id="Phone" {...this.state} />
                     <d-text-field id="Amount" {...this.state} />
                  </Panel>
               </d-vm-context>
            )}
         </RenderExample>
      );
   }
}

class TextFieldCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText, validationMessages } = this.state;
      const componentTypes = TextField.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
      });
      return (
         <RenderCustomize
            vm="TextFieldCustomize"
            name="TextField"
            componentTypes={componentTypes}
            select={select}
            onSelected={handleSelected}
         >
            <TextField id="MyTextField" prefix="Prefix-" suffix="-Suffix" plainText={plainText} validationMessages={validationMessages} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormTextField);
