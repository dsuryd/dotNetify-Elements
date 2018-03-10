import React from 'react';
import { DataGrid, Card, DateField, DropdownList, GridColumn, Frame, Panel, RadioGroup, TextField, TextAreaField, Theme, VMContext } from '../../../elements/bootstrap';

const CustomerInfoPage = props => (
   <VMContext vm="CustomerInfoPage">
      <Theme>
         <Frame>
            <h2>Contacts</h2>
            <DataGrid id="Contacts">
            </DataGrid>
            <Panel horizontal noGap>
               <Panel noGap>
                  <Card header="Person">
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
                  </Card>
                  <Card header="Phone">
                     <VMContext vm="CustomerInfoPage.PhoneForm">
                        <Panel childProps={{ horizontal: true, plainText: true }}>
                           <TextField id="Work" />
                           <TextField id="Home" />
                           <TextField id="Mobile" />
                           <DropdownList id="PrimaryPhone" />
                        </Panel>
                     </VMContext>
                  </Card>
               </Panel>
               <Panel noGap>
                  <Card header="Other Info">
                     <VMContext vm="CustomerInfoPage.OtherInfoForm">
                        <Panel childProps={{ horizontal: true, plainText: true }}>
                           <TextField id="SSN" />
                           <DropdownList id="TaxFilingStatus" />
                           <DateField id="DateOfBirth" />
                           <RadioGroup id="Gender" />
                           <DropdownList id="MaritalStatus" />
                        </Panel>
                     </VMContext>
                  </Card>
                  <Card header="Driver License">
                     <VMContext vm="CustomerInfoPage.DriverLicenseForm">
                        <Panel childProps={{ horizontal: true, plainText: true }}>
                           <TextField id="Number" />
                           <DropdownList id="State" />
                        </Panel>
                     </VMContext>
                  </Card>
                  <Card header="Notes">
                     <VMContext vm="CustomerInfoPage.NotesForm">
                        <Panel childProps={{ horizontal: true, plainText: true }}>
                           <TextAreaField id="Notes" />
                        </Panel>
                     </VMContext>
                  </Card>
               </Panel>
            </Panel>
         </Frame>
      </Theme>
   </VMContext >
);

export default CustomerInfoPage;