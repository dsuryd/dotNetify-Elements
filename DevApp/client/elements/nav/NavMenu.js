import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import { Collapsible } from '../layout/Collapsible';
import { Label } from '../display/Label';
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
    ${props => props.theme.NavMenu.RouteContainer}
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

    get vmProperty() {
        return utils.getVMProperty(this);
    }

    componentWillMount() {
        if (this.vmProperty.vm)
            this.vmProperty.vm.onRouteEnter = (path, template) => template.Target = this.props.target || "NavMenuTarget";
    }

    buildRoute(navRoute, navGroup) {
        const [, , RouteContainer, , RouteLabel] = utils.resolveComponents(NavMenu, this.props);
        const indent = navGroup ? navGroup.Icon != null : false;
        return (
            <RouteContainer key={navRoute.Route.TemplateId}>
                <RouteLink vm={this.vmProperty.vm} route={navRoute.Route}>
                    <RouteLabel icon={navRoute.Icon} indent={indent}>{navRoute.Label}</RouteLabel>
                </RouteLink>
            </RouteContainer>
        );
    }

    render() {
        const [Container, GroupContainer, , GroupLabel] = utils.resolveComponents(NavMenu, this.props);

        const value = this.vmProperty.value || [];
        const navMenu = value.map((navItem, idx) => {
            const groupLabel = props => <GroupLabel icon={navItem.Icon} {...props} />;
            return navItem.Routes ? (
                <GroupContainer key={idx} label={navItem.Label} labelComponent={groupLabel} collapsed={!navItem.IsExpanded}>
                    {navItem.Routes.map(navRoute => this.buildRoute(navRoute, navItem))}
                </GroupContainer>
            ) : this.buildRoute(navItem);
        });

        return <Container>{navMenu}</Container>;
    }
};

export const NavMenuTarget = styled.div.attrs({
    id: "NavMenuTarget"
}) `
    display: flex;
    flex: 1;       
    width: 100%;
    height: inherit;
`;