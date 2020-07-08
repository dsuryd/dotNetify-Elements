import React, { useState, useEffect } from "react";
import BasicInfoForm from "./BasicInfoForm";
import AddressForm from "./AddressForm";
import NewCustomerDialog from "./NewCustomerDialog";
import { Button, DataGrid, Form, Frame, Markdown, Panel, Tab, TabItem, VMContext, withTheme } from "dotnetify-elements";
import { currentFramework, frameworkSelectEvent } from "../../../components";

const frameCss = `
   margin-left: 3rem; 
   max-width: calc(100% - 6rem);
   @media (max-width: 1170px) {
      margin-left: 1rem;
      max-width: calc(100% - 2rem);
    }     
`;

class CustomerForm extends React.Component {
  state = { editable: false, edit: false, openDialog: false };

  handleSelect = value => this.setState({ editable: value ? true : false });
  toggleEdit = _ => this.setState({ edit: !this.state.edit });
  toggleDialog = _ => this.setState({ openDialog: !this.state.openDialog });

  render() {
    const { editable, edit, openDialog } = this.state;
    const canEdit = editable && !edit;
    return (
      <VMContext vm="CustomerForm">
        <Panel>
          <DataGrid id="Contacts" onSelect={this.handleSelect} enable={!edit} />
          <Form plainText={!edit}>
            <Panel>
              {/* Toolbar */}
              <Panel horizontal>
                <Panel horizontal>
                  <Button label="Edit" enable={canEdit} onClick={this.toggleEdit} />
                  <Button label="Update" id="Submit" submit show={edit} onClick={this.toggleEdit} />
                  <Button label="Cancel" cancel secondary show={edit} onClick={this.toggleEdit} />
                </Panel>
                <Panel right>
                  <Button label="New Customer" onClick={this.toggleDialog} enable={!edit} />
                </Panel>
              </Panel>
              {/* Edit forms */}
              <Tab margin="1.5rem 0">
                <TabItem label="Basic Info">
                  <BasicInfoForm />
                </TabItem>
                <TabItem label="Address">
                  <AddressForm />
                </TabItem>
              </Tab>
            </Panel>
          </Form>
        </Panel>
        <NewCustomerDialog open={openDialog} onClose={this.toggleDialog} />
      </VMContext>
    );
  }
}

const CustomerFormExample = _ => {
  const [framework, setFramework] = useState(currentFramework);
  useEffect(() => frameworkSelectEvent.subscribe(framework => setFramework(framework)), []);
  return (
    <VMContext vm="CustomerFormExample">
      <Frame css={frameCss}>
        <Tab margin="1.5rem 0">
          <TabItem label="Output">
            <CustomerForm />
          </TabItem>
          {framework === "React" && (
            <TabItem label="Source">
              <Tab margin="1.5rem 0">
                <TabItem label="View">
                  <Markdown id="ViewSource" css="max-width: 80rem" />
                </TabItem>
                <TabItem label="View Model">
                  <Markdown id="ViewModelSource" css="max-width: 80rem" />
                </TabItem>
              </Tab>
            </TabItem>
          )}
        </Tab>
      </Frame>
    </VMContext>
  );
};

export default withTheme(CustomerFormExample);
