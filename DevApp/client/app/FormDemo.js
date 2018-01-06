import React from 'react';
import styled from 'styled-components';
import dotnetify from 'dotnetify';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {
    Checkbox,
    CheckboxGroup,
    DropdownList,
    EmailField,
    TextField,
    TextAreaField,
    PasswordField,
    RadioGroup,
    VMContext
} from '../elements-bootstrap';

const FormDemo = ({vm, title}) => (
    <VMContext vm={vm}>
        <Card>
            <CardHeader>{title}</CardHeader>
            <CardBody>
                <TextField id="MyText" />
                <EmailField id="MyEmail" />
                <PasswordField id="MyPassword" />
                <DropdownList id="MyDropdown" />
                <TextAreaField id="MyTextArea" />
                <RadioGroup id="MyRadio" />
                <Checkbox id="MyCheckbox" />
                <CheckboxGroup id="MyCheckboxGroup" />
            </CardBody>
        </Card>
    </VMContext>
);

export default FormDemo;