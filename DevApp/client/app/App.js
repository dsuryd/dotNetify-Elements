import React from 'react';
import styled from 'styled-components';
import dotnetify from 'dotnetify';
import {
  Button, Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Form, FormGroup, Label, Input,
} from 'reactstrap';
import {
  Main, Header, Nav, NavHeader, Footer, Section, Panel,
  NavToggle, VMContext,
  TextField, EmailField, PasswordField, TextAreaField,
  DropdownList, RadioGroup, Checkbox
} from '../elements-bootstrap';

const App = props => (
  <Main>
    <Header>
      <NavHeader>dotNetify</NavHeader>
    </Header>
    <Nav>
    </Nav>
    <Section horizontal>
      <Panel>
        <VMContext vm="App">
          <Card>
            <CardHeader>Vertical Form</CardHeader>
            <CardBody>
              <TextField id="MyText" />
              <EmailField id="MyEmail" />
              <PasswordField id="MyPassword" />
              <DropdownList id="MyDropdown" />
              <TextAreaField id="MyTextArea" />
              <RadioGroup id="MyRadio" />
              <Checkbox id="MyCheckbox" />
            </CardBody>
          </Card>
        </VMContext>
      </Panel>
      <Panel>
        <VMContext vm="FormElements">
          <Card>
            <CardHeader>Horizontal Form</CardHeader>
            <CardBody>
              <TextField id="MyText" horizontal />
              <EmailField id="MyEmail" horizontal />
              <PasswordField id="MyPassword" horizontal />
              <DropdownList id="MyDropdown" horizontal />
              <TextAreaField id="MyTextArea" horizontal />
              <RadioGroup id="MyRadio" horizontal />
              <Checkbox id="MyCheckbox" horizontal />
            </CardBody>
          </Card>
        </VMContext>
      </Panel>
    </Section>
    <Footer>
    </Footer>
  </Main>
);

export default App;