import styled from "styled-components";
import * as utils from "../utils";

export const Select = styled.select.attrs(props => ({
  className: "form-control"
}))`
  ${props => props.theme.Input}
  ${props => (props.valid === false ? props.theme.InputValidationError : "")};
`;

Select.defaultProps = { theme: utils.getDefaultTheme() };
