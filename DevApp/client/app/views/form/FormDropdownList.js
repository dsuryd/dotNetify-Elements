import React from 'react';
import { DropdownList, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const FormDropdownList = props => (
   <TabsArticle vm="FormDropdownList" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <DropdownListExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <DropdownListCustomize />
      </TabItem>
   </TabsArticle>
);

class DropdownListExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, DropdownList } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="DropdownListExample">
      <DropdownList id="FilingStatus"${props} />
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="DropdownListExample">
   <d-dropdown-list id="FilingStatus"${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { enable: null, horizontal: null, plainText: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="DropdownListExample"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel style={{ minHeight: '7rem' }}>
               {!webComponent ? (
                  <DropdownList id="FilingStatus" {...this.state} />
               ) : (
                  <d-vm-context vm="DropdownListExample">
                     <d-dropdown-list id="FilingStatus" {...this.state} />
                  </d-vm-context>
               )}
            </Panel>
         </RenderExample>
      );
   }
}

class DropdownListCustomize extends React.Component {
   state = { plainText: false, validationMessages: null };

   render() {
      const { plainText, validationMessages } = this.state;
      const componentTypes = DropdownList.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
      });
      return (
         <RenderCustomize
            vm="DropdownListCustomize"
            name="DropdownList"
            componentTypes={componentTypes}
            select={select}
            onSelected={handleSelected}
         >
            <DropdownList
               id="MyDropdownList"
               prefix="Prefix-"
               suffix="-Suffix"
               plainText={plainText}
               validationMessages={validationMessages}
            />
         </RenderCustomize>
      );
   }
}

export default withTheme(FormDropdownList);
