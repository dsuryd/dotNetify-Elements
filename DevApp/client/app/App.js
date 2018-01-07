import React from 'react';
import styled from 'styled-components';
import dotnetify from 'dotnetify';
import {
  Main,
  Header,
  Footer,
  Nav,
  NavHeader,
  Section,
  Panel
} from '../elements-bootstrap';
import FormDemo from './FormDemo';

const App = props => (
  <Main>
    <Header>
      <NavHeader>dotNetify</NavHeader>
    </Header>
    <Nav>
    </Nav>
    <Section>
      <Panel horizontal equalWidth>
        <FormDemo vm="FormDemo" title="Vertical Form" />
        <FormDemo vm="HorizontalFormDemo" title="Horizontal Form" horizontal />
      </Panel>
    </Section>
    <Footer>
    </Footer>
  </Main>
);

export default App;