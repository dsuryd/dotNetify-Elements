import React from 'react';
import styled from 'styled-components';

export const RadioToggleInput = styled.input.attrs({
}) `
   ${props => props.theme.RadioToggleInput}
`;

export const RadioToggleLabel = styled.label.attrs({
   className: props => props.checked ? "btn btn-primary" : "btn btn-outline-secondary"
}) `
   ${props => props.checked ? props.theme.RadioToggleLabel.Checked : props.theme.RadioToggleLabel.Default}
`;

export const RadioToggleGroup = styled.div.attrs({
   className: "btn-group btn-group-toggle",
   "data-toggle": "buttons"
}) `
   ${props => props.theme.RadioToggleGroup}
`;

export const RadioToggleContainer = props => {
   const { children, ...rest } = props;
   return React.cloneElement(React.Children.only(children), { ...rest });
}