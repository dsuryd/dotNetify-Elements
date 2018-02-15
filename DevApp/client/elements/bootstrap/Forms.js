import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
   ${props => props.theme.Input.Component}
   ${props => props.valid === false ? props.theme.Input.ValidationError : ""};
`;

export const StyledLabel = styled.label`
   ${props => props.theme.CheckLabel}
`;

const StyledSelect = styled.select`
   ${props => props.theme.Input.Component}
   ${props => props.valid === false ? props.theme.Input.ValidationError : null};
`;

export const Input = (props) => (
   <StyledInput className="form-control" {...props} />
);

export const CheckInput = (props) => (
   <StyledInput className="form-check-input" {...props} />
);

export const CheckLabel = (props) => (
   <StyledLabel className="form-check-label" {...props} />
);

export const CheckGroup = (props) => (
   <div className="form-check" {...props} />
)

export const SelectInput = (props) => (
   <StyledSelect className="form-control" {...props} />
)
