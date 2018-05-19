import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Collapsible } from '../structure/Collapsible';
import { Label } from '../display/Label';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import Element from '../core/Element';
import * as utils from '../utils';

const Container = styled.div`padding: .75rem 0;`;

const GroupContainer = props => (
   <Collapsible headerContainer={GroupHeaderContainer} {...props}>
      {props.children}
   </Collapsible>
);

const RouteContainer = styled.div`
   ${props => props.theme.NavMenu.RouteContainer};
   ${props => (props.isSelected ? props.theme.NavMenu.SelectedRoute : '')};
`;

const GroupHeaderContainer = Collapsible.componentTypes.HeaderContainer.extend`
    padding-right: 1rem;
    ${props => props.theme.NavMenu.GroupContainer}      
`;

const GroupLabel = props => (
   <div style={{ padding: props.padding || '.75rem 1rem' }}>
      <Label name={props.icon}>{props.children}</Label>
   </div>
);

const RouteLabel = props => (
   <div style={{ padding: props.padding || '.75rem 1rem', paddingLeft: props.indent ? '2.5rem' : '1rem' }}>
      <Label name={props.icon}>{props.children}</Label>
   </div>
);

export class NavMenu extends Element {
   static propTypes = {
      selected: PropTypes.string
   };

   static componentTypes = {
      Container,
      GroupContainer,
      RouteContainer,
      GroupLabelComponent: GroupLabel,
      RouteLabelComponent: RouteLabel
   };

   state = { selected: this.props.selected };

   componentDidMount() {
      if (this.vm)
         this.vm.onRouteEnter = (path, template) => {
            this.setState({ selected: template.Id });
            template.Target = this.props.target || 'NavMenuTarget';
         };
   }

   buildRoute(navRoute, navGroup) {
      const [ , , RouteContainer, , RouteLabel ] = utils.resolveComponents(NavMenu, this.props);
      const indent = navGroup ? navGroup.Icon != null : false;
      const key = navRoute.Route.TemplateId;
      const isSelected = key === this.state.selected;
      const select = () => alert();
      return (
         <RouteContainer key={key} isSelected={isSelected}>
            <RouteLink vm={this.vm} route={navRoute.Route}>
               <RouteLabel icon={navRoute.Icon} indent={indent}>
                  {navRoute.Label}
               </RouteLabel>
            </RouteLink>
         </RouteContainer>
      );
   }

   render() {
      if (this.props.hide) return null;

      const [ Container, GroupContainer, , GroupLabel ] = this.resolveComponents(NavMenu);

      const value = this.value || [];
      const navMenu = value.map((navItem, idx) => {
         const groupLabel = props => <GroupLabel icon={navItem.Icon} {...props} />;
         return navItem.Routes ? (
            <GroupContainer key={idx} label={navItem.Label} labelComponent={groupLabel} collapsed={!navItem.IsExpanded}>
               {navItem.Routes.map(navRoute => this.buildRoute(navRoute, navItem))}
            </GroupContainer>
         ) : (
            this.buildRoute(navItem)
         );
      });

      return <Container>{navMenu}</Container>;
   }
}

export const NavMenuTarget = styled.div.attrs({
   id: 'NavMenuTarget'
})`
    display: flex;
    flex: 1;       
    width: 100%;
    height: inherit;
`;
