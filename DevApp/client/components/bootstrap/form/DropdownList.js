import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import { ContextTypes } from '../../core/VMContext';

export class DropdownList extends React.Component {

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
        let options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        let label = attrs.label || props.label;
        return (
            <FormGroup>
                {label ? <Label for={props.id}>{label}</Label> : null}
                <Input
                    id={props.id}
                    type="select"
                    value={value}
                    onChange={this.handleChange}
                >
                    {options}
                </Input>
            </FormGroup>
        )
    }
};

DropdownList.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};

DropdownList.contextTypes = ContextTypes;