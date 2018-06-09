import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Cell, CellPanel, Markdown, Panel, TabItem, Theme, VMContext, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureCell = props => (
   <TabsArticle vm="StructureCell" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <CellExample />
            <CellGroupExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CellCustomize />
      </TabItem>
   </TabsArticle>
);

class CellExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Cell, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Cell>
         <header><b>Oops - Error 208</b></header>
         I'm a teapot.
      </Cell>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample propTypes={Cell.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <Cell>
                  <header>
                     <b>Oops - Error 208</b>
                  </header>
                  I'm a teapot.
               </Cell>
            </Panel>
         </RenderExample>
      );
   }
}

class CellGroupExample extends React.Component {
   state = { Customers: [] };
   tableTheme = {
      ...defaultTheme,
      Cell: {
         HeaderContainer: 'font-weight: 500',
         BodyContainer: 'padding: .5rem'
      }
   };
   render() {
      return (
         <Theme theme={this.tableTheme}>
            <VMContext vm="CellGroupExample" onStateChange={state => this.setState(state)}>
               <CellPanel horizontal childProps={{ flex: true }}>
                  <Cell header="Name" />
                  <Cell header="Address" />
                  <Cell header="City" />
               </CellPanel>
               {this.state.Customers.map(customer => (
                  <CellPanel key={customer.Id} horizontal childProps={{ flex: true }}>
                     <Cell>{customer.Name.FullName}</Cell>
                     <Cell>{customer.Address.Address1}</Cell>
                     <Cell>{customer.Address.City}</Cell>
                  </CellPanel>
               ))}
            </VMContext>
         </Theme>
      );
   }
}

class CellCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Cell.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Cell" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Cell>
               <header>Header</header>
               Body
            </Cell>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureCell);
