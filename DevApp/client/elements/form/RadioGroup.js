import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

const GroupContainer = styled.section`
    ${props => props.theme.Radio.GroupContainer}
`;

const PlainTextComponent = props => props.children;

export class RadioGroup extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool,
        plainText: PropTypes.bool
    }

    static componentTypes = {
        Container: FieldPanel,
        GroupContainer,
        RadioContainer: undefined,
        LabelComponent: undefined,
        InputComponent: undefined,
        PlainTextComponent
    }

    constructor(props) {
        super(props);
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    handleChange = (event) => this.vmInput.dispatch(event.target.value);

    render() {
        const [Container, GroupContainer, RadioContainer, Label, Input, PlainText] = utils.resolveComponents(RadioGroup, this.props);
        const { id, value, attrs } = this.vmInput.props;

        let { label, options, right, horizontal, plainText } = this.props;
        label = attrs.label || label;
        options = (attrs.options || options || []).map(opt => utils.toCamelCase(opt));

        const radio = options.map(opt => (
            <RadioContainer key={opt.key} id={id} checked={opt.key == value}>
                <Label>
                    <Input type="radio" name={id} value={opt.key} checked={opt.key == value} onChange={this.handleChange} />
                    {opt.value}
                </Label>
            </RadioContainer>
        ));

        const selected = options.filter(opt => value.includes(opt.Key)).shift();
        const plainTextValue = selected ? selected.Value : "";

        return (
            <Container id={id} label={label} horizontal={horizontal} right={right} plainText={plainText}>
                {plainText ? <PlainText>{plainTextValue}</PlainText> :<GroupContainer>{radio}</GroupContainer>}
            </Container>
        );
    }
}