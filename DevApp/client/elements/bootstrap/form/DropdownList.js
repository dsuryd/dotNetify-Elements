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
        let _Container = this.props.container || FieldPanel;
        let _Label = this.props.labelComponent || Label;  

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.getState(props.id);
        let attrs = this.context.getPropAttributes(props.id);
        let options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        let label = attrs.label || props.label;
        return (
            <_Container horizontal={props.horizontal}>
                {label ? <_Label for={`${vmId}.${props.id}`}>{label}</_Label> : null}
                <Input
                    id={`${vmId}.${props.id}`}
                    type="select"
                    value={value}
                    onChange={this.handleChange}
                >
                    {options}
                </Input>
            </_Container>
        )
    }
};

DropdownList.contextTypes = ContextTypes;

DropdownList.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};