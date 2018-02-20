import React from 'react';
import { DataGrid, GridColumn, Frame, Theme, VMContext } from '../../elements/bootstrap';

const DateFormatter = props => new Date(props.value).toLocaleString();

const DataGridDemo = props => (
   <Theme>
      <Frame fit>
         <VMContext vm="SampleDataGrid">
            <DataGrid id="MyDataGrid">
               <GridColumn id="LastVisit" width="170" formatter={DateFormatter} />
            </DataGrid>
         </VMContext>
      </Frame>
   </Theme>
);

export default DataGridDemo;