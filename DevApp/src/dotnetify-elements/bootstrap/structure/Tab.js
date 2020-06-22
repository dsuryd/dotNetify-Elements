import React from "react";
import styled from "styled-components";
import * as utils from "../utils";

export const Tab = styled.ul.attrs(props => ({
  className: "nav nav-tabs"
}))`
  ${props => props.theme.Tab.TabItemContainer}
`;

const TabNavItem = styled.li.attrs(props => ({
  className: "nav-item"
}))`
  &.nav-item {
    padding-bottom: 0;
  }
  ${props => props.theme.Tab.TabItem}
`;

const TabLink = styled.div.attrs(props => ({
  className: "nav-link"
}))`
  &:hover {
    cursor: pointer;
  }
`;

export const TabItem = props => (
  <TabNavItem>
    <TabLink
      className={props.active ? "active" : ""}
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      {props.children}
    </TabLink>
  </TabNavItem>
);

Tab.defaultProps = { theme: utils.getDefaultTheme() };
TabNavItem.defaultProps = { theme: utils.getDefaultTheme() };
