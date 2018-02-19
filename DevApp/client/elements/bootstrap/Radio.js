import React from 'react';
import styled from 'styled-components';

export const RadioInput = styled.input.attrs({
   className: "form-check-input"
}) `
   ${props => props.theme.Radio.Input}
`;

export const RadioLabel = styled.label.attrs({
   className: "form-check-label"
}) `
   ${props => props.theme.Radio.Label}
`;

export const RadioContainer = styled.div.attrs({
   className: "form-check"
}) `
   ${props => props.checked ? props.theme.Radio.Container.Checked : props.theme.Radio.Container.Default}
`;