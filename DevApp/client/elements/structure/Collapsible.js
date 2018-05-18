import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';
import { Label } from '../display/Label';

const Container = styled.div`${props => props.theme.Collapsible.Container};`;

const HeaderContainer = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   &:hover {
      cursor: pointer;
   }
   ${props => props.theme.Collapsible.HeaderContainer};
`;

const IconContainer = styled.div`
   display: flex;
   align-items: center;
   width: 1.25rem;
`;

const AngleCollapseIcon = props => (
   <IconContainer>
      <svg viewBox="0 0 40 40" height="1.25rem" width="1.25rem" {...props} fill="currentColor">
         <g>
            <path d="m31 16.4q0 0.3-0.2 0.5l-10.4 10.4q-0.3 0.3-0.5 0.3t-0.6-0.3l-10.4-10.4q-0.2-0.2-0.2-0.5t0.2-0.5l1.2-1.1q0.2-0.2 0.5-0.2t0.5 0.2l8.8 8.8 8.7-8.8q0.3-0.2 0.5-0.2t0.6 0.2l1.1 1.1q0.2 0.2 0.2 0.5z" />
         </g>
      </svg>
   </IconContainer>
);

const AngleExpandIcon = props => (
   <IconContainer>
      <svg viewBox="0 0 40 40" height="1.25rem" width="1.25rem" {...props} fill="currentColor">
         <g>
            <path d="m26.3 21.4q0 0.3-0.2 0.5l-10.4 10.4q-0.3 0.3-0.6 0.3t-0.5-0.3l-1.1-1.1q-0.2-0.2-0.2-0.5t0.2-0.5l8.8-8.8-8.8-8.7q-0.2-0.3-0.2-0.6t0.2-0.5l1.1-1.1q0.3-0.2 0.5-0.2t0.6 0.2l10.4 10.4q0.2 0.2 0.2 0.5z" />
         </g>
      </svg>
   </IconContainer>
);

export class Collapsible extends React.Component {
   static propTypes = {
      collapsed: PropTypes.bool,
      noIcon: PropTypes.bool,
      right: PropTypes.bool,
      apart: PropTypes.bool,
      label: PropTypes.any,
      onToggled: PropTypes.func
   };

   static componentTypes = {
      Container,
      HeaderContainer,
      HeaderComponent: Label,
      LabelComponent: Label,
      AngleCollapseIcon,
      AngleExpandIcon,
      CollapsePanel: undefined
   };

   constructor(props) {
      super(props);
      this.state = { open: !props.collapsed };
   }

   handleClick = _ => {
      const open = !this.state.open;
      this.setState({ open: open });
      this.props.onToggled && this.props.onToggled(open);
   };

   render() {
      const [ Container, HeaderContainer, Header, Label, AngleCollapseIcon, AngleExpandIcon, CollapsePanel ] = utils.resolveComponents(Collapsible, this.props);
      const { noIcon, label, children } = this.props;
      const icon = this.state.open ? <AngleCollapseIcon /> : <AngleExpandIcon />;

      return (
         <Container>
            <HeaderContainer onClick={this.handleClick}>
               <Header right apart icon={noIcon ? null : icon}>
                  <Label isOpen={this.state.open}>{this.props.label}</Label>
               </Header>
            </HeaderContainer>
            <CollapsePanel isOpen={this.state.open}>{children}</CollapsePanel>
         </Container>
      );
   }
}
