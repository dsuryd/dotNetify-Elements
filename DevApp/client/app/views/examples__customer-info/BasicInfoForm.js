import React from 'react';
import { Button, Cell, CellPanel, DateField, DropdownList, Form, Frame, Panel, RadioGroup, TextField, TextAreaField, VMContext } from 'elements/bootstrap';

const BasicInfoForm = () => (
   <CellPanel horizontal>
      <CellPanel fit>
         <Cell header="Person" borders="top, left, right">
            <VMContext vm="PersonForm">
               <Form id="Person">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="FullName" plainText />
                     <DropdownList id="Prefix" />
                     <TextField id="FirstName" />
                     <TextField id="MiddleName" />
                     <TextField id="LastName" />
                     <DropdownList id="Suffix" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Phone" fit>
            <VMContext vm="PhoneForm">
               <Form id="Phone">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="Work" />
                     <TextField id="Home" />
                     <TextField id="Mobile" />
                     <DropdownList id="Primary" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
      </CellPanel>
      <CellPanel fit>
         <Cell header="Other Info" borders="top, right">
            <VMContext vm="OtherInfoForm">
               <Form id="OtherInfo">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="SSN" />
                     <DropdownList id="TaxFilingStatus" />
                     <DateField id="DateOfBirth" />
                     <RadioGroup id="Gender" />
                     <DropdownList id="MaritalStatus" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Driver License" borders="top, right">
            <VMContext vm="DriverLicenseForm">
               <Form id="DriverLicense">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="Number" />
                     <DropdownList id="State" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Notes" fit borders="top, right, bottom">
            <VMContext vm="NotesForm">
               <Form id="Notes">
                  <Panel childProps={{ horizontal: true }}>
                     <TextAreaField id="Notes" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
      </CellPanel>
   </CellPanel>
);

export default BasicInfoForm;
