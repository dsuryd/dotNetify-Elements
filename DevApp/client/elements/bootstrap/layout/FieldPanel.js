import React from 'react';
import styled from 'styled-components';
import * as utils from '../../utils';

const Container = styled.div`
    display: grid;
    grid-template-columns: ${prop => prop.horizontal ? '1fr 4fr' : '1fr'};
    -ms-user-select: none; 
    user-select: none; 
`;

export class FieldPanel extends React.Component {

    static componentTypes = {
        Container
    }

    render() {
        const [Container] = utils.resolveComponents(FieldPanel, this.props);
        return (
            <Container {...this.props}>
                {this.props.children}
            </Container>
        )
    };
}