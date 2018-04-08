import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';
import { Label } from '../display/Label';
import { Panel } from '../layout/Panel';

const Container = styled.div`${props => props.theme.Tab.Container};`;

export class Tab extends React.Component {
   static componentTypes = {
      Container: Container,
      TabContainer: undefined,
      BodyContainer: Panel
   };

   state = { active: 0 };

   componentWillMount() {
      this.tabContents = React.Children.map(this.props.children, child => child.props.children);
   }

   handleClick = (event, idx, body) => {
      event.preventDefault();
      this.setState({ active: idx, body: body });
   };

   getDisplayStyle = idx => ({ padding: '1rem', display: this.state.active === idx ? 'initial' : 'none' });

   render() {
      const [ Container, TabContainer, BodyContainer ] = utils.resolveComponents(Tab, this.props);
      const { children, ...props } = this.props;

      const tabItems = React.Children.map(children, (child, idx) =>
         React.cloneElement(child, {
            key: idx,
            active: this.state.active === idx,
            onClick: event => this.handleClick(event, idx, child.props.children)
         })
      );

      const tabContents = this.tabContents.map((content, idx) => (
         <div key={idx} style={this.getDisplayStyle(idx)}>
            <BodyContainer>{content}</BodyContainer>
         </div>
      ));

      return (
         <Container>
            <TabContainer {...props}>{tabItems}</TabContainer>
            {tabContents}
         </Container>
      );
   }
}

export class TabItem extends React.Component {
   static propTypes = {
      label: PropTypes.any.isRequired,
      active: PropTypes.bool,
      onClick: PropTypes.func
   };

   static componentTypes = {
      TabItemComponent: undefined,
      LabelContainer: Label
   };

   render() {
      const [ TabItemComponent, LabelContainer ] = utils.resolveComponents(TabItem, this.props);
      const { label, onClick, active, children, ...props } = this.props;

      return (
         <TabItemComponent active={active} onClick={onClick} {...props}>
            <LabelContainer>{label}</LabelContainer>
         </TabItemComponent>
      );
   }
}
