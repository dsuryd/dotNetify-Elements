import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class RadioGroup extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }

    static componentTypes = {
        Container: FieldPanel,
        LabelComponent: undefined,
        RadioContainer: undefined,
        RadioLabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.context.setState({ [this.props.id]: value });
        this.context.dispatchState({ [this.props.id]: value });
    }

    render() {
        const [Container, Label, RadioContainer, RadioLabel, Input] = utils.resolveComponents(RadioGroup, this.props);

        const vmId = this.context.vmId;
        const props = this.props;
        const value = this.context.getState(props.id);
        const attrs = this.context.getPropAttributes(props.id);
        const label = attrs.label || props.label;

        const radio = (attrs.options || []).map(opt => (
            <RadioContainer check key={opt.Key} id={`${vmId}.${props.id}`}>
                <RadioLabel check>
                    <Input type="radio" name={`${vmId}.${props.id}`} value={opt.Key} checked={opt.Key == value} onChange={this.handleChange} />
                    {opt.Value}
                </RadioLabel>
            </RadioContainer>
        ));

        return (
            <Container horizontal={props.horizontal}>
                {label ? <Label for={props.id}>{label}</Label> : null}
                <section>{radio}</section>
            </Container>
        );
    }
}