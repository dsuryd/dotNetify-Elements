import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${props => props.right ? 'row-reverse' : 'row'};
    justify-content: ${props => props.apart ? 'space-between' : 'flex-start'};
    width: ${props => props.apart ? '100%' : 'inherit'};
`;

const Icon = styled.span.attrs({
    className: props => props.name
}) `
    margin: ${props => props.right ? '0 0 0 .5rem' : '0 .5rem 0 0'};
`;

export class IconLabel extends React.Component {

    static propTypes = {
        right: PropTypes.bool,
        apart: PropTypes.bool,
        icon: PropTypes.object
    }

    static componentTypes = {
        LabelContainer,
        IconComponent: Icon
    }

    render() {
        const [LabelContainer, Icon] = utils.resolveComponents(IconLabel, this.props);
        const { right, apart, name, icon, children } = this.props;
        return (
            <LabelContainer right={right} apart={apart}>
                {icon ? icon : <Icon name={name} right={right} />}
                {children}
            </LabelContainer>
        );
    }
}  
