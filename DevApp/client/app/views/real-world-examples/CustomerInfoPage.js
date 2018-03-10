import React from 'react';
import { DataGrid, Card, DropdownList, GridColumn, Frame, Panel, TextField, Theme, VMContext } from '../../../elements/bootstrap';

const CustomerInfoPage = props => (
   <VMContext vm="CustomerInfoPage">
      <Theme>
         <Frame>
            <h2>Contacts</h2>
            <DataGrid id="Contacts">
            </DataGrid>
            <Panel>
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
         </Frame>
      </Theme>
   </VMContext >
);

export default CustomerInfoPage;