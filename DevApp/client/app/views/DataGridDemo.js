import React from 'react';
import { DataGrid, GridColumn, Frame, Panel, Theme, VMContext } from '../../elements/bootstrap';

const DateFormatter = props => new Date(props.value).toLocaleString();

const DataGridDemo = props => (
   <VMContext vm="SampleDataGrid">
      <Theme>
         <Frame fit>
            <h4>Data Grid</h4>
            <DataGrid id="MyDataGrid" fit>
               <GridColumn id="LastVisit" width="13rem" formatter={DateFormatter} />
            </DataGrid>
         </Frame>
      </Theme>
   </VMContext>
);

export default DataGridDemo;