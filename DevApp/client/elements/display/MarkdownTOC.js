import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';

const ContainerComponent = styled.div`
   white-space: nowrap;
   ${props => props.theme.MarkdownTOC.Container};
`;

const ItemContainerComponent = styled.p`${props => (props.isSelected ? props.theme.MarkdownTOC.Selected : '')};`;

export class MarkdownTOC extends Element {
   static propTypes = {
      id: PropTypes.string.isRequired
   };

   static componentTypes = {
      ContainerComponent,
      ItemContainerComponent
   };

   state = { headers: [], selected: null };

   componentWillMount() {
      this.setState({ headers: this.getHeaders() });
   }

   componentDidMount() {
      this.detectScrolledHeader();
   }

   detectScrolledHeader() {
      const markdown = document.getElementById(this.attrs.id).parentElement;
      if (markdown)
         markdown.addEventListener('scroll', e => {
            console.log(document.documentElement.scrollTop);
         });
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

   render() {
      const { selected } = this.state;
      const [ Container, ItemContainer ] = this.resolveComponents(MarkdownTOC);
      const { fullId, ...props } = this.attrs;

      const select = key => {
         document.querySelector(key).scrollIntoView({ behavior: 'smooth' });
         this.setState({ selected: key });
      };

      return (
         <Container id={fullId} {...props}>
            {this.state.headers.map(header => (
               <ItemContainer
                  key={header.link}
                  isSelected={selected === header.link}
                  onClick={_ => select(header.link)}
               >
                  <a href="javascript:void(0)">{header.title}</a>
               </ItemContainer>
            ))}
         </Container>
      );
   }
}
