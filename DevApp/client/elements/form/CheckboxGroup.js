import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import Element from '../Element';
import * as utils from '../utils';

const GroupContainer = styled.section`
    ${props => props.theme.Checkbox.GroupContainer}
`;

const PlainTextComponent = props => React.Children.toArray(props.children).join(", ");

export class CheckboxGroup extends Element {

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool,
        plainText: PropTypes.bool,
        inline: PropTypes.bool
    }

    static componentTypes = {
        Container: FieldPanel,
        GroupContainer,
        CheckboxContainer: undefined,
        LabelComponent: undefined,
        InputComponent: undefined,
        PlainTextComponent
    }

    handleChange = (event) => {
        let values = this.vmInput.value || [];
        values = event.target.checked ? values.concat([event.target.value]) : values.filter(value => value != event.target.value);
        this.vmInput.dispatch(values);
    }

    render() {
        const [Container, GroupContainer, CheckboxContainer, Label, Input, PlainText] = utils.resolveComponents(CheckboxGroup, this.props);
        const { id, value, attrs } = this.vmInput.props;

        let { label, plainText, inline, horizontal } = this.props;
        const values = value || [];
        label = label || attrs.label;
        plainText = utils.bool(plainText, attrs.plainText);

        const checkboxes = (attrs.options || []).map(opt => (
            <CheckboxContainer key={opt.Key} inline={inline} checked={values.includes(opt.Key)}>
                <Label>
                    <Input type="checkbox" value={opt.Key} checked={values.includes(opt.Key)} onChange={this.handleChange} />
                    {opt.Value}
                </Label>
            </CheckboxContainer>
        ));

        const selected = attrs.options.filter(opt => value.includes(opt.Key));
        const plainTextValue = selected.map(x => x.Value);

        return (
            <Container id={id} label={label} horizontal={horizontal} plainText={plainText}>
                {plainText ? <PlainText>{plainTextValue}</PlainText> : <GroupContainer id={id}>{checkboxes}</GroupContainer>}
            </Container>
        );
    }
}