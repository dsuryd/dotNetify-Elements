import styled from 'styled-components';
import * as utils from '../../utils';
import lightTheme from '../../theme-light';

const styleBorders = borders => {
   borders = borders.split(',').map(x => utils.toCamelCase(x.trim()));
   return [ 'top', 'left', 'bottom', 'right' ]
      .map(x => (!borders.includes(x) ? `border-${x}: none;` : null))
      .filter(x => x)
      .reduce((aggregate, current) => aggregate + current, '');
};

export const Cell = styled.div.attrs({
   className: 'card cell'
})`
   flex: ${utils.flexAuto};
   border-radius: 0;
   ${props => (props.borders ? styleBorders(props.borders) : null)}
   ${props => props.theme.Cell.Container};
   ${props => props.css};
`;

export const CellHeader = styled.div.attrs({
   className: 'card-header cell-header'
})`
   display: flex;
   border-radius: 0 !important;
   ${props => (props.padding ? `padding: ${props.padding};` : ``)}   
   ${props => (props.middle ? `align-items: center;` : ``)}
   ${props => (props.right ? `justify-content: flex-end;` : ``)}
   ${props => (props.center ? `justify-content: center;` : ``)}   
   ${props => props.theme.Cell.HeaderContainer};
`;

export const CellBody = styled.div.attrs({
   className: 'card-body cell-body'
})`
   display: flex;
   border-radius: 0;
   ${props => (props.padding ? `padding: ${props.padding};` : ``)}
   ${props => (props.middle ? `align-items: center;` : ``)}
   ${props => (props.right ? `justify-content: flex-end;` : ``)}
   ${props => (props.center ? `justify-content: center;` : ``)}
   ${props => props.theme.Cell.BodyContainer};
`;

Cell.defaultProps = { theme: lightTheme };
CellHeader.defaultProps = { theme: lightTheme };
CellBody.defaultProps = { theme: lightTheme };
