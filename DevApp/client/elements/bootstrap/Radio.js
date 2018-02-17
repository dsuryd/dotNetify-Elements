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
   ${props => props.theme.RadioLabel}
`;

export const RadioGroup = styled.div.attrs({
   className: "form-check"
}) `
   ${props => props.theme.RadioGroup}
`;