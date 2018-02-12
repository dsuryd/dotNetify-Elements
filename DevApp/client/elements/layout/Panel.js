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
    ${props => props.theme.Panel.Container}
`;

const ChildContainer = styled.div`
    padding: ${props => props.padding};
    flex-grow: ${props => props.stretch ? '1' : '0'};
    flex-basis: ${props => props.equalWidth ? '0' : 'auto'};
    ${props => props.theme.Panel.ChildContainer}
`;

export class Panel extends React.Component {

    static contextTypes = {
        theme: PropTypes.object
    }

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
        onShow: PropTypes.func
    }

    static defaultProps = {
        noMargin: true
    }

    static componentTypes = {
        Container,
        ChildContainer
    }

    get numChildren() {
        return React.Children.count(this.props.children);
    }

    constructor(props) {
        super(props);
        this.state = { showChildren: new Array(this.numChildren).fill(true) };
    }

    getPadding(idx, gap, horizontal) {
        let padding = horizontal ? `0 0 0 ${gap}` : `${gap} 0 0 0`;
        return idx > 0 ? padding : 0;
    }

    getStyle = idx => {
        const showChild = this.state.showChildren[idx] !== false;
        return !showChild ? { display: 'none' } : null;
    }

    handleShow = (idx, show) => {
        setTimeout(() => {
            let showChildren = this.state.showChildren;
            if (showChildren[idx] !== show) {
                showChildren[idx] = show;
                this.setState({ showChildren });
            }
        }, 1);
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
        let _margin = margin || (noMargin ? "0" : smallMargin ? "1rem" : "1.5rem");

        return (
            <Container
                margin={_margin}
                horizontal={horizontal}
                right={right}
                width={width}
                height={height}
            >
                {React.Children.map(this.props.children, (child, idx) =>
                    <ChildContainer key={idx}
                        style={this.getStyle(idx)}
                        stretch={stretch}
                        equalWidth={equalWidth}
                        padding={this.numChildren <= 1 ? 0 : this.getPadding(idx, _gap, horizontal)}
                    >
                        {React.cloneElement(child, utils.mergeProps(child, childProps, { onShow: show => this.handleShow(idx, show) }))}
                    </ChildContainer>
                )}
            </Container>
        )
    };
}