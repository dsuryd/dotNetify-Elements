import React from 'react';
import styled from 'styled-components';
import logo from './logo.png';

const Logo = styled.img`
   font-size: x-large;
   display: flex;
   align-items: center;
   padding-left: 1rem;
   width: 200px;
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

const NavHeader = styled.div`
   height: 55px;
   display: flex;
   align-items: center;
`;

const DotNetifyLogo = _ => (
   <NavHeader>
      <Logo src={logo} />
   </NavHeader>
);

export default DotNetifyLogo;
