import styled from "styled-components";
import * as utils from "../utils";

export const Alert = styled.div.attrs(props => ({
  className: "alert " + utils.mapStyleToClass(props, "alert-")
}))`
  ${props => props.theme.Alert};
  ${props => props.css};
`;

Alert.defaultProps = { theme: utils.getDefaultTheme() };
