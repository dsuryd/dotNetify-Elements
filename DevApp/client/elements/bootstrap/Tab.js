import React from 'react';
import styled from 'styled-components';
import * as utils from './utils';

export const Tab = styled.ul.attrs({
   className: 'nav nav-tabs'
})`
   ${props => props.theme.Tab.TabItemContainer}
`;

const TabNavItem = styled.li.attrs({
   className: 'nav-item'
})`
   ${props => props.theme.Tab.TabItem}
`;

const TabLink = styled.a.attrs({
   className: 'nav-link',
   href: ''
})``;

export const TabItem = props => (
   <TabNavItem>
      <TabLink className={props.active ? 'active' : ''} onClick={props.onClick}>
         {props.children}
      </TabLink>
   </TabNavItem>
);
