import styled from 'styled-components';
import * as utils from '../utils';
import lightTheme from '../../theme-light';

export const Button = styled.button.attrs({
   className: props => 'btn ' + utils.mapStyleToClass(props, 'btn-'),
   type: props => (props.submit ? 'submit' : 'button')
})`
   margin-left: 3px;
   ${props => (props.stretch ? 'width: calc(100% - 6px)' : '')};   
   ${props => props.theme.Button};
   ${props => props.css};
`;

Button.defaultProps = { theme: lightTheme };
