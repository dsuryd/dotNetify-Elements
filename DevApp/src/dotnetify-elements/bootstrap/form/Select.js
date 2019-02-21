import styled from 'styled-components';
import lightTheme from '../../theme-light';

export const Select = styled.select.attrs({
   className: 'form-control'
})`
   ${props => props.theme.Input}
   ${props => (props.valid === false ? props.theme.InputValidationError : '')};
`;

Select.defaultProps = { theme: lightTheme };
