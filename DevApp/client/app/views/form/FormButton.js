import React from 'react';
import styled from 'styled-components';
import { Button, Frame, Markdown, Panel, Tab, TabItem, VMContext, withTheme } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormButton = props => (
   <VMContext vm="FormButton">
      <Frame width="95%">
         <h3>Button</h3>
         <Tab>
            <TabItem label="Overview">
               <Markdown id="Overview">
                  <ButtonExample />
               </Markdown>
            </TabItem>
            <TabItem label="API">
               <Markdown id="API" />
            </TabItem>
            <TabItem label="Customize">
               <ButtonCustomize />
            </TabItem>
         </Tab>
      </Frame>
   </VMContext>
);

class ButtonExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, Button } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="ButtonExample">
      <Button id="Button_Example" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="ButtonExample" propTypes={Button.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel style={{ minHeight: '8rem' }}>
               <Button id="Button_Example" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class ButtonCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText } = this.state;
      const componentTypes = Button.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent'
      });
      return (
         <RenderCustomize vm="ButtonCustomize" name="Button" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Button id="MyButton" label="Label:" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormButton);
