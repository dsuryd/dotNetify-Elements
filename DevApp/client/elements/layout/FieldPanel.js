import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
    display: grid;
    grid-template-columns: ${prop => prop.horizontal ? '1fr 4fr' : '1fr'};
    -ms-user-select: none; 
    user-select: none; 
`;

const InputContainer = styled.div`
    width: calc(100% - 1px);
`;

export class FieldPanel extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool
    }

    static componentTypes = {
        Container,
        LabelComponent: undefined,
        InputContainer
    }

    render() {
        const [Container, Label, InputContainer] = utils.resolveComponents(FieldPanel, this.props);
        const { id, label, horizontal, ...props } = this.props;
        return (
            <Container horizontal={horizontal}>
                {label ? <Label for={id}>{label}</Label> : null}
                <InputContainer>
                    {this.props.children}
                </InputContainer>
            </Container>
        )
    };
}