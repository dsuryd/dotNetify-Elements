import React from 'react';
import {
   Button, Cell, CellPanel, DateField, DropdownList, Form,
   Frame, Panel, RadioGroup, TextField, TextAreaField, VMContext
} from '../../../elements/bootstrap';

const CustomerInfoForm = ({ plainText }) => (
   <Form>
      <CellPanel horizontal>
         <CellPanel>
            <Cell header="Person" borders="top, left, right">
               <VMContext vm="CustomerInfoPage.PersonForm">
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextField id="FullName" plainText />
                     <DropdownList id="Prefix" />
                     <TextField id="FirstName" />
                     <TextField id="MiddleName" />
                     <TextField id="LastName" />
                     <DropdownList id="Suffix" />
                  </Panel>
               </VMContext>
            </Cell>
            <Cell header="Phone">
               <VMContext vm="CustomerInfoPage.PhoneForm">
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextField id="Work" />
                     <TextField id="Home" />
                     <TextField id="Mobile" />
                     <DropdownList id="PrimaryPhone" />
                  </Panel>
               </VMContext>
            </Cell>
         </CellPanel>
         <CellPanel>
            <Cell header="Other Info" borders="top, right">
               <VMContext vm="CustomerInfoPage.OtherInfoForm">
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextField id="SSN" />
                     <DropdownList id="TaxFilingStatus" />
                     <DateField id="DateOfBirth" />
                     <RadioGroup id="Gender" />
                     <DropdownList id="MaritalStatus" />
                  </Panel>
               </VMContext>
            </Cell>
            <Cell header="Driver License" borders="top, right">
               <VMContext vm="CustomerInfoPage.DriverLicenseForm">
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextField id="Number" />
                     <DropdownList id="State" />
                  </Panel>
               </VMContext>
            </Cell>
            <Cell header="Notes" borders="top, right, bottom">
               <VMContext vm="CustomerInfoPage.NotesForm">
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextAreaField id="Notes" />
                  </Panel>
               </VMContext>
            </Cell>
         </CellPanel>
      </CellPanel>
   </Form>
);

export default CustomerInfoForm;