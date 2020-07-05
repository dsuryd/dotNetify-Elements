import React from "react";
import { Markdown, MultiselectList, Panel, TabItem, withTheme } from "dotnetify-elements";
import { FrameworkContext, TabsArticle, RenderCustomize, RenderExample } from "../../components";

const FormMultiselectList = props => (
  <TabsArticle vm="FormMultiselectList" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <MultiselectListExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <MultiselectListCustomize />
    </TabItem>
  </TabsArticle>
);

class MultiselectListExample extends React.Component {
  static contextType = FrameworkContext;
  state = {};
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, MultiselectList } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="MultiselectListExample">
      <MultiselectList id="VisitPurpose"${props} />
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="MultiselectListExample">
   <d-multiselect-list id="VisitPurpose"${props} />
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = { enable: null, horizontal: null, plainText: null };

    const webComponent = this.context !== "React";
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample vm="MultiselectListExample" propTypes={propTypes} buildCode={selectBuildCode} onChange={setState}>
        <Panel style={{ minHeight: "7rem" }}>
          {!webComponent ? (
            <MultiselectList id="VisitPurpose" {...this.state} />
          ) : (
            <d-vm-context vm="MultiselectListExample">
              <d-multiselect-list id="VisitPurpose" {...this.state} />
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class MultiselectListCustomize extends React.Component {
  state = { plainText: false, validationMessages: null };

  render() {
    const { plainText, validationMessages } = this.state;
    const componentTypes = MultiselectList.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({
      plainText: value === "PlainTextComponent",
      validationMessages: value === "ValidationMessageComponent" ? ["Validation message"] : null
    });
    return (
      <RenderCustomize
        vm="MultiselectListCustomize"
        name="MultiselectList"
        componentTypes={componentTypes}
        select={select}
        onSelected={handleSelected}
      >
        <MultiselectList id="MyMultiselectList" plainText={plainText} validationMessages={validationMessages} />
      </RenderCustomize>
    );
  }
}

export default withTheme(FormMultiselectList);
