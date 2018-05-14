import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const LabelContainer = styled.div`
   display: flex;
   align-items: center;
   flex-direction: ${props => (props.right ? 'row-reverse' : 'row')};
   justify-content: ${props => (props.apart ? 'space-between' : 'flex-start')};
   width: ${props => (props.apart ? '100%' : 'inherit')};
   padding: ${props => props.padding || '0'};
   ${props => props.theme.Label.Container};
`;

const Icon = styled.span.attrs({
   className: props => props.name
})`
    margin: ${props => (props.right ? '0 0 0 .5rem' : '0 .5rem 0 0')};
    ${props => props.theme.Label.IconComponent}    
`;

export class Label extends React.Component {
   static propTypes = {
      right: PropTypes.bool,
      apart: PropTypes.bool,
      icon: PropTypes.object,
      padding: PropTypes.string
   };

   static componentTypes = {
      LabelContainer,
      IconComponent: Icon
   };

   render() {
      const [ LabelContainer, Icon ] = utils.resolveComponents(Label, this.props);
      const { right, apart, name, icon, padding, style, children } = this.props;
      return (
         <LabelContainer right={right} apart={apart} padding={padding} style={style}>
            {icon ? icon : name ? <Icon name={name} right={right} /> : null}
            {children}
         </LabelContainer>
      );
   }
}
