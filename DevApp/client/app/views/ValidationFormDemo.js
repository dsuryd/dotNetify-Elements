import React from 'react';
import { Frame, Theme } from '../../elements-bootstrap';
import { Alert, Button, Card, Panel, Form, TextField, VMContext } from '../../elements-bootstrap';

const nameLengthValidation = {
  validate: value => typeof value !== 'undefined' && value.length >= 2,
  message: 'Name must be at least 2 characters'
}

const ValidationFormDemo = props => (
  <Theme>
    <Frame>
      <VMContext vm="SampleValidationForm">
        <Card header="Validation Form">
          <Form>
            <Panel>
              <TextField id="Name" validation={nameLengthValidation} />
              <TextField id="Email" />
              <Panel horizontal right>
                <Button cancel secondary>Cancel</Button>
                <Button id="Submit" submit primary>Submit</Button>
              </Panel>
              <Alert id="SubmitError" danger />
              <Alert id="SubmitSuccess" success />
            </Panel>
          </Form>
        </Card>
      </VMContext>
    </Frame>
  </Theme>
);

export default ValidationFormDemo;