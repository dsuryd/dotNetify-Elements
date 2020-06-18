import styled from "styled-components";
import * as utils from "../utils";

export const CheckboxInput = styled.input.attrs(props => ({
  className:
    props.switch || props.theme.Checkbox.style
      ? "custom-control-input"
      : "form-check-input"
}))`
  ${props => props.theme.Checkbox.Input}
`;

export const CheckboxLabel = styled.label.attrs(props => ({
  className:
    props.switch || props.theme.Checkbox.style
      ? "custom-control-label"
      : "form-check-label"
}))`
  ${props => props.theme.Checkbox.Label}
`;

export const CheckboxContainer = styled.div.attrs(props => ({
  className: props.switch
    ? "custom-control custom-switch"
    : props.theme.Checkbox.style
    ? "custom-control custom-checkbox"
    : "form-check"
}))`
  ${props =>
    props.checked
      ? props.theme.Checkbox.Container.Checked
      : props.theme.Checkbox.Container.Default};
  ${props => props.css};
`;

export const CheckboxPlainText = styled.b`
  margin-left: -1.25rem;
  ${props => (!props.checked ? "text-decoration: line-through" : "")};
`;

CheckboxInput.defaultProps = { theme: utils.getDefaultTheme() };
CheckboxLabel.defaultProps = { theme: utils.getDefaultTheme() };
CheckboxContainer.defaultProps = { theme: utils.getDefaultTheme() };
