import React from 'react';
import { DataGrid, GridColumn, Frame, Panel, TextField, Theme, VMContext } from '../../../elements/bootstrap';

const CustomerInfoPage = props => (
   <VMContext vm="CustomerInfoPage">
      <Theme>
         <Frame fit>
            <h2>Contacts</h2>
            <DataGrid id="Contacts" fit>
            </DataGrid>
            <VMContext vm="CustomerInfoPage.CustomerFormVM">
               <Panel childProps={{horizontal: true}}>
                  <TextField id="FirstName" />
                  <TextField id="LastName" />
               </Panel>
            </VMContext>
         </Frame>
      </Theme>
   </VMContext>
);

export default CustomerInfoPage;