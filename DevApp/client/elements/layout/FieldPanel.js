import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Label } from '../display/Label';
import * as utils from '../utils';

const Container = styled.div`
    display: grid;
    grid-template-columns: ${props => props.horizontal ? '1fr 4fr' : '1fr'};
    -ms-user-select: none; 
    user-select: none; 
`;

const LabelContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const InputContainer = styled.div`
    width: calc(100% - 1px);
`;

const ValidationMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
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
        LabelContainer,
        LabelComponent: Label,
        InputContainer,
        ValidationMessageContainer
    }

    render() {
        const [Container, LabelContainer, Label, InputContainer, ValidationMessageContainer] = utils.resolveComponents(FieldPanel, this.props);
        const { id, label, horizontal, ...props } = this.props;
        const labelPadding = horizontal ? null : "0 0 .5rem 0";

        const [validationMessages, children] = utils.filterChildren(this.props.children, child => child.key && child.key.startsWith("validationMessage"));
        return (
            <Container horizontal={horizontal}>
                <LabelContainer>
                {label ? <Label for={id} padding={labelPadding}>{label}</Label> : null}
                </LabelContainer>
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