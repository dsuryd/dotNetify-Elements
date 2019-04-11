import React from 'react';
import { Button, Element, Label, Markdown, Panel, RadioToggle, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormButton = props => (
   <TabsArticle vm="FormButton" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <ButtonExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <ButtonCustomize />
      </TabItem>
   </TabsArticle>
);

class ButtonExample extends React.Component {
   state = { color: 'primary' };

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Button, Element, VMContext } from 'dotnetify-elements';

const RemoveLabel = <Label icon="material-icons highlight_off">Remove</Label>;
const handleClick = () => new Date();

const MyApp = _ => (
   <VMContext vm="ButtonExample">
      <Panel horizontal middle>
         <Button id="Add"${props} ${this.state.color} />
         <Element id="AddCounter" />
         <Button id="Remove" label={RemoveLabel} onClick={handleClick}${props} ${this.state.color} />
         <Element id="RemoveTimeStamp" />
      </Panel>
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="ButtonExample">
   <d-button id="Add"${props} ${this.state.color}="true" css="margin-right: 1.5rem" />
   <d-element id="AddCounter" css="margin-right: 1.5rem" />
   <d-button id="Remove"
      icon="material-icons highlight_off"
      label="Remove"
      onclick="new Date()"
     ${props} ${this.state.color}="true"
   />
   <d-element id="RemoveTimeStamp" css="margin-left: 1.5rem" />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const setColor = color => this.setState({ color: color, [this.state.color]: false, [color]: true });
      const handleClick = () => new Date();
      const colorOptions = [
         { Key: 'primary', Value: 'Primary' },
         { Key: 'secondary', Value: 'Secondary' },
         { Key: 'positive', Value: 'Positive' },
         { Key: 'negative', Value: 'Negative' }
      ];
      const extraToggles = (
         <RadioToggle
            css="padding-bottom: 1rem"
            id="_colors"
            label="(color:)"
            options={colorOptions}
            value={this.state.color}
            onChange={setColor}
         />
      );

      const removeLabel = <Label icon="material-icons highlight_off">Remove</Label>;
      const propTypes = { enable: null, show: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="ButtonExample"
            extraToggles={extraToggles}
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            {!webComponent ? (
               <Panel horizontal middle style={{ paddingBottom: '2rem' }}>
                  <Button id="Add" {...this.state} />
                  <Element id="AddCounter" />
                  <Button id="Remove" label={removeLabel} onClick={handleClick} {...this.state} />
                  <Element id="RemoveTimeStamp" />
               </Panel>
            ) : (
               <Panel horizontal middle style={{ paddingBottom: '2rem' }}>
                  <d-vm-context vm="ButtonExample">
                     <d-button id="Add" {...this.state} css="margin-right: 1.5rem" />
                     <d-element id="AddCounter" css="margin-right: 1.5rem" />
                     <d-button id="Remove" icon="material-icons highlight_off" label="Remove" onclick="new Date()" {...this.state} />
                     <d-element id="RemoveTimeStamp" css="margin-left: 1.5rem" />
                  </d-vm-context>
               </Panel>
            )}
         </RenderExample>
      );
   }
}

class ButtonCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Button.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize vm="ButtonCustomize" name="Button" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Button id="MyButton" icon="material-icons highlight_off" label="Label" />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormButton);
