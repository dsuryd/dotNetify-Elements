import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Panel, Tab, TabItem, Theme, VMContext } from 'elements';
import RenderExample from '../../components/RenderExample';
import RenderCustomize from '../../components/RenderCustomize';

const FormDropdownList = props => (
   <VMContext vm="FormDropdownList">
      <Theme>
         <Frame width="95%">
            <h3>DropdownList</h3>
            <Tab>
               <TabItem label="Overview">
                  <Markdown id="Overview">
                     <DropdownListExample />
                  </Markdown>
               </TabItem>
               <TabItem label="API">
                  <Markdown id="API" />
               </TabItem>
               <TabItem label="Customize">
                  <DropdownListCustomize />
               </TabItem>
            </Tab>
         </Frame>
      </Theme>
   </VMContext>
);

class DropdownListExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, DropdownList } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="DropdownListExample">
      <DropdownList id="DropdownList_Example" ${props}/>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="DropdownListExample" propTypes={DropdownList.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 8rem">
               <DropdownList id="DropdownList_Example" {...this.state} />
            </Panel>
         </RenderExample>
      );
   }
}

class DropdownListCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText } = this.state;
      const componentTypes = DropdownList.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent'
      });
      return (
         <RenderCustomize vm="DropdownListCustomize" name="DropdownList" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <DropdownList id="MyDropdownList" label="Label:" plainText={plainText} />
         </RenderCustomize>
      );
   }
}

export default FormDropdownList;
