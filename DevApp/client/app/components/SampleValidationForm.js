import React from 'react';
import dotnetify from 'dotnetify';
import { Alert, Button, Card, Divider, Form, TextField, VMContext } from '../../elements-bootstrap';

const nameLengthValidation = {
    validate: value => typeof value !== 'undefined' && value.length >= 10,
    message: 'Name must be at least 10 characters'
}

const SampleValidationForm = ({ vm, title }) => (
    <VMContext vm={vm}>
        <Card header={title}>
            <Divider>
                <Form>
                    <Divider>
                        <TextField id="Name" validation={nameLengthValidation} />
                        <TextField id="Email" />
                        <Divider horizontal right>
                            <Button secondary cancel>Cancel</Button>
                            <Button id="Submit" primary submit>Submit</Button>
                        </Divider>
                    </Divider>
                </Form>
                <Alert id="SubmitError" danger />
                <Alert id="SubmitSuccess" success />
            </Divider>
        </Card>
    </VMContext>
);

export default SampleValidationForm;