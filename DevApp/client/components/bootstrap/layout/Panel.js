import React from 'react';
import styled from 'styled-components';

const getFlexDirection = props => props.horizontal ? 'row' : 'column';
const getFlexBasis = props => props.flexBasis || 'auto';

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-basis: ${getFlexBasis};
    flex-direction: ${getFlexDirection};
    border-style: solid;
    border-color: transparent;
    border-width: ${props => props.padding || '.5rem'};
`;

export class Panel extends React.Component {

    render() {
        console.log(this.props);
        let props = this.props;
        return (
        <Container {...props}>
            {React.Children.map(props.children, child => 
                props.equalWidth ? React.cloneElement(child, {flexBasis: '0'}) : child
            )}
        </Container>
    )};
}