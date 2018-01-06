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
                <TextField id="MyText" horizontal />
                <EmailField id="MyEmail" horizontal />
                <PasswordField id="MyPassword" horizontal />
                <DropdownList id="MyDropdown" horizontal />
                <TextAreaField id="MyTextArea" horizontal />
                <RadioGroup id="MyRadio" horizontal />
                <Checkbox id="MyCheckbox" horizontal />
                <CheckboxGroup id="MyCheckboxGroup" horizontal />
            </CardBody>
        </Card>
    </VMContext>
);

export default FormDemo;