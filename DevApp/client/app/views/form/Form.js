import React from 'react';
import { Alert, Button, Form, Markdown, Panel, TabItem, TextField, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderExample } from '../../components';

const _Form = props => (
   <TabsArticle vm="Form" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <FormExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
   </TabsArticle>
);

class FormExample extends React.Component {
   state = { emittedEvent: '' };

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Form, Panel, Button, TextField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="BasicForm">
      <Form${props}>
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
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="BasicForm">
   <d-form${props}>
      <d-alert id="ServerResponse" />
      <d-panel>
         <d-text-field id="Name" horizontal="true" />
         <d-text-field id="Email" horizontal="true" />
         <d-panel horizontal="true" right="true">
            <d-button label="Cancel" cancel="true" secondary="true" />
            <d-button id="Register" submit="true" />
         </d-panel>   
      </d-panel>
   </d-form>
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const clearEmittedEvent = _ => this.setState({ emittedEvent: '' });
      const handleChanged = arg => this.setState({ emittedEvent: `onChanged: ${JSON.stringify(arg)}` });
      const handleSubmit = arg => this.setState({ emittedEvent: `onSubmit: ${JSON.stringify(arg)}` });
      const handleSubmitError = arg => this.setState({ emittedEvent: `onSubmitError: ${JSON.stringify(arg)}` });
      const propTypes = { plainText: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="BasicForm"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            {!webComponent ? (
               <Form {...this.state} onChanged={handleChanged} onSubmit={handleSubmit} onSubmitError={handleSubmitError}>
                  <Alert id="ServerResponse" />
                  <Panel>
                     <TextField id="Name" horizontal />
                     <TextField id="Email" horizontal />
                     <Panel horizontal right>
                        <Button label="Cancel" cancel secondary onClick={clearEmittedEvent} />
                        <Button id="Register" submit />
                     </Panel>
                     {this.state.emittedEvent && <Markdown>{'```' + this.state.emittedEvent + '```'}</Markdown>}
                  </Panel>
               </Form>
            ) : (
               <d-vm-context vm="BasicForm">
                  <d-form
                     {...this.state}
                     onchanged="args => document.getElementById('_log').setAttribute('text','```onChanged: ' + args + '```')"
                     onsubmit="args => document.getElementById('_log').setAttribute('text','```onSubmit: ' + JSON.stringify(args) + '```')"
                     onsubmiterror="args => document.getElementById('_log').setAttribute('text','```onSubmitError: ' + JSON.stringify(args) + '```')"
                  >
                     <d-alert id="ServerResponse" />
                     <d-panel>
                        <d-text-field id="Name" horizontal="true" />
                        <d-text-field id="Email" horizontal="true" />
                        <d-panel horizontal="true" right="true">
                           <d-button label="Cancel" cancel="true" secondary="true" />
                           <d-button id="Register" submit="true" />
                        </d-panel>
                        <d-markdown id="_log" />
                     </d-panel>
                  </d-form>
               </d-vm-context>
            )}
         </RenderExample>
      );
   }
}

export default withTheme(_Form);
