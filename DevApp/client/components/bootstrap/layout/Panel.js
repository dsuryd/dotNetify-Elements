import React from 'react';
import styled from 'styled-components';

const getFlexDirection = props => props.horizontal ? 'row' : 'column';
const getFlexBasis = props => props.equalWidth ? '0' : 'auto';
const getPadding = props => props.noPadding ? '0' : props.smallPadding ? '.25rem' : '.5rem';

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-basis: ${getFlexBasis};
    flex-direction: ${getFlexDirection};
    border-style: solid;
    border-color: transparent;
    border-width: ${getPadding};
`;

const ChildContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-basis: ${getFlexBasis};    
    flex-direction: column;
    border-style: solid;
    border-color: transparent;
    border-width: ${getPadding};
`;

export class Panel extends React.Component {

    render() {
        let { equalWidth, ...props } = this.props;
        let childProps = this.props;
        return (
        <Container {...props}>
            {React.Children.map(props.children, child => 
                <ChildContainer {...childProps}>{child}</ChildContainer>
            )}
        </Container>
    )};
}