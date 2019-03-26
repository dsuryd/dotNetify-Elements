import React from 'react';
import styled from 'styled-components';
import {
   Alert,
   DataGrid,
   Element,
   GridColumn,
   Markdown,
   Panel,
   RadioToggle,
   TabItem,
   withTheme
} from 'dotnetify-elements';
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
   state = { actions: false };
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { DataGrid, GridColumn, VMContext } from 'dotnetify-elements';

const DateFormatter = props => new Date(props.value).toLocaleString();
${this.state.actions
         ? `
const Icon = styled.i.attrs({ className: 'material-icons' })\`
   cursor: pointer;
   color: #bbb;
\`;
const EditItem = props => alert('Edit Id=' + props.dependentValues.key);
const RemoveItem = props => alert('Remove Id=' + props.dependentValues.key);`
         : ''}

const MyApp = _ => (
   <VMContext vm="DataGridExample">
      <Alert success>
         Selected contact email: <Element id="SelectedEmail" />
      </Alert>
      <DataGrid id="Contacts"${props}>
         <GridColumn key="LastVisit" width="13rem" formatter={DateFormatter} />
         ${this.state.actions
            ? `<GridColumn key="_actions" label="Actions" width="5rem"
            formatter={props => (
               <React.Fragment>
                  <Icon title="Edit" onMouseDown={() => EditItem(props)}>edit</Icon>
                  <Icon title="Remove" onMouseDown={() => RemoveItem(props)}>delete_forever</Icon>
               </React.Fragment>
            )} />`
            : ''}
      </DataGrid>
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="DataGridExample">
   <d-alert success="true">
      Selected contact email: <d-element id="SelectedEmail" />
   </d-alert>
   <d-data-grid id="Contacts"${props}>
      <d-grid-column key="LastVisit" width="13rem" 
        formatter="props => new Date(props.value).toLocaleString()" 
      />
   </d-data-grid>
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = { enable: null };

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      const showActions = val => this.setState({ actions: val === 'true' });
      const boolOptions = [ { Key: 'true', Value: 'True' }, { Key: 'false', Value: 'False' } ];

      const extraToggles = (
         <RadioToggle
            id="_actions"
            label="(actions:)"
            css="padding-bottom: 1rem"
            options={boolOptions}
            value={this.state.actions ? 'true' : 'false'}
            onChange={showActions}
         />
      );

      const Icon = styled.i.attrs({ className: 'material-icons' })`
         cursor: pointer;
         color: #bbb;
       `;
      const EditItem = props => alert('Edit Id=' + props.dependentValues.key);
      const RemoveItem = props => alert('Remove Id=' + props.dependentValues.key);

      return (
         <RenderExample
            vm="DataGridExample"
            extraToggles={!webComponent && extraToggles}
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel css="margin-bottom: 2rem">
               {!webComponent ? (
                  <React.Fragment>
                     <Alert success>
                        Selected contact email: <Element id="SelectedEmail" />
                     </Alert>
                     <DataGrid id="Contacts" {...this.state}>
                        <GridColumn key="LastVisit" width="13rem" formatter={DateFormatter} />
                        {this.state.actions && (
                           <GridColumn
                              key="_actions"
                              label="Actions"
                              width="5rem"
                              formatter={props => (
                                 <React.Fragment>
                                    <Icon title="Edit" onMouseDown={() => EditItem(props)}>
                                       edit
                                    </Icon>
                                    <Icon title="Remove" onMouseDown={() => RemoveItem(props)}>
                                       delete_forever
                                    </Icon>
                                 </React.Fragment>
                              )}
                           />
                        )}
                     </DataGrid>
                  </React.Fragment>
               ) : (
                  <d-vm-context vm="DataGridExample">
                     <d-alert success="true">
                        Selected contact email: <d-element id="SelectedEmail" />
                     </d-alert>
                     <d-data-grid id="Contacts" {...this.state}>
                        <d-grid-column
                           colkey="LastVisit"
                           width="13rem"
                           formatter="props => new Date(props.value).toLocaleString()"
                        />
                     </d-data-grid>
                  </d-vm-context>
               )}
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
