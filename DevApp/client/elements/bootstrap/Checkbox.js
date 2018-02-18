import React from 'react';
import styled from 'styled-components';

export const CheckboxInput = styled.input.attrs({
   className: "form-check-input"
}) `
   ${props => props.theme.CheckboxInput}
`;

export const CheckboxLabel = styled.label.attrs({
   className: "form-check-label"
}) `
   ${props => props.checked ? props.theme.CheckboxLabel.Checked : props.theme.CheckboxLabel.Default}
`;

export const CheckboxGroup = styled.div.attrs({
   className: "form-check"
}) `
   ${props => props.theme.CheckboxGroup}
`;