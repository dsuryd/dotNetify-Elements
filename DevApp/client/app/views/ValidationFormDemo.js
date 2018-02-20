import React from 'react';
import { Alert, Button, Card, Frame, Panel, Form, NumberField, TextField, Theme, VMContext } from '../../elements/bootstrap';

// This is an example of custom client-side validation.
const nameLengthValidator = {
  validate: value => typeof value == "string" && value.length >= 2,
  message: 'Name must be at least 2 characters'
}

const ValidationFormDemo = props => (
  <Theme>
    <Frame>
      <h2>Form Elements</h2>
      <VMContext vm="SampleValidationForm">
        <Card header="Validation Form">
          <Form>
            <Panel>
              <TextField id="Name" validation={nameLengthValidator} />
              <TextField id="Phone" />
              <TextField id="Email" />
              <NumberField id="Age" />
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