import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
    display: flex;
    justify-content: ${props => props.right ? 'flex-end' : 'flex-start'}; 
    flex-direction: ${props => props.horizontal ? 'row' : 'column'};
    margin: ${props => props.margin};
    height: ${props => props.height};
    width: ${props => props.width};
`;

const ChildContainer = styled.div`
    padding: ${props => props.padding};
    flex-grow: ${props => props.stretch ? '1' : '0'};
    flex-basis: ${props => props.equalWidth ? '0' : 'auto'};
`;

export class Panel extends React.Component {

    static propTypes = {
        childProps: PropTypes.object,
        equalWidth: PropTypes.bool,
        gap: PropTypes.bool,
        noGap: PropTypes.bool,
        smallGap: PropTypes.bool,
        horizontal: PropTypes.bool,
        margin: PropTypes.bool,
        noMargin: PropTypes.bool,
        smallMargin: PropTypes.bool,
        right: PropTypes.bool,
        stretch: PropTypes.bool,
        height: PropTypes.string,
        width: PropTypes.string,
    }

    static componentTypes = {
        Container,
        ChildContainer
    }

    getPadding(idx, gap, horizontal) {
        let padding = horizontal ? `0 0 0 ${gap}` : `${gap} 0 0 0`;
        return idx > 0 ? padding : 0;
    }

    mergeProps(elem, newProps) {
        return Object.assign({}, newProps, elem.props);
    }

    render() {
        const [Container, ChildContainer] = utils.resolveComponents(Panel, this.props);

        const {
            childProps,
            equalWidth,
            gap, noGap, smallGap,
            horizontal,
            margin, noMargin, smallMargin,
            right,
            stretch,
            height,
            width
        } = this.props;

        let _gap = gap || (noGap ? "0" : smallGap ? ".5rem" : "1rem");
        let _margin = margin || (noMargin ? "0" : smallMargin ? ".5rem" : "1rem");

        return (
            <Container
                margin={_margin}
                horizontal={horizontal}
                right={right}
                width={width}
                height={height}
            >
                {React.Children.map(this.props.children, (child, idx) =>
                    <ChildContainer
                        stretch={stretch}
                        equalWidth={equalWidth}
                        padding={this.getPadding(idx, _gap, horizontal)}
                    >
                        {childProps ? React.cloneElement(child, this.mergeProps(child, childProps)) : child}
                    </ChildContainer>
                )}
            </Container>
        )
    };
}

export const Divider = props => (
    <Panel noMargin {...props} />
);