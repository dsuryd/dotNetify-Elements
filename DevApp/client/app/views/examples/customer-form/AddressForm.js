import React from "react";
import {
  Button,
  Cell,
  DropdownList,
  Form,
  Frame,
  NumberField,
  Panel,
  RadioGroup,
  TextField,
  VMContext
} from "dotnetify-elements";

const AddressForm = () => (
  <Panel>
    <Cell header="Primary Address">
      <VMContext vm="AddressForm">
        <Form id="Address">
          <Panel childProps={{ horizontal: true }}>
            <TextField id="Address1" />
            <TextField id="Address2" />
            <TextField id="City" />
            <DropdownList id="State" />
            <NumberField id="ZipCode" />
          </Panel>
        </Form>
      </VMContext>
    </Cell>
  </Panel>
);

export default AddressForm;
