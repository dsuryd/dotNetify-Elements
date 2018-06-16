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

class DataGridExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { DataGrid, GridColumn, VMContext } from 'dotnetify-elements';

const DateFormatter = props => new Date(props.value).toLocaleString();

const MyApp = _ => (
   <VMContext vm="DataGridExample">
      <DataGrid id="MyDataGrid" flex ${props}>
         <GridColumn id="LastVisit" width="13rem" formatter={DateFormatter} />
      </DataGrid>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { ...DataGrid.propTypes };
      return (
         <RenderExample vm="DataGridExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <DataGrid id="Contacts" flex {...this.state}>
                  <GridColumn id="LastVisit" width="13rem" formatter={DateFormatter} />
               </DataGrid>
            </Panel>
         </RenderExample>
      );
   }
}

class DataGridCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = DataGrid.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize vm="DataGridCustomize" name="DataGrid" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <DataGrid id="MyDataGrid" flex>
               <GridColumn id="LastVisit" width="13rem" formatter={DateFormatter} />
            </DataGrid>
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayDataGrid);
