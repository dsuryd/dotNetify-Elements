import React from 'react';
import { DataGrid, GridColumn, Frame, Panel, Theme, VMContext } from 'elements/bootstrap';

const DateFormatter = props => new Date(props.value).toLocaleString();

const DataGridDemo = props => (
   <VMContext vm="SampleDataGrid">
      <Theme>
         <Frame fit>
            <h2>Data Grid</h2>
            <DataGrid id="MyDataGrid" fit>
               <GridColumn id="LastVisit" width="13rem" formatter={DateFormatter} />
            </DataGrid>
         </Frame>
      </Theme>
   </VMContext>
);

export default DataGridDemo;
