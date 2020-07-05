import React from "react";
import { DateField, DateTimeField, TimeField, Markdown, Panel, TabItem, withTheme } from "dotnetify-elements";
import { FrameworkContext, TabsArticle, RenderCustomize, RenderExample } from "../../components";

const FormDateTimeField = props => (
  <TabsArticle vm="FormDateTimeField" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <DateTimeFieldExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
      <Markdown id="API" />
    </TabItem>
    <TabItem label="Customize">
      <DateTimeFieldCustomize />
    </TabItem>
  </TabsArticle>
);

class DateTimeFieldExample extends React.Component {
  static contextType = FrameworkContext;
  state = {};
  render() {
    const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { VMContext, DateTimeField } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="DateTimeFieldExample">
      <Panel horizontal>
         <DateField id="Date"${props} />
         <TimeField id="Time"${props} />
         <DateTimeField id="DateTime"${props} />
      </Panel>
   </VMContext>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="DateTimeFieldExample">
   <div style="display: flex">
      <d-date-field id="Date"${props} />
      <d-time-field id="Time"${props} css="margin: 0 1rem" />
      <d-date-time-field id="DateTime"${props} />
   </div>
</d-vm-context>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = { enable: null, horizontal: null, plainText: null };

    const webComponent = this.context !== "React";
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample vm="DateTimeFieldExample" propTypes={propTypes} buildCode={selectBuildCode} onChange={setState}>
        <Panel css="margin-bottom: 3rem">
          {!webComponent ? (
            <Panel horizontal>
              <DateField id="Date" {...this.state} />
              <TimeField id="Time" {...this.state} />
              <DateTimeField id="DateTime" {...this.state} />
            </Panel>
          ) : (
            <d-vm-context vm="DateTimeFieldExample">
              <div style={{ display: "flex" }}>
                <d-date-field id="Date" {...this.state} />
                <d-time-field id="Time" {...this.state} css="margin: 0 1rem" />
                <d-date-time-field id="DateTime" {...this.state} />
              </div>
            </d-vm-context>
          )}
        </Panel>
      </RenderExample>
    );
  }
}

class DateTimeFieldCustomize extends React.Component {
  state = { plainText: false, validationMessages: null };

  render() {
    const { plainText, validationMessages } = this.state;
    const componentTypes = DateTimeField.componentTypes;
    const handleSelected = state => this.setState(state);
    const select = value => ({
      plainText: value === "PlainTextComponent",
      validationMessages: value === "ValidationMessageComponent" ? ["Validation message"] : null
    });
    return (
      <RenderCustomize
        vm="DateTimeFieldCustomize"
        name="DateTimeField"
        componentTypes={componentTypes}
        select={select}
        onSelected={handleSelected}
      >
        <DateTimeField id="MyDateTimeField" plainText={plainText} validationMessages={validationMessages} />
      </RenderCustomize>
    );
  }
}

export default withTheme(FormDateTimeField);
