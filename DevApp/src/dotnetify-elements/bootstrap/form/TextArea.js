import styled from "styled-components";
import * as utils from "../utils";

export const TextArea = styled.textarea.attrs((props) => ({
  className: "form-control"
}))`
  ${(props) => props.theme.TextArea}
  ${(props) => (props.valid === false ? props.theme.InputValidationError : "")};
`;

TextArea.defaultProps = { theme: utils.getDefaultTheme() };
