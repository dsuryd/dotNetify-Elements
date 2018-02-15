import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
   ${props => props.theme.Card}
`;

const StyledCardHeader = styled.div`
   ${props => props.theme.CardHeader}
`;

const StyledCardBody = styled.div`
   ${props => props.theme.CardBody}
`;

export const Card = (props) => (
   <StyledCard className="card" {...props} />
);

export const CardHeader = (props) => (
   <StyledCardHeader className="card-header" {...props} />
);

export const CardBody= (props) => (
   <StyledCardBody className="card-body" {...props} />
);