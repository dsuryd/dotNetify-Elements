import React from "react";
import { Cell, Markdown, Panel, TabItem, VMContext, withTheme } from "dotnetify-elements";
import { TabsArticle, RenderCustomize, RenderExample } from "../../components";
import { BigIcon } from "../display/demo-helper";

const StructureCell = props => (
  <TabsArticle vm="StructureCell" id="Overview">
    <TabItem label="Overview" itemKey="Overview">
      <Markdown id="Overview">
        <CellExample />
        <CellGroupExample />
      </Markdown>
    </TabItem>
    <TabItem label="API" itemKey="API">
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
import { BigIcon } from './demo-helper';

const MyApp = _ => (
   <Cell${props}>
      <header><b>Oops - Error 208</b></header>
      <BigIcon>error</BigIcon>
      I'm a teapot.         
   </Cell>
);
\`\`\``;
    const buildWebComponentCode = props => `
\`\`\`jsx
<d-cell${props}>
   <header><b>Oops - Error 208</b></header>
   <i class="material-icons" 
      style="width:60px;font-size:4rem;color:#1c8adb;background:transparent"
   >error</i>
   I'm a teapot.         
</d-cell>
\`\`\``;
    const setState = state => this.setState(state);
    const propTypes = { center: null, middle: null, right: null };

    const setWebComponent = show => this.setState({ webComponent: show });
    const webComponent = this.state && this.state.webComponent;
    const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

    return (
      <RenderExample
        propTypes={propTypes}
        buildCode={selectBuildCode}
        onChange={setState}
        onWebComponent={setWebComponent}
      >
        <Panel css="margin-bottom: 2rem">
          {!webComponent ? (
            <Cell {...this.state}>
              <header>
                <b>Oops - Error 208</b>
              </header>
              <BigIcon>error</BigIcon>
              I'm a teapot.
            </Cell>
          ) : (
            <d-vm-context vm="CardExample">
              <d-cell {...this.state}>
                <header>
                  <b>Oops - Error 208</b>
                </header>
                <i
                  className="material-icons"
                  style={{ width: "60px", fontSize: "4rem", color: "#1c8adb", background: "transparent" }}
                >
                  error
                </i>
                I'm a teapot.
              </d-cell>
            </d-vm-context>
          )}
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
