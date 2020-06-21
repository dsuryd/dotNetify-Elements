import React from "react";
import styled from "styled-components";
import { Element } from "dotnetify-elements";

const BadgeContainer = styled.div`
  line-height: 1.5;
  padding: 0.1rem 0.5rem;
  margin-top: 2px;
  border-radius: 0.25rem;
  font-size: 75%;
  color: white;
  background: #fc5c7d;
`;

export class Badge extends Element {
  render() {
    return <BadgeContainer>{this.value}</BadgeContainer>;
  }
}

export const BigIcon = styled.i.attrs(props => ({
  className: "material-icons"
}))`
  width: 60px;
  font-size: 4rem;
  color: #1c8adb;
  background: transparent;
`;
