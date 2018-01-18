import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../../VMContext';
import { Panel } from '../layout/Panel';
import { Collapsible, ToggleContainer } from '../layout/Collapsible';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';

const Container = styled.div``;

const GroupToggleContainer =ToggleContainer.extend`
    color: ${props => props.theme.navGroup};
    &:hover {
        cursor: pointer;
    }
`;

const GroupContainer = props => (
    <Collapsible
        toggleContainer={GroupToggleContainer}
        {...props}
    >
        {props.children}
    </Collapsible>
);

const GroupLabel = styled.div`
    padding: 1rem;
    &:hover {
        color: #adb5bd;
    }    
`;

const RouteContainer = styled.div`
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

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.context.vm)
            this.context.vm.onRouteEnter = (path, template) => template.Target = this.props.target || "NavMenuTarget";
    }

    buildRoute(navRoute) {
        let _RouteContainer = this.props.routeContainer || RouteContainer;
        let _RouteLabel = this.props.routeLabelComponent || RouteLabel;
        return (
            <_RouteContainer key={navRoute.Route.TemplateId}>
                <RouteLink vm={this.context.vm} route={navRoute.Route}>
                    <_RouteLabel>{navRoute.Label}</_RouteLabel>
                </RouteLink>
            </_RouteContainer>
        );
    }

    render() {
        let _Container = this.props.container || Container;
        let _GroupContainer = this.props.groupContainer || GroupContainer;
        let _GroupLabelComponent = this.props.groupLabelComponent || GroupLabel;

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.getState(props.id) || [];

        let navMenu = value.map((navItem, idx) => {
            return navItem.Routes ? (
                <_GroupContainer key={idx} label={navItem.Label} labelComponent={_GroupLabelComponent}>
                    {navItem.Routes.map(navRoute => this.buildRoute(navRoute))}
                </_GroupContainer>
            ) : this.buildRoute(navItem);
        });

        return <_Container>{navMenu}</_Container>;
    }
};

NavMenu.propTypes = {
    id: PropTypes.string.isRequired
};

NavMenu.contextTypes = ContextTypes;