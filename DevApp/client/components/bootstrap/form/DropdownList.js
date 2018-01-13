import React from 'react';
import { PropTypes } from 'prop-types';
import { Label, Input } from 'reactstrap';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../../VMContext';

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

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.state[props.id];
        let attrs = this.context.getPropAttributes(props.id);
        let options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        let label = attrs.label || props.label;
        return (
            <FieldPanel horizontal={props.horizontal}>
                {label ? <Label for={`${vmId}.${props.id}`}>{label}</Label> : null}
                <Input
                    id={`${vmId}.${props.id}`}
                    type="select"
                    value={value}
                    onChange={this.handleChange}
                >
                    {options}
                </Input>
            </FieldPanel>
        )
    }
};

DropdownList.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};

DropdownList.contextTypes = ContextTypes;