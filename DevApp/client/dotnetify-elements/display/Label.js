import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';

const LabelContainer = styled.div`
   display: flex;
   align-items: center;
   flex-direction: ${props => (props.right ? 'row-reverse' : 'row')};
   justify-content: ${props => (props.apart ? 'space-between' : 'flex-start')};
   width: ${props => (props.apart ? '100%' : 'inherit')};
   ${props => props.theme.Label.Container};
   ${props => props.css};
`;

const Icon = styled.span.attrs({
   className: props => props.name
})`
    margin: ${props => (props.right ? '0 0 0 .5rem' : '0 .5rem 0 0')};
    ${props => props.theme.Label.IconComponent}    
`;

export class Label extends Element {
   static propTypes = {
      right: PropTypes.bool,
      apart: PropTypes.bool,
      icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
   };

   static componentTypes = {
      LabelContainer,
      IconComponent: Icon
   };

   render() {
      const [ LabelContainer, Icon ] = utils.resolveComponents(Label, this.props);
      const { right, apart, icon, style, css, children } = this.props;
      const _icon = typeof icon === 'string' ? <Icon name={icon} right={right} /> : icon;
      return (
         <LabelContainer right={right} apart={apart} style={style} css={css}>
            {_icon}
            {this.value}
            {children}
         </LabelContainer>
      );
   }
}
