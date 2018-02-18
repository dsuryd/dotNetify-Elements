import React from 'react';
import styled from 'styled-components';

export const RadioInput = styled.input.attrs({
   className: "form-check-input"
}) `
   ${props => props.theme.RadioInput}
`;

export const RadioLabel = styled.label.attrs({
   className: "form-check-label"
}) `
   ${props => props.checked ? props.theme.RadioLabel.Checked : props.theme.RadioLabel.Default}
`;

export const RadioContainer = styled.div.attrs({
   className: "form-check"
}) `
   ${props => props.theme.RadioGroup}
`;