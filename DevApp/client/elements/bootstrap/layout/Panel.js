import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: ${props => props.right ? 'flex-end' : 'flex-start'}; 
    flex-direction: ${props => props.horizontal ? 'row' : 'column'};
    margin: ${props => props.margin};
    height: ${props => props.height};
    width: ${props => props.width};
`;

export const ChildContainer = styled.div`
    padding: ${props => props.padding};
    flex-grow: ${props => props.stretch ? '1' : '0'};
    flex-basis: ${props => props.equalWidth ? '0' : 'auto'};
`;

export class Panel extends React.Component {

    getPadding(idx, max, gap, horizontal) {
        let padding = horizontal ? `0 ${gap} 0 0` : `0 0 ${gap} 0`;
        return idx < max - 1 ? padding : 0;
    }

    mergeProps(elem, newProps) {
        return Object.assign({}, newProps, elem.props);
    }

    render() {

        let {
            container,
            childContainer,
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
        const numChildren = React.Children.count(this.props.children);

        gap = gap || (noGap ? "0" : smallGap ? ".5rem" : "1rem");
        margin = margin || (noMargin ? "0" : smallMargin ? ".5rem" : "1rem");

        const _Container = container || Container;
        const _ChildContainer = childContainer || ChildContainer;

        return (
            <_Container
                margin={margin}
                horizontal={horizontal}
                right={right}
                width={width}
                height={height}
            >
                {React.Children.map(this.props.children, (child, idx) =>
                    <_ChildContainer
                        stretch={stretch}
                        equalWidth={equalWidth}
                        padding={this.getPadding(idx, numChildren, gap, horizontal)}
                    >
                        {childProps ? React.cloneElement(child, this.mergeProps(child, childProps)) : child}
                    </_ChildContainer>
                )}
            </_Container>
        )
    };
}