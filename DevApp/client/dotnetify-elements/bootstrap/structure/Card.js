import React from 'react';
import styled from 'styled-components';

export const Card = styled.div.attrs({
   className: 'card'
})`
   width: inherit;
   flex: 1;
   ${props => props.theme.Card.Container}
   ${props => props.css};
`;

export const CardImage = styled.div.attrs({
   className: 'card-img-top'
})`
   img { 
      width: 100%; 
   }
   ${props => props.theme.Card.ImageContainer}
`;

export const CardHeader = styled.div.attrs({
   className: 'card-header'
})`
   ${props => props.theme.Card.HeaderContainer}
`;

export const CardBody = styled.div.attrs({
   className: 'card-body'
})`
   width: inherit;
   ${props => props.theme.Card.BodyContainer}
`;

export const CardFooter = styled.div.attrs({
   className: 'card-footer'
})`
   ${props => props.theme.Card.FooterContainer}
`;
