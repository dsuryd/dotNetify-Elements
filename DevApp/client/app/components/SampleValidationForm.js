import React from 'react';
import dotnetify from 'dotnetify';
import { Alert, Button, Card, Panel, Form, TextField, VMContext } from '../../elements-bootstrap';

const nameLengthValidation = {
    validate: value => typeof value !== 'undefined' && value.length >= 2,
    message: 'Name must be at least 2 characters'
}

const SampleValidationForm = ({ vm, title }) => (
    <VMContext vm={vm}>
        <Card header={title}>
            <Panel>
                <Form>
                    <Panel>
                        <TextField id="Name" validation={nameLengthValidation} />
                        <TextField id="Email" />
                        <Panel horizontal right>
                            <Button cancel secondary>Cancel</Button>
                            <Button id="Submit" submit primary>Submit</Button>
                        </Panel>
                    </Panel>
                </Form>
                <Alert id="SubmitError" danger />
                <Alert id="SubmitSuccess" success />
            </Panel>
        </Card>
    </VMContext>
);

export default SampleValidationForm;