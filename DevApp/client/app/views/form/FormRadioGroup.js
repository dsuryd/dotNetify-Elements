import React from "react";
import { Markdown, Panel, TabItem, RadioGroup, VMContext, withTheme } from "dotnetify-elements";
import { FrameworkContext, TabsArticle, RenderCustomize, RenderExample } from "../../components";

const FormRadioGroup = props => (
  <TabsArticle vm="FormRadioGroup" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <RadioGroupExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <RadioGroupCustomize />
    </TabItem>
  </TabsArticle>
);

class RadioGroupExample extends React.Component {
  static contextType = FrameworkContext;
  state = {};
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, RadioGroup } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="RadioGroupExample">
      <RadioGroup id="Weather"${props} />
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="RadioGroupExample">
   <d-radio-group id="Weather"${props} />
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = { enable: null, horizontal: null, plainText: null };

    const webComponent = this.context !== "React";
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample vm="RadioGroupExample" propTypes={propTypes} buildCode={selectBuildCode} onChange={setState}>
        <Panel style={{ minHeight: "10rem" }}>
          {!webComponent ? (
            <RadioGroup id="Weather" {...this.state} />
          ) : (
            <d-vm-context vm="RadioGroupExample">
              <d-radio-group id="Weather" {...this.state} />
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class RadioGroupCustomize extends React.Component {
  state = { plainText: false, validationMessages: null };

  render() {
    const { plainText } = this.state;
    const componentTypes = RadioGroup.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({
      plainText: value === "PlainTextComponent"
    });
    return (
      <RenderCustomize
        vm="RadioGroupCustomize"
        name="RadioGroup"
        componentTypes={componentTypes}
        select={select}
        onSelected={handleSelected}
      >
        <RadioGroup id="MyRadioGroup" label="Label:" plainText={plainText} />
      </RenderCustomize>
    );
  }
}

export default withTheme(FormRadioGroup);
