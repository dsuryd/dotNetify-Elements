import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: ${prop => prop.horizontal ? '1fr 4fr' : '1fr'};
    -ms-user-select: none; 
    user-select: none; 
`;

export class FormField extends React.Component {

    render() {
        let props = this.props;
        return (
            <Container {...props}>
                {props.children}
            </Container>
        )
    };
}