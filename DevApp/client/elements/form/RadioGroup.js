import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

const GroupContainer = styled.section`
    ${props => props.theme.Radio.GroupContainer}
`;

const PlainTextComponent = props => props.children;

export class RadioGroup extends React.Component {

   static contextTypes = ContextTypes;

   static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      horizontal: PropTypes.bool,
      plainText: PropTypes.bool
   }

   static componentTypes = {
      Container: FieldPanel,
      GroupContainer,
      RadioContainer: undefined,
      LabelComponent: undefined,
      InputComponent: undefined,
      PlainTextComponent
   }

   constructor(props) {
      super(props);
   }

   get vmInput() {
      return utils.getVMInput(this);
   }

   handleChange = (event) => {
      let value = event.target.value;
      value = this.valueType == "number" ? parseInt(value) : value;
      this.vmInput.dispatch(value);
   }
   render() {
      const [Container, GroupContainer, RadioContainer, Label, Input, PlainText] = utils.resolveComponents(RadioGroup, this.props);
      const { id, value, attrs } = this.vmInput.props;
      this.valueType = typeof value;

      let { label, options, right, horizontal, plainText } = this.props;
      label = label || attrs.label;
      options = (options || attrs.options || []).map(opt => utils.toCamelCase(opt));
      plainText = utils.bool(plainText, attrs.plainText);

      const radio = options.map(opt => (
         <RadioContainer key={opt.key} id={id} checked={opt.key == value}>
            <Label>
               <Input type="radio" name={id} value={opt.key} checked={opt.key == value} onChange={this.handleChange} />
               {opt.value}
            </Label>
         </RadioContainer>
      ));

      const selected = options.filter(opt => opt.key == value).shift();
      const plainTextValue = selected ? selected.value : "";

      return (
         <Container id={id} label={label} horizontal={horizontal} right={right} plainText={plainText}>
            {plainText ? <PlainText>{plainTextValue}</PlainText> : <GroupContainer>{radio}</GroupContainer>}
         </Container>
      );
   }
}