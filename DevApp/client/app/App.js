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
import HorizontalFormDemo from './HorizontalFormDemo';

const App = props => (
  <Main>
    <Header>
      <NavHeader>dotNetify</NavHeader>
    </Header>
    <Nav>
    </Nav>
    <Section>
      <Panel horizontal equalWidth>
        <Panel>
          <FormDemo vm="FormDemo" title="Vertical Form" />
        </Panel>
        <Panel>
          <HorizontalFormDemo vm="HorizontalFormDemo" title="Horizontal Form" />
        </Panel>
      </Panel>
    </Section>
    <Footer>
    </Footer>
  </Main>
);

export default App;