import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, TextField, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormTextField = props => (
   <VMContext vm="FormTextField">
      <Theme>
         <Frame width="95%">
            <h3>TextField</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <TextFieldExample />
                  </Markdown>
               </TabItem>
               <TabItem label="Input Mask">
                  <Markdown id="Mask" />
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <TextFieldCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
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
         <TextField id="Name" ${props}/>
         <TextField id="Phone" ${props}/>
         <TextField id="Amount" ${props}/>
      </Panel>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="TextFieldExample" propTypes={TextField.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '17rem' }}>
               <TextField id="Name" {...this.state} />
               <TextField id="Phone" {...this.state} />
               <TextField id="Amount" {...this.state} />
            </Panel>
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
         <RenderCustomize vm="TextFieldCustomize" name="TextField" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <TextField id="MyTextField" prefix="Prefix-" suffix="-Suffix" plainText={plainText} validationMessages={validationMessages} />
         </RenderCustomize>
      );
   }
}

export default FormTextField;
