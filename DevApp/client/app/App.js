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

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Main>
        <Header>
          <NavHeader>dotNetify</NavHeader>
        </Header>
        <Nav>
        </Nav>
        <Section>
          <Panel>
            <Card>
              <CardHeader>Header</CardHeader>
              <CardBody>
                <VMContext vm="App">
                  <TextField id="MyText" />
                  <EmailField id="MyEmail" />
                  <PasswordField id="MyPassword" />
                  <DropdownList id="MyDropdown" />
                  <TextAreaField id="MyTextArea" />
                  <RadioGroup id="MyRadio" />
                  <Checkbox id="MyCheckbox" />
                </VMContext>
              </CardBody>
            </Card>
          </Panel>
        </Section>
        <Footer>
        </Footer>
      </Main>
    );
  }
}
