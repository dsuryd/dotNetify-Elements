import styled from 'styled-components';
import lightTheme from '../../theme-light';

export const TextArea = styled.textarea.attrs({
   className: 'form-control'
})`
   ${props => props.theme.TextArea}
   ${props => (props.valid === false ? props.theme.InputValidationError : '')};
`;

TextArea.defaultProps = { theme: lightTheme };
