import React from 'react';
import { Alert, DataGrid, Element, GridColumn, Frame, Markdown, Panel, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayDataGrid = props => (
   <TabsArticle vm="DisplayDataGrid" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <DataGridExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
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
      <Alert success>
         Selected contact email: <Element id="SelectedEmail" />
      </Alert>
      <DataGrid id="Contacts" ${props}>
         <GridColumn key="LastVisit" width="13rem" formatter={DateFormatter} />
      </DataGrid>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { enable: null };
      return (
         <RenderExample vm="DataGridExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <Alert success>
                  Selected contact email: <Element id="SelectedEmail" />
               </Alert>
               <DataGrid id="Contacts" {...this.state}>
                  <GridColumn key="LastVisit" width="13rem" formatter={DateFormatter} />
               </DataGrid>
            </Panel>
         </RenderExample>
      );
   }
}

class WrappedGrid extends DataGrid {
   constructor(props) {
      super(props);
   }

   render() {
      let { dataGridComponent, ...props } = this.props;
      return dataGridComponent ? (
         <div style={{ width: '100%', border: '2px double red' }}>
            <DataGrid {...props} />
         </div>
      ) : (
         <DataGrid {...props} />
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
         <RenderCustomize
            vm="DataGridCustomize"
            name="DataGrid"
            componentTypes={componentTypes}
            select={select}
            onSelected={handleSelected}
         >
            <WrappedGrid id="MyDataGrid" />
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayDataGrid);
