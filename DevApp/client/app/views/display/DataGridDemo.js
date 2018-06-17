import React from 'react';
import { DataGrid, GridColumn, Frame, Panel, VMContext, withTheme } from 'dotnetify-elements';

const DateFormatter = props => new Date(props.value).toLocaleString();

const DataGridDemo = props => (
   <VMContext vm="SampleDataGrid">
      <Frame>
         <h2>Data Grid</h2>
         <DataGrid id="MyDataGrid" flex>
            <GridColumn key="LastVisit" width="13rem" formatter={DateFormatter} />
         </DataGrid>
      </Frame>
   </VMContext>
);

export default withTheme(DataGridDemo);
