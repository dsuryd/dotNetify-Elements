import React from 'react';
import styled from 'styled-components';
import { Alert, Button, Form, Frame, Markdown, MarkdownText, Panel, Tab, TabItem, TextField, VMContext, withTheme } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const _Form = props => (
   <VMContext vm="Form">
      <Frame width="95%">
         <h3>Form</h3>
         <Tab>
            <TabItem label="Overview">
               <Markdown id="Overview">
                  <FormExample />
               </Markdown>
            </TabItem>
            <TabItem label="API">
               <Markdown id="API" />
            </TabItem>
         </Tab>
      </Frame>
   </VMContext>
);

class FormExample extends React.Component {
   state = {emittedEvent: ''}

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Form, Panel, Button, TextField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="BasicForm">
      <Form>
         <Alert id="ServerResponse" />
         <Panel>
            <TextField id="Name" horizontal />
            <TextField id="Email" horizontal />
            <Panel horizontal right>
               <Button label="Cancel" cancel secondary />
               <Button id="Register" submit />
            </Panel>               
         </Panel>
      </Form>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      const clearEmittedEvent = _ => this.setState({emittedEvent: ''});
      const handleChanged = arg => this.setState({emittedEvent: `onChanged: ${JSON.stringify(arg)}`});
      const handleSubmit = arg => this.setState({emittedEvent: `onSubmit: ${JSON.stringify(arg)}`});
      const handleSubmitError = arg => this.setState({emittedEvent: `onSubmitError: ${JSON.stringify(arg)}`});
      return (
         <RenderExample vm="BasicForm" propTypes={Form.propTypes} buildCode={buildCode} onChange={setState}>
            <Form {...this.state} onChanged={handleChanged} onSubmit={handleSubmit} onSubmitError={handleSubmitError}>
               <Alert id="ServerResponse" />
               <Panel>
                  <TextField id="Name" horizontal />
                  <TextField id="Email" horizontal />
                  <Panel horizontal right>
                     <Button label="Cancel" cancel secondary onClick={clearEmittedEvent} />
                     <Button id="Register" submit />
                  </Panel>      
                  <MarkdownText text={"```" + this.state.emittedEvent + "```"} />
               </Panel>
            </Form>
         </RenderExample>
      );
   }
}

export default withTheme(_Form);
