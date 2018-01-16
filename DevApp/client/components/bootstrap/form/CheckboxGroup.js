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
        let _Container = this.props.container || FieldPanel;
        let _Label = this.props.labelComponent || Label;
        let _CheckLabel = this.props.checkLabelComponent || Label;

        let vmId = this.context.vmId;
        let props = this.props;
        let values = this.context.getState(props.id) || [];
        let attrs = this.context.getPropAttributes(props.id);
        let label = attrs.label || props.label;
        let checkboxes = (attrs.options || []).map(opt => (
            <FormGroup check key={opt.Key} inline={props.inline}>
                <_CheckLabel check id={`${vmId}.${props.id}`}>
                    <Input type="checkbox" value={opt.Key} checked={values.includes(opt.Key)} onChange={this.handleChange} />
                    {opt.Value}
                </_CheckLabel>
            </FormGroup>
        ));

        return (
            <_Container horizontal={props.horizontal}>
                {label ? <_Label for={props.id}>{label}</_Label> : null}
                <section>{checkboxes}</section>
            </_Container>
        );
    }
};

CheckboxGroup.contextTypes = ContextTypes;

CheckboxGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};