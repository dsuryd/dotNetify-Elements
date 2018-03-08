import React from 'react';
import { DataGrid, DropdownList, GridColumn, Frame, Panel, TextField, Theme, VMContext } from '../../../elements/bootstrap';

const CustomerInfoPage = props => (
   <VMContext vm="CustomerInfoPage">
      <Theme>
         <Frame fit>
            <h2>Contacts</h2>
            <DataGrid id="Contacts" fit>
            </DataGrid>
            <VMContext vm="CustomerInfoPage.CustomerFormVM">
               <Panel childProps={{horizontal: true, plainText: false}}>
                  <TextField id="FullName" plainText />
                  <DropdownList id="Prefix" />
                  <TextField id="FirstName" />
                  <TextField id="MiddleName" />
                  <TextField id="LastName" />
                  <DropdownList id="Suffix" />
               </Panel>
            </VMContext>
         </Frame>
      </Theme>
   </VMContext>
);

export default CustomerInfoPage;