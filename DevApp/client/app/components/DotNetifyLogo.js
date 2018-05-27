import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   font-size: x-large;
   display: flex;
   align-items: center;
   padding-left: 1rem;
`;

const Icon = styled.div`
   margin-top: 6px;
   margin-right: 6px;
   width: 20px;
   height: 20px;
   border-radius: 50%;
   background: #92d050;
   box-shadow: white 0 0 20px 0;
`;

export const LicenseNotice = styled.div`
   margin-top: auto;
   margin-left: auto;
   padding: 5px 8px;
   font-size: .8rem;
   color: #999;
   a {
      color: #337ab7;
      &:hover {
         color: #0056b3;
         text-decoration: none;
      }
      &:focus {
         color: #337ab7;
         > * {
            background: #e7e7e7;
         }
      }
   }
`;

const DotNetifyLogo = props => (
   <Container>
      <Icon />
      <span>dotNetify</span>
   </Container>
);

export default DotNetifyLogo;
