import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../../VMContext';

export class CheckboxGroup extends React.Component {

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
        if (!this.context.state)
            return null;

        let vmId = this.context.vmId;
        let props = this.props;
        let values = this.context.state[props.id] || [];
        let attrs = this.context.getPropAttributes(props.id);
        let label = attrs.label || props.label;
        let checkboxes = (attrs.options || []).map(opt => (
            <FormGroup check key={opt.Key} inline={props.inline}>
                <Label check id={`${vmId}.${props.id}`}>
                    <Input type="checkbox" value={opt.Key} checked={values.includes(opt.Key)} onChange={this.handleChange} />
                    {opt.Value}
                </Label>
            </FormGroup>
        ));

        return (
            <FieldPanel horizontal={props.horizontal}>
                {label ? <Label for={props.id}>{label}</Label> : null}
                <section>{checkboxes}</section>
            </FieldPanel>
        );
    }
};

CheckboxGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};

CheckboxGroup.contextTypes = ContextTypes;