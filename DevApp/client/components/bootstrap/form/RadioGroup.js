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
        let _Container = this.props.container || FieldPanel;   
        let _Label = this.props.labelComponent || Label;   
        let _RadioLabel = this.props.radioLabelComponent || Label;

        let vmId = this.context.vmId;
        let props = this.props;
        let value = this.context.getState(props.id);
        let attrs = this.context.getPropAttributes(props.id);
        let label = attrs.label || props.label;
        let radio = (attrs.options || []).map(opt => (
            <FormGroup check key={opt.Key} id={`${vmId}.${props.id}`}>
                <_RadioLabel check>
                    <Input type="radio" name={`${vmId}.${props.id}`} value={opt.Key} checked={opt.Key == value} onChange={this.handleChange} />
                    {opt.Value}
                </_RadioLabel>
            </FormGroup>
        ));

        return (
            <_Container horizontal={props.horizontal}>
                {label ? <_Label for={props.id}>{label}</_Label> : null}
                <section>{radio}</section>
            </_Container>
        );
    }
};

RadioGroup.contextTypes = ContextTypes;

RadioGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
};