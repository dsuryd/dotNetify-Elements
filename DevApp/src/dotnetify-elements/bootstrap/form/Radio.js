import styled from "styled-components";
import * as utils from "../utils";

export const RadioInput = styled.input.attrs(props => ({
  className: props.theme.Radio.style
    ? "custom-control-input"
    : "form-check-input"
}))`
  ${props => props.theme.Radio.Input}
`;

export const RadioLabel = styled.label.attrs(props => ({
  className: props.theme.Radio.style
    ? "custom-control-label"
    : "form-check-label"
}))`
  ${props => props.theme.Radio.Label}
`;

export const RadioContainer = styled.div.attrs(props => ({
  className: props.theme.Radio.style
    ? "custom-control custom-radio"
    : "form-check"
}))`
  ${props =>
    props.checked
      ? props.theme.Radio.Container.Checked
      : props.theme.Radio.Container.Default}
`;

RadioInput.defaultProps = { theme: utils.getDefaultTheme() };
RadioLabel.defaultProps = { theme: utils.getDefaultTheme() };
RadioContainer.defaultProps = { theme: utils.getDefaultTheme() };
