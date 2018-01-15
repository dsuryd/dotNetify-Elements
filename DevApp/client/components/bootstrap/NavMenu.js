import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Label } from 'reactstrap';
import { ContextTypes } from '../VMContext';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.font};
    background: ${props => props.theme.nav};
    margin: 1rem;
`;

const ChildContainer = styled.div`
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

    render() {
        if (!this.context.state)
            return null;

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.state[props.id];

        let menu = value.map((menuItem, idx) => (
            <ChildContainer key={idx}>
                <RouteLink vm={this.context.vm} route={menuItem.Route}>
                    <Label>{menuItem.Label}</Label>                
                </RouteLink>
            </ChildContainer>
        ));
        return (
            <Container>
                {menu}
            </Container>
        )
    }
};

NavMenu.propTypes = {
    id: PropTypes.string.isRequired
};

NavMenu.contextTypes = ContextTypes;