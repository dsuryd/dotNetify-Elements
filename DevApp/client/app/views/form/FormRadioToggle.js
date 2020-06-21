import React from "react";
import styled from "styled-components";
import { Frame, Markdown, Panel, Tab, TabItem, RadioToggle, VMContext, withTheme } from "dotnetify-elements";
import { TabsArticle, RenderCustomize, RenderExample } from "../../components";

const FormRadioToggle = props => (
  <TabsArticle vm="FormRadioToggle" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <RadioToggleExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <RadioToggleCustomize />
    </TabItem>
  </TabsArticle>
);

class RadioToggleExample extends React.Component {
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, RadioToggle } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="RadioToggleExample">
      <RadioToggle id="Position"${props} />
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="RadioToggleExample">
   <d-radio-toggle id="Position"${props} />
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = { enable: null, horizontal: null, plainText: null };

    const setWebComponent = show => this.setState({ webComponent: show });
    const webComponent = this.state && this.state.webComponent;
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample
        vm="RadioToggleExample"
        propTypes={propTypes}
        buildCode={selectBuildCode}
        onChange={setState}
        onWebComponent={setWebComponent}
      >
        <Panel style={{ minHeight: "7rem" }}>
          {!webComponent ? (
            <RadioToggle id="Position" {...this.state} />
          ) : (
            <d-vm-context vm="RadioToggleExample">
              <d-radio-toggle id="Position" {...this.state} />
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class RadioToggleCustomize extends React.Component {
  state = { plainText: false, validationMessages: null };

  render() {
    const { plainText } = this.state;
    const componentTypes = RadioToggle.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({
      plainText: value === "PlainTextComponent"
    });
    return (
      <RenderCustomize
        vm="RadioToggleCustomize"
        name="RadioToggle"
        componentTypes={componentTypes}
        select={select}
        onSelected={handleSelected}
      >
        <RadioToggle id="MyRadioToggle" label="Label:" plainText={plainText} />
      </RenderCustomize>
    );
  }
}

export default withTheme(FormRadioToggle);
