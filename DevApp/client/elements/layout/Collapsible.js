import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';
import { IconLabel } from './IconLabel';

const Container = styled.div`
`;

const HeaderContainer = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   &:hover {
      cursor: pointer;
  }   
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
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

  static propTypes = {
    noIcon: PropTypes.bool,
    right: PropTypes.bool,
    apart: PropTypes.bool,
    label: PropTypes.string
  }

  static componentTypes = {
    Container,
    HeaderContainer,
    IconLabelComponent: IconLabel,
    LabelComponent: IconLabel,
    AngleCollapseIcon,
    AngleExpandIcon,
    CollapsePanel: undefined
  }

  constructor(props) {
    super(props);
    this.state = { open: props.isOpen || true };
  }  

  handleClick = _ => this.setState({ open: !this.state.open });

  render() {
    const [Container, HeaderContainer, IconLabel, Label, AngleCollapseIcon, AngleExpandIcon, CollapsePanel] = utils.resolveComponents(Collapsible, this.props);
    const { noIcon, label, children } = this.props;
    const icon = this.state.open ? <AngleCollapseIcon /> : <AngleExpandIcon />;
    return (
      <Container>
        <HeaderContainer onClick={this.handleClick}>
          <IconLabel right apart icon={noIcon ? null : icon}>
            <Label isOpen={this.state.open}>{this.props.label}</Label>
          </IconLabel>
        </HeaderContainer>
        <CollapsePanel isOpen={this.state.open}>
          {children}
        </CollapsePanel>
      </Container>
    );
  }
}