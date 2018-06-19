import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Label } from '../display/Label';
import * as utils from '../utils';

const Container = styled.div`
   display: grid;
   ${props => (props.horizontal ? 'display: -ms-grid' : '')};
   grid-template-columns: ${props => (props.horizontal ? '1fr 4fr' : '1fr')};
   -ms-grid-columns: ${props => (props.horizontal ? '1fr 4fr' : '1fr')};
   -ms-user-select: none;
   user-select: none;
   ${props => (props.width ? 'width: ' + props.width : '')};
   ${props => props.theme.Field.Container};
   ${props => props.css};
`;

const LabelContainer = styled.div`
   display: flex;
   -ms-grid-column: 1;
   align-items: flex-start;
   padding-top: ${props => (props.horizontal ? '.4rem' : '0')};
   padding-right: 1rem;
   ${props => props.theme.Field.LabelContainer};
`;

const InputContainer = styled.div`
   width: calc(100% - 1px);
   ${props => (props.horizontal ? '-ms-grid-column: 2' : '')};
   ${props => (props.right ? `display: flex; justify-content: flex-end;` : null)};
   ${props => props.theme.Field.InputContainer};
`;

const PlainTextContainer = styled.div`
   ${props => (props.horizontal ? '-ms-grid-column: 2' : '')};
   ${props => props.theme.Field.PlainTextContainer};
`;

const ValidationMessageContainer = styled.div`
   display: flex;
   flex-direction: column;
   grid-column: ${props => (props.horizontal ? '2' : '1')};
   -ms-grid-column: ${props => (props.horizontal ? '2' : '1')};
   ${props => props.theme.Field.ValidationMessageContainer};
`;

export class Field extends React.Component {
   static propTypes = {
      // Id to associate the label with the input element.
      id: PropTypes.string,

      // Style in css format.
      css: PropTypes.string,

      // Displays the label text horizontally to the left of the input.
      horizontal: PropTypes.bool,

      // Text or component for the field's label.
      label: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

      // Use plain text container.
      plainText: PropTypes.bool,

      // Right-align the input element.
      right: PropTypes.bool,

      // Sets custom width.
      width: PropTypes.string
   };

   static componentTypes = {
      Container,
      LabelContainer,
      LabelComponent: Label,
      InputContainer,
      PlainTextContainer,
      PlainTextComponent: undefined,
      ValidationMessageContainer
   };

   render() {
      const [
         Container,
         LabelContainer,
         Label,
         InputContainer,
         PlainTextContainer,
         PlainText,
         ValidationMessageContainer
      ] = utils.resolveComponents(Field, this.props);
      const { id, label, plainText, horizontal, right, width, style, css, ...props } = this.props;
      const labelPadding = horizontal ? null : '0 0 .5rem 0';

      const [ validationMessages, children ] = utils.filterChildren(
         this.props.children,
         child => child.key && child.key.startsWith(validationKeyPrefix)
      );

      return (
         <Container width={width} style={style} css={css} horizontal={horizontal}>
            <LabelContainer horizontal={horizontal}>
               {label ? (
                  <Label for={id} padding={labelPadding}>
                     {label}
                  </Label>
               ) : null}
            </LabelContainer>
            {plainText ? (
               <PlainTextContainer horizontal={horizontal}>
                  <PlainText>{children}</PlainText>
               </PlainTextContainer>
            ) : (
               <React.Fragment>
                  <InputContainer right={right} horizontal={horizontal}>
                     {children}
                  </InputContainer>
                  <ValidationMessageContainer horizontal={horizontal}>{validationMessages}</ValidationMessageContainer>
               </React.Fragment>
            )}
         </Container>
      );
   }
}

export const validationKeyPrefix = 'validationMsg';
