import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: ${props => props.right ? 'flex-end' : 'flex-start'}; 
    flex-direction: ${props => props.horizontal ? 'row' : 'column'};
    margin: ${props => props.margin}
`;

const ChildContainer = styled.div`
    padding: ${props => props.padding};
    flex-grow: ${props => props.stretch ? '1' : '0'};
    flex-basis: ${props => props.equalWidth ? '0' : 'auto'};
`;

export class Panel extends React.Component {

    getPadding(idx, max, gap, horizontal) {
        let padding = horizontal ? `0 ${gap} 0 0` : `0 0 ${gap} 0`;
        return idx < max - 1 ? padding : 0;
    }

    render() {
        let {
            childProps,
            equalWidth,
            gap, noGap, smallGap,
            horizontal,
            margin, noMargin, smallMargin,
            right,
            stretch
        } = this.props;
        const numChildren = React.Children.count(this.props.children);

        gap = gap || (noGap ? "0" : smallGap ? ".5rem" : "1rem");
        margin = margin || (noMargin ? "0" : smallMargin ? ".5rem" : "1rem");

        return (
            <Container
                margin={margin}
                horizontal={horizontal}
                right={right}
            >
                {React.Children.map(this.props.children, (child, idx) =>
                    <ChildContainer
                        stretch={stretch}
                        equalWidth={equalWidth}
                        padding={this.getPadding(idx, numChildren, gap, horizontal)}
                    >
                        {childProps ? React.cloneElement(child, childProps) : child}
                    </ChildContainer>
                )}
            </Container>
        )
    };
}