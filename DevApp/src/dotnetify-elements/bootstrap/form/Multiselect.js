import "react-widgets/dist/css/react-widgets.css";
import styled from "styled-components";
import rwMultiselect from "react-widgets/lib/Multiselect";
import * as utils from "../utils";

export const Multiselect = styled(rwMultiselect)`
  > .rw-widget-input {
    ${props => props.theme.Input}
    ${props => (props.valid === false ? props.theme.InputValidationError : "")};
  }
`;

Multiselect.defaultProps = { theme: utils.getDefaultTheme() };
