import React from "react";
import styled from "styled-components";
import * as utils from "../utils";

export const RadioToggleGroupContainer = styled.div.attrs(props => ({
  className: "btn-group btn-group-toggle",
  "data-toggle": "buttons"
}))`
  ${props => props.theme.RadioToggle.Group}
`;

export const RadioToggleContainer = props => {
  const { children, ...rest } = props;
  return React.cloneElement(React.Children.only(children), { ...rest });
};

export const RadioToggleLabel = styled.label.attrs(props => ({
  className: props.checked ? "btn btn-primary" : "btn btn-outline-secondary"
}))`
  ${props => (props.checked ? props.theme.RadioToggle.Label.Checked : props.theme.RadioToggle.Label.Default)}
`;

export const RadioToggleInput = styled.input`
  ${props => props.theme.RadioToggle.Input};
`;

RadioToggleGroupContainer.defaultProps = { theme: utils.getDefaultTheme() };
RadioToggleLabel.defaultProps = { theme: utils.getDefaultTheme() };
RadioToggleInput.defaultProps = { theme: utils.getDefaultTheme() };
