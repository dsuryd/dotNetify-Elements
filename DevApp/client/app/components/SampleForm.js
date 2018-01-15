import React from 'react';
import styled from 'styled-components';
import dotnetify from 'dotnetify';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {
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
                <Form>
                    <Panel noMargin childProps={{ horizontal: horizontal }}>
                        <TextField id="MyText" />
                        <EmailField id="MyEmail" />
                        <PasswordField id="MyPassword" />
                        <DropdownList id="MyDropdown" />
                        <TextAreaField id="MyTextArea" />
                        <RadioGroup id="MyRadio" />
                        <Checkbox id="MyCheckbox" />
                        <CheckboxGroup id="MyCheckboxGroup" />
                        <Panel horizontal right noMargin>
                            <Button secondary cancel>Cancel</Button>
                            <Button primary submit>Submit</Button>
                        </Panel>
                    </Panel>
                </Form>
            </CardBody>
        </Card>
    </VMContext>
);

export default SampleForm;