import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

const PlainTextComponent = props => props.children;

export class DropdownList extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        horizontal: PropTypes.bool,
        plainText: PropTypes.bool,
        prefix: PropTypes.any,
        suffix: PropTypes.any,
    }

    static componentTypes = {
        Container: FieldPanel,
        InputComponent: undefined,
        InputGroupComponent: undefined,
        PlainTextComponent
    }

    constructor(props) {
        super(props);
    }

    get vmInput() {
        return utils.getVMInput(this);
    }

    handleChange = (event) => this.vmInput.dispatch(event.target.value);

    render() {
        const [Container, Input, InputGroup, PlainText] = utils.resolveComponents(DropdownList, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const options = (attrs.options || []).map(opt => <option key={opt.Key} value={opt.Key}>{opt.Value}</option>);
        let { label, plainText, prefix, suffix, horizontal, ...props } = this.props;
        label = attrs.label || label;
        prefix = attrs.prefix || prefix;
        suffix = attrs.suffix || suffix;

        const selected = attrs.options.filter(opt => opt.Key === value).shift();
        const plainTextValue = selected ? selected.Value : "";

        return (
            <Container id={id} label={label} horizontal={horizontal} plainText={plainText}>
                {plainText ? <PlainText>{plainTextValue}</PlainText> :
                    <InputGroup prefix={prefix} suffix={suffix}>
                        <Input
                            id={id}
                            type="select"
                            value={value}
                            prefix={prefix}
                            suffix={suffix}
                            onChange={this.handleChange}
                        >
                            {options}
                        </Input>
                    </InputGroup>
                }
            </Container>
        )
    }
}