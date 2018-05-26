import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';

const ContainerComponent = styled.div`${props => props.theme.Markdown};`;

export class Markdown extends Element {
   static propTypes = {
      id: PropTypes.string.isRequired
   };

   static componentTypes = {
      ContainerComponent: ContainerComponent
   };

   render() {
      const [ Container ] = this.resolveComponents(Markdown);
      const { id, fullId, children, ...props } = this.attrs;

      const _children = React.Children.toArray(children);

      let markdowns = [];
      if (this.value)
         this.value.split('[inset]').forEach((section, idx) => {
            markdowns.push(section);
            idx < _children.length && markdowns.push(_children[idx]);
         });

      const markdown = section => (typeof section == 'string' ? <MarkdownText text={section} /> : section);

      return (
         <Container id={fullId} className="markdown" {...props}>
            {markdowns.map((section, idx) => <React.Fragment key={idx}>{markdown(section)}</React.Fragment>)}
         </Container>
      );
   }
}

export const MarkdownText = props => utils.markdown(props.text);
