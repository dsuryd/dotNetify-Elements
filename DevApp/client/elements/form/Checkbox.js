import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class Checkbox extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }

    static componentTypes = {
        Container: undefined,
        LabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const value = event.target.checked;
        this.context.setState({ [this.props.id]: value });
        this.context.dispatchState({ [this.props.id]: value });
    }

    render() {
        const [Container, Label, Input] = utils.resolveComponents(Checkbox, this.props);

        const vmId = this.context.vmId;
        const props = this.props;
        const value = this.context.getState(props.id) || false;
        const attrs = this.context.getPropAttributes(props.id);
        const label = attrs.label || props.label;

        return (
            <Container check>
                <Label check>
                    <Input type="checkbox" name={`${vmId}.${props.id}`} checked={value} onChange={this.handleChange} />
                    {label}
                </Label>
            </Container>
        )
    }
}