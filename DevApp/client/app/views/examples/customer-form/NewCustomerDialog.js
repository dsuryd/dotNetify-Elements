import React from "react";
import {
  Button,
  DateField,
  DropdownList,
  Form,
  Modal,
  NumberField,
  Panel,
  RadioGroup,
  Tab,
  TabItem,
  TextField,
  TextAreaField,
  VMContext
} from "dotnetify-elements";

export default class NewCustomerDialog extends React.Component {
  state = { activeTab: "Person" };

  handleClose = _ => this.props.onClose();
  handleSubmitError = data => this.setState({ activeTab: data.failedForms[0].formId });
  handleActivate = tab => this.setState({ activeTab: tab });

  render() {
    const { open } = this.props;
    const { activeTab } = this.state;
    return (
      <VMContext vm="NewCustomerForm">
        <Modal header="New Customer" open={open} large onSubmitError={this.handleSubmitError}>
          <Tab active={activeTab} onActivate={this.handleActivate}>
            <TabItem itemKey="Person" label="Person">
              <VMContext vm="PersonForm">
                <Form id="Person">
                  <Panel>
                    <DropdownList id="Prefix" />
                    <TextField id="FirstName" />
                    <TextField id="MiddleName" />
                    <TextField id="LastName" />
                    <DropdownList id="Suffix" />
                  </Panel>
                </Form>
              </VMContext>
            </TabItem>
            <TabItem itemKey="Phone" label="Phone">
              <VMContext vm="PhoneForm">
                <Form id="Phone">
                  <Panel>
                    <TextField id="Work" />
                    <TextField id="Home" />
                    <TextField id="Mobile" />
                    <DropdownList id="Primary" />
                  </Panel>
                </Form>
              </VMContext>
            </TabItem>
            <TabItem itemKey="Address" label="Address">
              <VMContext vm="AddressForm">
                <Form id="Address">
                  <Panel>
                    <TextField id="Address1" />
                    <TextField id="Address2" />
                    <TextField id="City" />
                    <DropdownList id="State" />
                    <NumberField id="ZipCode" />
                  </Panel>
                </Form>
              </VMContext>
            </TabItem>
            <TabItem itemKey="OtherInfo" label="Other">
              <VMContext vm="OtherInfoForm">
                <Form id="OtherInfo">
                  <Panel>
                    <TextField id="SSN" />
                    <DropdownList id="TaxFilingStatus" />
                    <DateField id="DateOfBirth" />
                    <RadioGroup id="Gender" />
                    <DropdownList id="MaritalStatus" />
                  </Panel>
                </Form>
              </VMContext>
              <VMContext vm="DriverLicenseForm">
                <Form id="DriverLicense">
                  <Panel>
                    <TextField id="Number" />
                    <DropdownList id="State" />
                  </Panel>
                </Form>
              </VMContext>
              <VMContext vm="NotesForm">
                <Form id="Notes">
                  <Panel>
                    <TextAreaField id="Notes" />
                  </Panel>
                </Form>
              </VMContext>
            </TabItem>
          </Tab>
          <footer>
            <Panel horizontal right>
              <Button label="Cancel" cancel secondary onClick={this.handleClose} />
              <Button label="Submit" id="Submit" submit onClick={this.handleClose} />
            </Panel>
          </footer>
        </Modal>
      </VMContext>
    );
  }
}
