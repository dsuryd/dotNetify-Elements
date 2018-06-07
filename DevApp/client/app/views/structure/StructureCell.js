import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell, CellPanel, Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureCell = props => (
   <TabsArticle vm="StructureCell" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <CellExample />
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
import { Button, Card, Markdown, Panel, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Card width="400px">
         <header>
            <Markdown id="Title" />
         </header>
         <Markdown id="Content" />
         <footer>
            <Panel right><Button id="Register" /></Panel>
         </footer>
      </Card>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample propTypes={Cell.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <CellPanel horizontal>
                  <CellPanel flex>
                     <Cell borders="top, left">Cell 1</Cell>
                     <Cell borders="right, bottom">Cell 3</Cell>
                  </CellPanel>
                  <CellPanel flex>
                     <Cell>Cell 2</Cell>
                     <Cell>Cell 4</Cell>
                  </CellPanel>
               </CellPanel>
            </Panel>
         </RenderExample>
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
            <Cell />
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureCell);
