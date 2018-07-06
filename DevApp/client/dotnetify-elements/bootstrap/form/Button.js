import React from 'react';
import styled from 'styled-components';
import * as utils from '../utils';

export const Button = styled.button.attrs({
	className: (props) => 'btn ' + utils.mapStyleToClass(props, 'btn-'),
	type: (props) => (props.submit ? 'submit' : 'button')
})`
   margin-left: 3px;
   ${(props) => props.theme.Button};
   ${(props) => props.css};
`;
