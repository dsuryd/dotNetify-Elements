import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../../VMContext';

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

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.state[props.id];
        let attrs = this.context.getPropAttributes(props.id);
        let label = attrs.label || props.label;
        let radio = (attrs.options || []).map(opt => (
            <FormGroup check key={opt.Key} id={`${vmId}.${props.id}`}>
                <Label check>
                    <Input type="radio" name={`${vmId}.${props.id}`} value={opt.Key} checked={opt.Key == value} onChange={this.handleChange} />
                    {opt.Value}
                </Label>
            </FormGroup>
        ));

        return (
            <FieldPanel horizontal={props.horizontal}>
                {label ? <Label for={props.id}>{label}</Label> : null}
                <section>{radio}</section>
            </FieldPanel>
        );
    }
};

RadioGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};

RadioGroup.contextTypes = ContextTypes;