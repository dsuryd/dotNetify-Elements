import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';
import createWebComponent from '../utils/web-component';

const ContainerComponent = styled.div`
   white-space: nowrap;
   ${props => props.theme.MarkdownTOC.Container};
`;

const ItemContainerComponent = styled.p`${props => (props.isSelected ? props.theme.MarkdownTOC.Selected : '')};`;

ContainerComponent.defaultProps = { theme: utils.getDefaultTheme() };
ItemContainerComponent.defaultProps = { theme: utils.getDefaultTheme() };

export class MarkdownTOC extends Element {
   static propTypes = {
      id: PropTypes.string.isRequired
   };

   static componentTypes = {
      ContainerComponent,
      ItemContainerComponent
   };

   state = { selected: null };

   componentDidMount() {
      this.addScrollEventListener();
   }

   componentWillUnmount() {
      this.removeScrollEventListener();
   }

   addScrollEventListener() {
      // Find scroll position for all headers.
      const headerPos = this.getHeaders()
         .map(header => {
            const elem = document.querySelector(header.link);
            return elem ? { link: header.link, pos: elem.offsetTop } : null;
         })
         .filter(x => x);

      this.handleScroll = (e => {
         if (this.scrollingIntoView || this.removingListener) return;
         if (e.target.querySelector(`[id="${this.attrs.fullId}"]`) === null) return;

         // Find the closest header with current scroll position.
         const relativePos = headerPos.map(header => ({ link: header.link, pos: Math.abs(header.pos - e.target.scrollTop) }));
         const min = Math.min.apply(Math, relativePos.map(x => x.pos));
         const nearest = relativePos.filter(x => x.pos === min).shift();
         if (nearest) this.setState({ selected: nearest.link });
      }).bind(this);

      document.addEventListener('scroll', this.handleScroll, true);
   }

   getHeaders() {
      let m;
      let headers = [];
      const regex = /^(#+) (.+)/gm;

      // Parse the markdown document for headers.
      while ((m = regex.exec(this.value)) !== null) {
         // This is necessary to avoid infinite loops with zero-width matches
         if (m.index === regex.lastIndex) regex.lastIndex++;
         headers.push({ level: m[1].length, title: m[2], link: '#' + m[2].split(' ').join('-').split('.').join('-').toLowerCase() });
      }
      return headers;
   }

   removeScrollEventListener() {
      this.removingListener = true;
      this.handleScroll && document.removeEventListener('scroll', this.handleScroll);
      this.handleScroll = null;
   }

   render() {
      const { selected } = this.state;
      const [ Container, ItemContainer ] = this.resolveComponents(MarkdownTOC);
      const { id, fullId, ...props } = this.attrs;

      const select = key => this.setState({ selected: this.scrollIntoView(key) });

      return (
         <Container id={`${fullId}__toc`} {...props}>
            {this.getHeaders().map(header => (
               <ItemContainer
                  key={header.link}
                  className={`toc-h${header.level}`}
                  isSelected={selected === header.link}
                  onClick={_ => select(header.link)}
               >
                  <a href="javascript:void(0)">{header.title}</a>
               </ItemContainer>
            ))}
         </Container>
      );
   }

   scrollIntoView(key) {
      if (this.scrollingIntoView) clearTimeout(this.scrollingIntoView);
      this.scrollingIntoView = setTimeout(() => (this.scrollingIntoView = null), 3000);

      document.querySelector(key).scrollIntoView({ behavior: 'smooth' });
      return key;
   }
}

createWebComponent(MarkdownTOC, 'd-markdown-toc');
