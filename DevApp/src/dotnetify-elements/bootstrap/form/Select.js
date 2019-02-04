import styled from 'styled-components';

export const Select = styled.select.attrs({
   className: 'form-control'
})`
   ${props => props.theme.Input}
   ${props => (props.valid === false ? props.theme.InputValidationError : '')};
`;
