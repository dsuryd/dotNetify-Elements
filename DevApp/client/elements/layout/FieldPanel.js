import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
    display: grid;
    grid-template-columns: ${props => props.horizontal ? '1fr 4fr' : '1fr'};
    -ms-user-select: none; 
    user-select: none; 
`;

const InputContainer = styled.div`
    width: calc(100% - 1px);
  }    
`;

const ValidationMessageContainer = styled.div`
    color: ${props => props.theme.validationError};
    grid-column: ${props => props.horizontal ? '2' : '1'};
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
        InputContainer,
        ValidationMessageContainer
    }

    render() {
        const [Container, Label, InputContainer, ValidationMessageContainer] = utils.resolveComponents(FieldPanel, this.props);
        const { id, label, horizontal, ...props } = this.props;

        const [validationMessages, children] = utils.filterChildren(this.props.children, child => child.key && child.key.startsWith("validationMessage"));
        return (
            <Container horizontal={horizontal}>
                {label ? <Label for={id}>{label}</Label> : null}
                <InputContainer>
                    {children}
                </InputContainer>
                <ValidationMessageContainer horizontal={horizontal}>
                    {validationMessages}
                </ValidationMessageContainer>
            </Container>
        )
    };
}