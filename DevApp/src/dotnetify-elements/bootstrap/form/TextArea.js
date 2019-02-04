import styled from 'styled-components';

export const TextArea = styled.textarea.attrs({
   className: 'form-control'
})`
   ${props => props.theme.TextArea}
   ${props => (props.valid === false ? props.theme.InputValidationError : '')};
`;
