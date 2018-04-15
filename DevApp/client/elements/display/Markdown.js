import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../Element';
import * as utils from '../utils';

const MarkdownComponent = styled.div``;

export class Markdown extends Element {
   static propTypes = {
      id: PropTypes.string
   };

   static componentTypes = {
      MarkdownComponent: MarkdownComponent
   };

   render() {
      const [ _Markdown ] = this.resolveComponents(Markdown);
      const { fullId, children, ...props } = this.attrs;

      return (
         <_Markdown id={fullId} {...props}>
            {utils.markdown(this.value) || children}
         </_Markdown>
      );
   }
}
