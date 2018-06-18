import React from 'react';
import styled from 'styled-components';
import { Element } from 'dotnetify-elements';

const BadgeContainer = styled.div`
   padding: .1rem .5rem;
   margin-top: 2px;
   border-radius: .25rem;
   font-size: 75%;
   color: white;
   background: #fc5c7d;
`;

export class Badge extends Element {
   render() {
      return <BadgeContainer>{this.value}</BadgeContainer>;
   }
}

export const BigIcon = styled.span.attrs({
   className: props => props.name
})`
   width:40px; 
   font-size: 4rem;
   color: white;
   border-radius: 50%;
   padding: .5rem;
   background: #1c8adb;

`;
