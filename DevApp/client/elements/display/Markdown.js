import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';

const ContainerComponent = styled.div``;

export class Markdown extends Element {
   static propTypes = {
      id: PropTypes.string
   };

   static componentTypes = {
      ContainerComponent: ContainerComponent
   };

   render() {
      const [ Container ] = this.resolveComponents(Markdown);
      const { fullId, children, ...props } = this.attrs;

      const _children = React.Children.toArray(children);

      let markdowns = [];
      this.value.split('[inset]').forEach((section, idx) => {
         markdowns.push(utils.markdown(section));
         idx < _children.length && markdowns.push(_children[idx]);
      });
      return (
         <Container id={fullId} className="markdown" {...props}>
            {markdowns.map((section, idx) => <React.Fragment key={idx}>{section}</React.Fragment>)}
         </Container>
      );
   }
}

export const MarkdownText = props => utils.markdown(props.text);
