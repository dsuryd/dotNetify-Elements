import React from 'react';
import {
   Button, Cell, CellPanel, DateField, DropdownList, Form,
   Frame, Panel, RadioGroup, TextField, TextAreaField, VMContext
} from '../../../elements/bootstrap';

const CustomerInfoForm = ({ plainText, submitEvent, onChanged }) => (
   <CellPanel horizontal>
      <CellPanel>
         <Cell header="Person" borders="top, left, right">
            <VMContext vm="PersonForm">
               <Form plainText={plainText} submitEvent={submitEvent} onChanged={onChanged}>
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
         <Cell header="Phone">
            <VMContext vm="PhoneForm">
               <Form plainText={plainText} submitEvent={submitEvent} onChanged={onChanged}>
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextField id="Work" />
                     <TextField id="Home" />
                     <TextField id="Mobile" />
                     <DropdownList id="PrimaryPhone" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
      </CellPanel>
      <CellPanel>
         <Cell header="Other Info" borders="top, right">
            <VMContext vm="OtherInfoForm">
               <Form plainText={plainText} submitEvent={submitEvent} onChanged={onChanged}>
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
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
               <Form plainText={plainText} submitEvent={submitEvent} onChanged={onChanged}>
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextField id="Number" />
                     <DropdownList id="State" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Notes" borders="top, right, bottom">
            <VMContext vm="NotesForm">
               <Form plainText={plainText} submitEvent={submitEvent} onChanged={onChanged}>
                  <Panel childProps={{ horizontal: true, plainText: plainText }}>
                     <TextAreaField id="Notes" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
      </CellPanel>
   </CellPanel>
);

export default CustomerInfoForm;