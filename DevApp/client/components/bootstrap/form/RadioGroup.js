import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import { ContextTypes } from '../../core/VMContext';

export class RadioGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        let value = event.target.value;
        this.context.setState({ [this.props.id]: value });
        this.context.dispatchState({ [this.props.id]: value });
    }    

    render() {
        if (!this.context.state)
            return null;

        let props = this.props;
        let value = this.context.state[props.id];
        let attrs = this.context.getPropAttributes(props.id);
        let label = attrs.label || props.label;
        let radio = (attrs.options || []).map(opt => (
            <FormGroup check key={opt.Key}>
                <Label check>
                    <Input type="radio" name={props.id} value={opt.Key} checked={opt.Key == value} onChange={this.handleChange} />
                    {opt.Value}
                </Label>
            </FormGroup>
        ));

        return (
            <FormGroup tag="fieldset">
                {label ? <Label for={props.id}>{label}</Label> : null}
                {radio}
            </FormGroup>
        );
    }
};

RadioGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};

RadioGroup.contextTypes = ContextTypes;