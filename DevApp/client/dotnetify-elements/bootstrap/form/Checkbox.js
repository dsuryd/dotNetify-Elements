import React from 'react';
import styled from 'styled-components';

export const CheckboxInput = styled.input.attrs({
   className: 'form-check-input'
})`
   ${props => props.theme.Checkbox.Input}
`;

export const CheckboxLabel = styled.label.attrs({
   className: 'form-check-label'
})`
   ${props => props.theme.Checkbox.Label}
`;

export const CheckboxContainer = styled.div.attrs({
   className: 'form-check'
})`
   ${props => (props.checked ? props.theme.Checkbox.Container.Checked : props.theme.Checkbox.Container.Default)};
   ${props => props.css};
`;

export const CheckboxPlainText = styled.b`
   margin-left: -1.25rem;
   ${props => (!props.checked ? 'text-decoration: line-through' : '')};
`;
