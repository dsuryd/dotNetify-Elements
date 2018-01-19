import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../../VMContext';
import * as utils from '../../utils';

export class CheckboxGroup extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }

    static componentTypes = {
        Container: FieldPanel,
        LabelComponent: Label,
        CheckboxContainer: FormGroup,
        CheckboxLabelComponent: Label,
        InputComponent: Input
    }

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        let values = this.context.state[this.props.id] || [];
        values = event.target.checked ? values.concat([event.target.value]) : values.filter(value => value != event.target.value);
        this.context.setState({ [this.props.id]: values });
        this.context.dispatchState({ [this.props.id]: values });
    }

    render() {
        const [Container, Label, CheckboxContainer, CheckboxLabel, Input] = utils.resolveComponents(CheckboxGroup, this.props);

        const vmId = this.context.vmId;
        const props = this.props;
        const values = this.context.getState(props.id) || [];
        const attrs = this.context.getPropAttributes(props.id);
        const label = attrs.label || props.label;

        const checkboxes = (attrs.options || []).map(opt => (
            <CheckboxContainer check key={opt.Key} inline={props.inline}>
                <CheckboxLabel check id={`${vmId}.${props.id}`}>
                    <Input type="checkbox" value={opt.Key} checked={values.includes(opt.Key)} onChange={this.handleChange} />
                    {opt.Value}
                </CheckboxLabel>
            </CheckboxContainer>
        ));

        return (
            <Container horizontal={props.horizontal}>
                {label ? <Label for={props.id}>{label}</Label> : null}
                <section>{checkboxes}</section>
            </Container>
        );
    }
}