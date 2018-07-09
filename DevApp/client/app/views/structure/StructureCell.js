import React from 'react';
import styled from 'styled-components';
import { Cell, Markdown, Panel, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';
import { BigIcon } from '../display/demo-helper';

const StructureCell = props => (
   <TabsArticle vm="StructureCell" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <CellExample />
            <CellGroupExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CellCustomize />
      </TabItem>
   </TabsArticle>
);

const MaterialIcon = styled.i.attrs({
   className: 'material-icons'
})`
   font-size: 3rem;
   margin-right: 1rem;
`;

class CellExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Cell, VMContext } from 'dotnetify-elements';
import { BigIcon } from './demo-helper';

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Cell>
         <header><b>Oops - Error 208</b></header>
         <BigIcon>error</BigIcon>
         I'm a teapot.         
      </Cell>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      const propTypes = { center: null, middle: null, right: null };
      return (
         <RenderExample propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <Cell {...this.state}>
                  <header>
                     <b>Oops - Error 208</b>
                  </header>
                  <BigIcon>error</BigIcon>
                  I'm a teapot.
               </Cell>
            </Panel>
         </RenderExample>
      );
   }
}

const tableCss = `
   .cell-header { font-weight: 600; padding: .5rem 1rem; border-bottom: none }
   .cell-body { padding: .5rem 1rem; }
`;

class CellGroupExample extends React.Component {
   state = { Customers: [] };
   render() {
      return (
         <VMContext vm="CellGroupExample" onStateChange={state => this.setState(state)}>
            <Panel horizontal childProps={{ flex: true }} css={tableCss}>
               <Cell header="Name" />
               <Cell header="Address" />
               <Cell header="City" />
            </Panel>
            {this.state.Customers.map(customer => (
               <Panel key={customer.Id} horizontal childProps={{ flex: true }} css={tableCss}>
                  <Cell>{customer.Name.FullName}</Cell>
                  <Cell>{customer.Address.Address1}</Cell>
                  <Cell>{customer.Address.City}</Cell>
               </Panel>
            ))}
         </VMContext>
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
