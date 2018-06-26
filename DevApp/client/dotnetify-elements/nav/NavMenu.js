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

const GroupLabel = ({ padding, icon, children, style }) => (
   <div style={{ padding: padding || '.75rem 1rem', ...style }}>
      <Label icon={icon}>{children}</Label>
   </div>
);

const RouteLabel = ({ padding, navGroup, icon, children, style }) => (
   <div style={{ padding: padding || '.75rem 1rem', paddingLeft: navGroup ? (navGroup.Icon ? '2.5rem' : '2rem') : '1rem', ...style }}>
      <Label icon={icon}>{children}</Label>
   </div>
);

export class NavMenu extends Element {
   static propTypes = {
      // Default selected item.
      selected: PropTypes.string
   };

   static componentTypes = {
      Container,
      GroupContainer,
      RouteContainer,
      GroupLabelComponent: GroupLabel,
      RouteLabelComponent: RouteLabel
   };

   state = { selected: this.props.selected, selectedPath: [] };

   componentDidMount() {
      if (this.vm)
         this.vm.onRouteEnter = (path, template) => {
            this.setState({ selected: template.Id, selectedPath: this.getSelectedPath(template.Id) });
            template.Target = this.props.target || 'NavMenuTarget';
            utils.toggleNavDrawer(false);
         };
   }

   buildRoute(navRoute, navGroup) {
      const [ , , RouteContainer, , RouteLabel ] = utils.resolveComponents(NavMenu, this.props);
      const key = navRoute.Route.TemplateId || `${navRoute.Route.Redirect || ''}${navRoute.Route.Path}`;
      const isSelected = key === this.state.selected;
      return (
         <RouteContainer key={key} isSelected={isSelected}>
            <RouteLink vm={this.vm} route={navRoute.Route}>
               <RouteLabel icon={navRoute.Icon} navGroup={navGroup}>
                  {navRoute.Label}
               </RouteLabel>
            </RouteLink>
         </RouteContainer>
      );
   }

   getSelectedPath(key) {
      // Use depth-first search to get the path to the selected route item.
      // All nav items matching the path will be expanded.
      let path = [];
      let stack = this.value ? [ ...this.value ] : [];
      while (stack.length > 0) {
         const item = stack.pop();
         path.push(item.Label);
         let stackRoutes = item.Routes ? [ ...item.Routes ] : [];
         while (stackRoutes.length > 0) {
            const routeItem = stackRoutes.pop();
            path.push(routeItem.Label);
            stack.push(routeItem);
            if (routeItem.Route.TemplateId === key) return path;
            path.pop();
         }
         path.pop();
      }
      return [];
   }

   render() {
      const [ Container, GroupContainer, , GroupLabel ] = this.resolveComponents(NavMenu);

      const value = this.value || [];
      const navMenu = value.map((navItem, idx) => {
         const groupLabel = props => <GroupLabel icon={navItem.Icon} {...props} />;
         const collapsed = this.state.selectedPath.some(path => path === navItem.Label) ? false : !navItem.IsExpanded;
         return navItem.Routes ? (
            <GroupContainer key={idx} label={navItem.Label} labelComponent={groupLabel} collapsed={collapsed}>
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
`;
