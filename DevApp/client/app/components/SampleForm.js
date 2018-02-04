import React from 'react';
import dotnetify from 'dotnetify';
import {
    Alert, Button, Card, Checkbox, CheckboxGroup, Divider, Panel, DropdownList,
    Form, TextField, TextAreaField, PasswordField, RadioGroup, VMContext
} from '../../elements-bootstrap';

const SampleForm = ({ vm, title, horizontal }) => (
    <VMContext vm={vm}>
        <Card header={title}>
            <Divider>
                <Form>
                    <Divider childProps={{ horizontal: horizontal }}>
                        <TextField id="MyText" />
                        <PasswordField id="MyPassword" />
                        <DropdownList id="MyDropdown" />
                        <TextAreaField id="MyTextArea" />
                        <RadioGroup id="MyRadio" />
                        <Checkbox id="MyCheckbox" />
                        <CheckboxGroup id="MyCheckboxGroup" />
                        <Divider horizontal right>
                            <Button secondary cancel>Cancel</Button>
                            <Button id="Submit" primary submit>Submit</Button>
                        </Divider>
                    </Divider>
                </Form>
                <Alert id="SubmitSuccess" />
            </Divider>
        </Card>
    </VMContext>
);

export default SampleForm;