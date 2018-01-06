import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import { Field } from './Field';
import { ContextTypes } from '../../core/VMContext';

export class Checkbox extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        let value = event.target.checked;
        this.context.setState({ [this.props.id]: value });
        this.context.dispatchState({ [this.props.id]: value });
    }

    render() {
        if (!this.context.state)
            return null;

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.state[props.id];
        let attrs = this.context.getPropAttributes(props.id);
        let label = attrs.label || props.label;
        return (
            <Field>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name={`${vmId}.${props.id}`} checked={value === true} onChange={this.handleChange} />
                        {label}
                    </Label>
                </FormGroup>
            </Field>
        )
    }
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};

Checkbox.contextTypes = ContextTypes;