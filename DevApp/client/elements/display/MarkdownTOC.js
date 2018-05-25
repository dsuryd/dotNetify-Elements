import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';

const ContainerComponent = styled.div`white-space: nowrap;`;

export class MarkdownTOC extends Element {
   static propTypes = {
      id: PropTypes.string.isRequired
   };

   static componentTypes = {
      ContainerComponent: ContainerComponent
   };

   state = { headers: [] };

   componentWillMount() {
      this.setState({ headers: this.getHeaders() });
   }

   getHeaders() {
      let m,
         headers = [];
      const regex = /(#+) (.+)/gm;
      while ((m = regex.exec(this.value)) !== null) {
         // This is necessary to avoid infinite loops with zero-width matches
         if (m.index === regex.lastIndex) regex.lastIndex++;
         headers.push({ level: m[1].length, title: m[2], link: '#' + m[2].split(' ').join('-').toLowerCase() });
      }
      return headers;
   }

   scrollTo(id) {
      document.querySelector(id).scrollIntoView({
         behavior: 'smooth'
      });
   }

   render() {
      const [ Container ] = this.resolveComponents(MarkdownTOC);
      const { fullId, ...props } = this.attrs;

      return (
         <Container id={fullId} {...props}>
            {this.state.headers.map(header => (
               <p key={header.link} onClick={_ => this.scrollTo(header.link)}>
                  <a href="javascript:void(0)">{header.title}</a>
               </p>
            ))}
         </Container>
      );
   }
}
