import React from 'react';
import dotnetify from 'dotnetify';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {
    Alert,
    Button,
    Checkbox,
    CheckboxGroup,
    DropdownList,
    EmailField,
    Form,
    FormBody,
    Panel,
    TextField,
    TextAreaField,
    PasswordField,
    RadioGroup,
    VMContext
} from '../../elements-bootstrap';

const SampleForm = ({ vm, title, horizontal }) => (
    <VMContext vm={vm}>
        <Card>
            <CardHeader>{title}</CardHeader>
            <CardBody>
                <Panel noMargin>
                    <Form>
                        <Panel noMargin childProps={{ horizontal: horizontal }}>
                            <TextField id="MyText" />
                            <PasswordField id="MyPassword" />
                            <DropdownList id="MyDropdown" />
                            <TextAreaField id="MyTextArea" />
                            <RadioGroup id="MyRadio" />
                            <Checkbox id="MyCheckbox" />
                            <CheckboxGroup id="MyCheckboxGroup" />
                            <Panel horizontal right noMargin>
                                <Button secondary cancel>Cancel</Button>
                                <Button id="Submit" primary submit>Submit</Button>
                            </Panel>
                        </Panel>
                    </Form>
                    <Alert id="Alert">Test</Alert>
                </Panel>
            </CardBody>
        </Card>
    </VMContext>
);

export default SampleForm;