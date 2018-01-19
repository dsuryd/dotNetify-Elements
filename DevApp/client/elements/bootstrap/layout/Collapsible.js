import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import * as utils from '../../utils';

const Container = styled.div`
`;

const HeaderContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   &:hover {
      cursor: pointer;
  }   
`;

const Label = styled.div`
background: red;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const AngleCollapseIcon = props => (
  <IconContainer>
    <svg viewBox="0 0 40 40" height="1.25rem" width="1.25rem" {...props} fill="currentColor">
      <g><path d="m31 16.4q0 0.3-0.2 0.5l-10.4 10.4q-0.3 0.3-0.5 0.3t-0.6-0.3l-10.4-10.4q-0.2-0.2-0.2-0.5t0.2-0.5l1.2-1.1q0.2-0.2 0.5-0.2t0.5 0.2l8.8 8.8 8.7-8.8q0.3-0.2 0.5-0.2t0.6 0.2l1.1 1.1q0.2 0.2 0.2 0.5z" /></g>
    </svg>
  </IconContainer>
);

const AngleExpandIcon = props => (
  <IconContainer>
    <svg viewBox="0 0 40 40" height="1.25rem" width="1.25rem" {...props} fill="currentColor">
      <g><path d="m26.3 21.4q0 0.3-0.2 0.5l-10.4 10.4q-0.3 0.3-0.6 0.3t-0.5-0.3l-1.1-1.1q-0.2-0.2-0.2-0.5t0.2-0.5l8.8-8.8-8.8-8.7q-0.2-0.3-0.2-0.6t0.2-0.5l1.1-1.1q0.3-0.2 0.5-0.2t0.6 0.2l10.4 10.4q0.2 0.2 0.2 0.5z" /></g>
    </svg>
  </IconContainer>
);

export class Collapsible extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: props.isOpen || true };
  }

  static componentTypes = {
    Container,
    HeaderContainer,
    LabelComponent: Label,
    AngleCollapseIcon,
    AngleExpandIcon
  }

  handleClick = _ => this.setState({ open: !this.state.open });

  render() {
    const [Container, HeaderContainer, Label, AngleCollapseIcon, AngleExpandIcon] = utils.resolveComponents(Collapsible, this.props);

    return (
      <Container>
        <HeaderContainer onClick={this.handleClick}>
          <Label isOpen={this.state.open}>{this.props.label}</Label>
          {this.state.open ? <AngleCollapseIcon /> : <AngleExpandIcon />}
        </HeaderContainer>
        <Collapse isOpen={this.state.open}>
          {this.props.children}
        </Collapse>
      </Container>
    );
  }
}