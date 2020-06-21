import React from "react";
import styled from "styled-components";
import { Frame, Markdown, Panel, PasswordField, Tab, TabItem, VMContext, withTheme } from "dotnetify-elements";
import { TabsArticle, RenderCustomize, RenderExample } from "../../components";

const FormPasswordField = props => (
  <TabsArticle vm="FormPasswordField" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <PasswordFieldExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <PasswordFieldCustomize />
    </TabItem>
  </TabsArticle>
);

class PasswordFieldExample extends React.Component {
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, PasswordField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="PasswordFieldExample">
      <PasswordField id="Password"${props} />
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="PasswordFieldExample">
   <d-password-field id="Password"${props} />
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = { enable: null, horizontal: null, plainText: null };

    const setWebComponent = show => this.setState({ webComponent: show });
    const webComponent = this.state && this.state.webComponent;
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample
        vm="PasswordFieldExample"
        propTypes={propTypes}
        buildCode={selectBuildCode}
        onChange={setState}
        onWebComponent={setWebComponent}
      >
        <Panel style={{ minHeight: "7rem" }}>
          {!webComponent ? (
            <PasswordField id="Password" {...this.state} />
          ) : (
            <d-vm-context vm="PasswordFieldExample">
              <d-password-field id="Password" {...this.state} />
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class PasswordFieldCustomize extends React.Component {
  state = { plainText: false, validationMessages: null };

  render() {
    const { plainText, validationMessages } = this.state;
    const componentTypes = PasswordField.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({
      plainText: value === "PlainTextComponent",
      validationMessages: value === "ValidationMessageComponent" ? ["Validation message"] : null
    });
    return (
      <RenderCustomize
        vm="PasswordFieldCustomize"
        name="PasswordField"
        componentTypes={componentTypes}
        select={select}
        onSelected={handleSelected}
      >
        <PasswordField
          id="MyPasswordField"
          label="Label:"
          prefix="Prefix-"
          suffix="-Suffix"
          plainText={plainText}
          validationMessages={validationMessages}
        />
      </RenderCustomize>
    );
  }
}

export default withTheme(FormPasswordField);
