import React from 'react';
import { PropTypes } from 'prop-types';
import { DropdownList } from './DropdownList';
import { Field } from '../structure/Field';
import { InputElement } from '../core/Element';

const PlainTextComponent = props => <span {...props}>{React.Children.toArray(props.children).join(', ')}</span>;

export class MultiselectList extends InputElement {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Disables the field.
      disable: PropTypes.bool,

      // Displays the label text horizontally to the left of the field.      
      horizontal: PropTypes.bool,

      // Text or component for the field's label.      
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Replaces the input field with plain text.
      plainText: PropTypes.bool,
   };

   static componentTypes = {
      Container: Field,
      InputComponent: undefined,
      TagComponent: undefined,
      ItemComponent: undefined,
      ListComponent: undefined,
      PlainTextComponent
   };

   handleChange = value => this.dispatch(value.map(val => val.Key));

   render() {
      const [ Container, Input, Tag, Item, List, PlainText ] = this.resolveComponents(MultiselectList);
      const { fullId, label, plainText, options, horizontal, disable, style, ...props } = this.attrs;


      const values = this.value ? this.value.map( x => `${x}`) : [];
      const selected = (options || []).filter(opt => values.includes(opt.Key));
      const plainTextValue = selected.map(x => x.Value);

      return (
         <Container id={fullId} label={label} horizontal={horizontal} plainText={plainText} style={style}>
            {plainText ? (
               <PlainText>{plainTextValue}</PlainText>
            ) : (
               <Input
                  id={fullId}
                  value={values}
                  data={options}
                  valueField="Key"
                  textField="Value"
                  tagComponent={Tag}
                  itemComponent={Item}
                  listComponent={List}
                  disabled={disable}
                  onChange={this.handleChange}
                  {...props}
               />
            )}
         </Container>
      );
   }
}
