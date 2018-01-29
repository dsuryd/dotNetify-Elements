import React from 'react';
import dotnetify from 'dotnetify';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {
    Button,
    EmailField,
    Form,
    FormBody,
    Panel,
    TextField,
    VMContext
} from '../../elements-bootstrap';

const nameLengthValidation = {
    validate: value => typeof value !== 'undefined' && value.length >= 10,
    message: 'Name must be at least 10 characters'
}

const SampleValidationForm = ({ vm, title }) => (
    <VMContext vm={vm}>
        <Card>
            <CardHeader>{title}</CardHeader>
            <CardBody>
                <Form>
                    <Panel noMargin>
                        <TextField id="Name" validation={nameLengthValidation} />
                        <TextField id="Email" />
                        <Panel horizontal right noMargin>
                            <Button secondary cancel>Cancel</Button>
                            <Button id="Submit" primary submit>Submit</Button>
                        </Panel>
                    </Panel>
                </Form>
            </CardBody>
        </Card>
    </VMContext>
);

export default SampleValidationForm;