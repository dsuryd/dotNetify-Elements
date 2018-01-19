import React from 'react';
import { PropTypes } from 'prop-types';
import { Label, Input } from 'reactstrap';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../../VMContext';
import * as utils from '../../utils';

export class DropdownList extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }

    static componentTypes = {
        Container: FieldPanel,
        LabelComponent: Label,
        InputComponent: Input
    }

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.context.setState({ [this.props.id]: value });
        this.context.dispatchState({ [this.props.id]: value });
    }

    render() {
        const [Container, Label, Input] = utils.resolveComponents(DropdownList, this.props);

        const vmId = this.context.vmId;
        const props = this.props;
        const value = this.context.getState(props.id);
        const attrs = this.context.getPropAttributes(props.id);
        const options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        const label = attrs.label || props.label;

        return (
            <Container horizontal={props.horizontal}>
                {label ? <Label for={`${vmId}.${props.id}`}>{label}</Label> : null}
                <Input
                    id={`${vmId}.${props.id}`}
                    type="select"
                    value={value}
                    onChange={this.handleChange}
                >
                    {options}
                </Input>
            </Container>
        )
    }
}