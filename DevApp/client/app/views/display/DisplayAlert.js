import React from 'react';
import { Alert, Button, Markdown, Panel, RadioToggle, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayAlert = props => (
   <TabsArticle vm="DisplayAlert" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <AlertExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <AlertCustomize />
      </TabItem>
   </TabsArticle>
);

class AlertExample extends React.Component {
   state = { color: 'success' };

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Alert, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="ButtonExample">
      <Alert id="Feedback"${props} ${this.state.color}>
         <Panel right>
            <Button label="Continue" />
         </Panel>      
      </Alert>
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="AlertExample">
   <d-alert id="Feedback"${props} ${this.state.color}="true">
      <d-panel right="true">
         <d-button label="Continue" />
      </d-panel>
   </d-alert>
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const setColor = color => this.setState({ color: color, [this.state.color]: false, [color]: true });
      const colorOptions = [
         { Key: 'success', Value: 'Success' },
         { Key: 'info', Value: 'Info' },
         { Key: 'warning', Value: 'Warning' },
         { Key: 'danger', Value: 'Danger' }
      ];
      const extraToggles = (
         <RadioToggle id="_colors" label="(color:)" options={colorOptions} value={this.state.color} onChange={setColor} />
      );
      const setWebComponent = show => this.setState({ webComponent: show });
      const { color, webComponent } = this.state;

      const propTypes = {};
      return (
         <RenderExample
            vm="AlertExample"
            extraToggles={extraToggles}
            propTypes={propTypes}
            buildCode={webComponent ? buildWebComponentCode : buildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            {!webComponent ? (
               <Alert id="Feedback" css="margin-bottom: 3rem" {...this.state}>
                  <Panel right>
                     <Button label="Continue" />
                  </Panel>
               </Alert>
            ) : (
               <d-vm-context vm="AlertExample">
                  <d-alert
                     id="Feedback"
                     css="margin-bottom: 3rem"
                     success={color == 'success'}
                     info={color == 'info'}
                     warning={color == 'warning'}
                     danger={color == 'danger'}
                  >
                     <d-panel right="true">
                        <d-button label="Continue" />
                     </d-panel>
                  </d-alert>
               </d-vm-context>
            )}
         </RenderExample>
      );
   }
}

class AlertCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Alert.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Alert" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Alert>Content</Alert>
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayAlert);
