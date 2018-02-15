import React from 'react';
import { DataGrid, Frame, Theme, VMContext } from '../../elements/bootstrap';

const DataGridDemo = props => (
   <Theme>
      <Frame>
         <VMContext vm="SampleDataGrid">
            <DataGrid id="MyDataGrid" />
         </VMContext>
      </Frame>
   </Theme>
);

export default DataGridDemo;