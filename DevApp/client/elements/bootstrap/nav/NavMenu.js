import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../../VMContext';
import { Panel } from '../layout/Panel';
import { Collapsible } from '../layout/Collapsible';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import * as utils from '../../utils';

const Container = styled.div``;

const GroupHeaderContainer = Collapsible.componentTypes.HeaderContainer.extend`
    color: ${props => props.theme.navGroup};
    &:hover {
        cursor: pointer;
    }
`;

const GroupContainer = props => (
    <Collapsible
        headerContainer={GroupHeaderContainer}
        {...props}
    >
        {props.children}
    </Collapsible>
);

const RouteContainer = styled.div`
`;

const GroupHeaderLabel = styled.div`
    padding: 1rem;
    &:hover {
        color: #adb5bd;
    }    
`;

const RouteLabel = styled.div`
    color: ${props => props.theme.navRoute};
    padding: 1rem;
    &:hover {
        color: #adb5bd;
        text-decoration: none;
    }        
`;

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
        GroupHeaderLabelComponent: GroupHeaderLabel,
        RouteLabelComponent: RouteLabel
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.context.vm)
            this.context.vm.onRouteEnter = (path, template) => template.Target = this.props.target || "NavMenuTarget";
    }

    buildRoute(navRoute) {
        const [, , RouteContainer, , RouteLabel] = utils.resolveComponents(NavMenu, this.props);
        return (
            <RouteContainer key={navRoute.Route.TemplateId}>
                <RouteLink vm={this.context.vm} route={navRoute.Route}>
                    <RouteLabel>{navRoute.Label}</RouteLabel>
                </RouteLink>
            </RouteContainer>
        );
    }

    render() {
        const [Container, GroupContainer, , GroupHeaderLabel] = utils.resolveComponents(NavMenu, this.props);

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.getState(props.id) || [];

        let navMenu = value.map((navItem, idx) => {
            return navItem.Routes ? (
                <GroupContainer key={idx} label={navItem.Label} labelComponent={GroupHeaderLabel}>
                    {navItem.Routes.map(navRoute => this.buildRoute(navRoute))}
                </GroupContainer>
            ) : buildRoute(navItem);
        });

        return <Container>{navMenu}</Container>;
    }
};