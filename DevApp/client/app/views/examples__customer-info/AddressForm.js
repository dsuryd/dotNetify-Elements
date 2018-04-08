import React from 'react';
import { Button, Cell, CellPanel, DropdownList, Form, Frame, NumberField, Panel, RadioGroup, TextField, VMContext } from 'elements/bootstrap';

const AddressForm = () => (
   <CellPanel>
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
   </CellPanel>
);

export default AddressForm;
