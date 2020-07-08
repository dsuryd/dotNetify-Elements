import React, { useState, useContext } from "react";
import { Markdown, VMContext, withTheme } from "dotnetify-elements";
import { Alert, Button, DropdownList, Form, Panel, TextField } from "dotnetify-elements";
import { currentFramework, FrameworkContext, Article, Expander } from "../components";

const WorkingWithForms = () => {
  const [framework, setFramework] = useState(currentFramework);
  return (
    <Article vm="WorkingWithForms" id="Content" onChangeFramework={x => setFramework(x)}>
      <Markdown id="Content" condition={framework}>
        <Expander label={<SeeItLive />} content={<BasicForm vm="BasicForm" />} />
        <Expander label={<SeeItLive />} content={<BasicForm vm="AsyncValidation" />} />
        {framework === "React" && <Expander label={<SeeItLive />} content={<ClientValidation />} />}
        <Expander label={<SeeItLive />} content={<NestedForms />} />
      </Markdown>
    </Article>
  );
};

const SeeItLive = _ => <b>See It Live!</b>;

const BasicForm = props => {
  const framework = useContext(FrameworkContext);
  return framework === "React" ? (
    <VMContext vm={props.vm}>
      <Form>
        <Alert id="ServerResponse" />
        <Panel>
          <TextField id="Name" />
          <TextField id="Email" />
          <Panel horizontal right>
            <Button label="Cancel" cancel secondary />
            <Button id="Register" submit />
          </Panel>
        </Panel>
      </Form>
    </VMContext>
  ) : (
    <d-vm-context vm={props.vm}>
      <d-form>
        <d-alert id="ServerResponse" />
        <d-panel>
          <d-text-field id="Name" />
          <d-text-field id="Email" />
          <d-panel horizontal="true" right="true">
            <d-button label="Cancel" cancel="true" secondary="true" />
            <d-button id="Register" submit />
          </d-panel>
        </d-panel>
      </d-form>
    </d-vm-context>
  );
};

const nameLengthValidator = {
  validate: value => typeof value == "string" && value.length >= 2,
  message: "Name must be at least 2 characters"
};

const ClientValidation = _ => (
  <VMContext vm="ClientValidation">
    <Form>
      <Panel horizontal>
        <TextField id="Name" horizontal validation={nameLengthValidator} />
        <Button id="Register" submit />
      </Panel>
    </Form>
  </VMContext>
);

const NestedForms = _ => {
  const framework = useContext(FrameworkContext);
  return framework === "React" ? (
    <VMContext vm="MasterForm">
      <Form>
        <Alert id="ServerResponse" />
        <Panel horizontal>
          <ChildForm_NameEmail flex />
          <ChildForm_Address flex />
        </Panel>
        <Button id="Register" submit />
      </Form>
    </VMContext>
  ) : (
    <d-vm-context vm="MasterForm">
      <d-form>
        <d-alert id="ServerResponse" />
        <d-panel horizontal="true">
          <d-panel flex="1">
            <d-vm-context vm="ChildForm_NameEmail">
              <d-form id="NameEmail">
                <d-panel>
                  <d-text-field id="Name" />
                  <d-text-field id="Email" />
                </d-panel>
              </d-form>
            </d-vm-context>
          </d-panel>
          <d-panel flex="1">
            <d-vm-context vm="ChildForm_Address">
              <d-form id="Address">
                <d-panel>
                  <d-text-field id="Address" />
                  <d-text-field id="City" />
                  <d-dropdown-list id="State" />
                </d-panel>
              </d-form>
            </d-vm-context>
          </d-panel>
        </d-panel>
        <d-button id="Register" submit="true" />
      </d-form>
    </d-vm-context>
  );
};

const ChildForm_NameEmail = _ => (
  <VMContext vm="ChildForm_NameEmail">
    <Form id="NameEmail">
      <Panel>
        <TextField id="Name" />
        <TextField id="Email" />
      </Panel>
    </Form>
  </VMContext>
);

const ChildForm_Address = _ => (
  <VMContext vm="ChildForm_Address">
    <Form id="Address">
      <Panel>
        <TextField id="Address" />
        <TextField id="City" />
        <DropdownList id="State" />
      </Panel>
    </Form>
  </VMContext>
);

export default withTheme(WorkingWithForms);
