import React from 'react';
import styled from 'styled-components';
import * as utils from '../utils';

export const Alert = styled.div.attrs({
   className: props => 'alert ' + utils.mapStyleToClass(props, 'alert-')
})`
   ${props => props.theme.Alert};
   ${props => props.css};
`;
