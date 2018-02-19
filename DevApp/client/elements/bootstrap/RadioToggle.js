import React from 'react';
import styled from 'styled-components';

export const RadioToggleGroupContainer = styled.div.attrs({
   className: "btn-group btn-group-toggle",
   "data-toggle": "buttons"
}) `
   ${props => props.theme.RadioToggle.Group}
`;

export const RadioToggleContainer = props => {
   const { children, ...rest } = props;
   return React.cloneElement(React.Children.only(children), { ...rest });
}

export const RadioToggleLabel = styled.label.attrs({
   className: props => props.checked ? "btn btn-primary" : "btn btn-outline-secondary"
}) `
   ${props => props.checked ? props.theme.RadioToggle.Label.Checked : props.theme.RadioToggle.Label.Default}
`;

export const RadioToggleInput = styled.input.attrs({
}) `
   ${props => props.theme.RadioToggle.Input}
`;