import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

const ChildContainer = styled.div`
    margin-bottom: 1rem;
`;

export class FormPanel extends React.Component {

    render() {
        let { horizontal, ...props } = this.props;
        return (
        <Container>
            {React.Children.map(props.children, child => 
                <ChildContainer>{React.cloneElement(child, {horizontal: horizontal})}</ChildContainer>
            )}
        </Container>
    )};
}