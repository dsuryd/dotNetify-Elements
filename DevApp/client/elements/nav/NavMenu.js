import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import { Collapsible } from '../layout/Collapsible';
import { IconLabel } from '../layout/IconLabel';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import * as utils from '../utils';

const Container = styled.div`
    padding: .75rem 0;
`;

const GroupContainer = props => (
    <Collapsible headerContainer={GroupHeaderContainer} {...props}>
        {props.children}
    </Collapsible>
);

const RouteContainer = styled.div`
    color: ${props => props.theme.navRoute.color};    
    background: ${props => props.theme.navRoute.background};  
    &:hover {
        color: ${props => props.theme.navRoute.hover.color};
        background: ${props => props.theme.navRoute.hover.background};
    }
    > a {
        color: ${props => props.theme.navRoute.color};   
        &:hover { color: ${props => props.theme.navRoute.hover.color}; } 
        &:active {color: ${props => props.theme.navRoute.active.color}; }
        &:focus {color: ${props => props.theme.navRoute.focus.color}; }
    }
`;

const GroupHeaderContainer = Collapsible.componentTypes.HeaderContainer.extend`
    padding-right: 1rem;
    color: ${props => props.theme.navGroup.color};
    background: ${props => props.theme.navGroup.background};
    &:hover {
        color: ${props => props.theme.navGroup.hover.color};
        background: ${props => props.theme.navGroup.hover.background};
    }        
`;

const GroupLabel = props => (
    <div style={{ padding: props.padding || '.75rem 1rem' }}>
        <IconLabel name={props.icon}>{props.children}</IconLabel>
    </div>
);

const RouteLabel = props => (
    <div style={{ padding: props.padding || '.75rem 1rem', paddingLeft: props.indent ? '2rem' : '1rem' }}>
        <IconLabel name={props.icon}>{props.children}</IconLabel>
    </div>
);

export const NavMenuTarget = _ => (<div id="NavMenuTarget" />);

export class NavMenu extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired
    };

    static componentTypes = {
        Container,
        GroupContainer,
        RouteContainer,
        GroupLabelComponent: GroupLabel,
        RouteLabelComponent: RouteLabel
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.context.vm)
            this.context.vm.onRouteEnter = (path, template) => template.Target = this.props.target || "NavMenuTarget";
    }

    buildRoute(navRoute, navGroup) {
        const [, , RouteContainer, , RouteLabel] = utils.resolveComponents(NavMenu, this.props);
        const indent = navGroup["Icon"] != null;
        return (
            <RouteContainer key={navRoute.Route.TemplateId}>
                <RouteLink vm={this.context.vm} route={navRoute.Route}>
                    <RouteLabel icon={navRoute.Icon} indent={indent}>{navRoute.Label}</RouteLabel>
                </RouteLink>
            </RouteContainer>
        );
    }

    render() {
        const [Container, GroupContainer, , GroupLabel] = utils.resolveComponents(NavMenu, this.props);

        const vmId = this.context.vmId;
        const props = this.props;
        const value = this.context.getState(props.id) || [];

        const navMenu = value.map((navItem, idx) => {
            const groupLabel = props => <GroupLabel icon={navItem.Icon} {...props} />;
            return navItem.Routes ? (
                <GroupContainer key={idx} label={navItem.Label} labelComponent={groupLabel} collapsed={!navItem.IsExpanded}>
                    {navItem.Routes.map(navRoute => this.buildRoute(navRoute, navItem))}
                </GroupContainer>
            ) : buildRoute(navItem);
        });

        return <Container>{navMenu}</Container>;
    }
};