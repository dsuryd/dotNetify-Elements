import React from 'react';
import { DataGrid, Cell, CellPanel, DateField, DropdownList, GridColumn, Frame, Panel, RadioGroup, TextField, TextAreaField, Theme, VMContext } from '../../../elements/bootstrap';

const CustomerInfoPage = props => (
   <VMContext vm="CustomerInfoPage">
      <Theme>
         <Frame>
            <h2>Contacts</h2>
            <DataGrid id="Contacts">
            </DataGrid>
            <CellPanel horizontal>
               <CellPanel>
                  <Cell header="Person" borders="top, left, right">
                     <VMContext vm="CustomerInfoPage.PersonForm">
                        <Panel childProps={{ horizontal: true, plainText: true }}>
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
                        <Panel childProps={{ horizontal: true, plainText: true }}>
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
                        <Panel childProps={{ horizontal: true, plainText: true }}>
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
                        <Panel childProps={{ horizontal: true, plainText: true }}>
                           <TextField id="Number" />
                           <DropdownList id="State" />
                        </Panel>
                     </VMContext>
                  </Cell>
                  <Cell header="Notes" borders="top, right, bottom">
                     <VMContext vm="CustomerInfoPage.NotesForm">
                        <Panel childProps={{ horizontal: true, plainText: true }}>
                           <TextAreaField id="Notes" />
                        </Panel>
                     </VMContext>
                  </Cell>
               </CellPanel>
            </CellPanel>
         </Frame>
      </Theme>
   </VMContext >
);

export default CustomerInfoPage;