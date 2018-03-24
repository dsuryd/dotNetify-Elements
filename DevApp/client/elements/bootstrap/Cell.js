import React from 'react';
import styled from 'styled-components';
import * as utils from '../../elements/utils';

const styleBorders = borders => {
   borders = borders.split(',').map(x => utils.toCamelCase(x.trim()));
   return [ 'top', 'left', 'bottom', 'right' ]
      .map(x => (!borders.includes(x) ? `border-${x}: none;` : null))
      .filter(x => x)
      .reduce((aggregate, current) => aggregate + current, '');
};

export const Cell = styled.div.attrs({
   className: 'card'
})`
   border-radius: 0;
   ${props => (props.borders ? styleBorders(props.borders) : null)}
   ${props => props.theme.Cell.Container}
`;

export const CellHeader = styled.div.attrs({
   className: 'card-header'
})`
   ${props => props.theme.Cell.HeaderContainer}
`;

export const CellBody = styled.div.attrs({
   className: 'card-body'
})`
   ${props => props.theme.Cell.BodyContainer}
`;
