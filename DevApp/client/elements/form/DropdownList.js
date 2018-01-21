import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import { VMInput } from '../VMInput';
import * as utils from '../utils';

export class DropdownList extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }

    static componentTypes = {
        Container: FieldPanel,
        LabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.vmInput = new VMInput(this.context, this.props.id);
    }

    handleChange = (event) =>this.vmInput.value = event.target.value;

    render() {
        const [Container, Label, Input] = utils.resolveComponents(DropdownList, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        const label = attrs.label || this.props.label;

        return (
            <Container horizontal={this.props.horizontal}>
                {label ? <Label for={id}>{label}</Label> : null}
                <Input
                    id={id}
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