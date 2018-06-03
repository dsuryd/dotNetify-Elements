import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DataGrid, GridColumn, Frame, Markdown, Panel, TabItem, VMContext, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayDataGrid = props => (
   <TabsArticle vm="DisplayDataGrid" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <DataGridExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <DataGridCustomize />
      </TabItem>
   </TabsArticle>
);

const DateFormatter = props => new Date(props.value).toLocaleString();

const DataGridExample = props => (
   <VMContext vm="SampleDataGrid">
      <DataGrid id="MyDataGrid" flex>
         <GridColumn id="LastVisit" width="13rem" formatter={DateFormatter} />
      </DataGrid>
   </VMContext>
);

class DataGridCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = DataGrid.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize vm="DataGridExample" name="DataGrid" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <DataGrid id="MyDataGrid" flex>
               <GridColumn id="LastVisit" width="13rem" formatter={DateFormatter} />
            </DataGrid>
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayDataGrid);
