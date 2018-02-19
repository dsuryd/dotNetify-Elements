import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

const GroupContainer = styled.section`
    ${props => props.theme.Radio.GroupContainer}
`;

export class RadioGroup extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool
    }

    static componentTypes = {
        Container: FieldPanel,
        GroupContainer,
        RadioContainer: undefined,
        LabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    handleChange = (event) => this.vmInput.dispatch(event.target.value);

    render() {
        const [Container, GroupContainer, RadioContainer, Label, Input] = utils.resolveComponents(RadioGroup, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const label = attrs.label || this.props.label;
        const radio = (attrs.options || []).map(opt => (
            <RadioContainer key={opt.Key} id={id} checked={opt.Key == value}>
                <Label>
                    <Input type="radio" name={id} value={opt.Key} checked={opt.Key == value} onChange={this.handleChange} />
                    {opt.Value}
                </Label>
            </RadioContainer>
        ));

        return (
            <Container id={id} label={label} horizontal={this.props.horizontal}>
                <GroupContainer>{radio}</GroupContainer>
            </Container>
        );
    }
}