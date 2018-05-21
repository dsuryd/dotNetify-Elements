import React from 'react';
import { Alert, Button, Card, Frame, Panel, Form, NumberField, TextField, VMContext, withTheme } from 'elements';

// This is an example of custom client-side validation.
const nameLengthValidator = {
   validate: value => typeof value == 'string' && value.length >= 2,
   message: 'Name must be at least 2 characters'
};

const FormValidationDemo = props => (
   <Frame>
      <h2>Form Validation</h2>
      <VMContext vm="SampleValidationForm">
         <Card header="Validation Form">
            <Form>
               <Panel>
                  <TextField id="Name" validation={nameLengthValidator} />
                  <TextField id="Phone" />
                  <TextField id="Email" />
                  <NumberField id="Age" />
                  <Panel horizontal right>
                     <Button label="Cancel" cancel secondary />
                     <Button label="Submit" id="Submit" submit primary />
                  </Panel>
                  <Alert id="SubmitError" danger />
                  <Alert id="SubmitSuccess" success />
               </Panel>
            </Form>
         </Card>
      </VMContext>
   </Frame>
);

export default withTheme(FormValidationDemo);
