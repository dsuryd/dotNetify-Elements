import React from 'react';
import styled from 'styled-components';
import dotnetify from 'dotnetify';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';
import {
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
} from '../elements-bootstrap';

const FormDemo = ({ vm, title, horizontal }) => (
    <VMContext vm={vm}>
        <Card>
            <CardHeader>{title}</CardHeader>
            <CardBody>
                <Form>
                    <Panel noMargin>
                        <Panel noMargin childProps={{ horizontal }}>
                            <TextField id="MyText" />
                            <EmailField id="MyEmail" />
                            <PasswordField id="MyPassword" />
                            <DropdownList id="MyDropdown" />
                            <TextAreaField id="MyTextArea" />
                            <RadioGroup id="MyRadio" />
                            <Checkbox id="MyCheckbox" />
                            <CheckboxGroup id="MyCheckboxGroup" />
                        </Panel>
                        <Panel horizontal right noMargin>
                            <Button color="primary">Cancel</Button>
                            <Button color="primary">Submit</Button>
                        </Panel>
                    </Panel>
                </Form>
            </CardBody>
        </Card>
    </VMContext>
);

export default FormDemo;