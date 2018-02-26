import React from 'react';
import { DataGrid, GridColumn, Frame, Panel, Theme, VMContext } from '../../../elements/bootstrap';

const CustomerInfoPage = props => (
   <VMContext vm="CustomerInfoPage">
      <Theme>
         <Frame fit>
            <h2>Contacts</h2>
            <DataGrid id="Contacts" fit>
            </DataGrid>
         </Frame>
      </Theme>
   </VMContext>
);

export default CustomerInfoPage;