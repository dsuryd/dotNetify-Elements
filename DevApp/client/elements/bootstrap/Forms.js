import React from 'react';
import styled from 'styled-components';

export const Input = styled.input.attrs({
   className: "form-control"
})`
   ${props => props.theme.Input}
   ${props => props.valid === false ? props.theme.InputValidationError : ""};
`;

export const SelectInput = styled.select.attrs({
   className: "form-control"
})`
   ${props => props.theme.Input}
   ${props => props.valid === false ? props.theme.Input.ValidationError : null};
`;

export const CheckboxInput = styled.input.attrs({
   className: "form-check-input"
})`
   ${props => props.theme.CheckRadioInput}
`;

export const CheckboxLabel = styled.label.attrs({
   className: "form-check-label"
})`
   ${props => props.theme.CheckRadioLabel}
`;

export const CheckboxGroup = styled.div.attrs({
   className: "form-check"
})`
   ${props => props.theme.CheckRadioGroup}
`;

export const RadioInput = styled.input.attrs({
   className: "form-check-input"
})`
   ${props => props.theme.CheckRadioInput}
`;

export const RadioLabel = styled.label.attrs({
   className: "form-check-label"
})`
   ${props => props.theme.CheckRadioLabel}
`;

export const RadioGroup = styled.div.attrs({
   className: "form-check"
})`
   ${props => props.theme.CheckRadioGroup}
`;

