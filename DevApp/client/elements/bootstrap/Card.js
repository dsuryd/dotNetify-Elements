import React from 'react';
import styled from 'styled-components';

export const Card = styled.div.attrs({
   className: "card"
}) `
   width: inherit;
   ${props => props.theme.Card.Container}
`;

export const CardHeader = styled.div.attrs({
   className: "card-header"
}) `
   ${props => props.theme.Card.HeaderContainer}
`;

export const CardBody = styled.div.attrs({
   className: "card-body"
}) `
   width: inherit;
   ${props => props.theme.Card.BodyContainer}
`;