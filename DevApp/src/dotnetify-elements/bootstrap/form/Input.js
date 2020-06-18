import React from "react";
import styled from "styled-components";
import * as utils from "../utils";

export const Input = styled.input.attrs(props => ({
  className: "form-control"
}))`
  ${props => props.theme.Input}
  ${props => (props.valid === false ? props.theme.InputValidationError : "")};
`;

const InputPrepend = props => (
  <div className="input-group-prepend" style={props.style}>
    <span className="input-group-text">{props.children}</span>
  </div>
);

const InputAppend = props => (
  <div className="input-group-append" style={props.style}>
    <span className="input-group-text">{props.children}</span>
  </div>
);

export const InputGroup = props => {
  const { prefix, suffix, children } = props;
  return prefix || suffix ? (
    <div className="input-group" style={props.style}>
      {prefix ? <InputPrepend>{prefix}</InputPrepend> : null}
      {children}
      {suffix ? <InputAppend>{suffix}</InputAppend> : null}
    </div>
  ) : (
    children
  );
};

Input.defaultProps = { theme: utils.getDefaultTheme() };
