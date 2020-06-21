import React from "react";
import styled from "styled-components";
import { Card, CardImage, Element } from "dotnetify-elements";

const InfoIcon = styled.i.attrs(props => ({
  className: "material-icons"
}))`
  font-size: 3rem;
  padding: 1.5rem;
  color: white;
  background: ${props => props.color};
  opacity: 0.8;
`;

const cardCss = `
   .card-body { padding: .5rem 1.5rem }
   h3 { font: 600 2rem Helvetica; }
`;

export default class InfoCard extends Element {
  render() {
    const { color, icon, label } = this.attrs;
    return (
      <Card horizontal css={cardCss}>
        <CardImage>
          <InfoIcon color={color}>{icon}</InfoIcon>
        </CardImage>
        <label>{label}</label>
        <h3>{this.value}</h3>
      </Card>
    );
  }
}
