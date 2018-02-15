import React from 'react';
import styled from 'styled-components';

export const Card = styled.div.attrs({
   className: "card"
})`
   ${props => props.theme.Card}
`;

export const CardHeader = styled.div.attrs({
   className: "card-header"
})`
   ${props => props.theme.CardHeader}
`;

export const CardBody = styled.div.attrs({
   className: "card-body"
})`
   ${props => props.theme.CardBody}
`;