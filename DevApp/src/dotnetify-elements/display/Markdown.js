import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import markdown from '../utils/markdown';
import lightTheme from '../theme-light';
import createWebComponent from '../utils/web-component';

const ContainerComponent = styled.div`
   ${props => props.theme.Markdown};
   ${props => props.css};
`;

ContainerComponent.defaultProps = { theme: lightTheme };

const MarkdownText = props => markdown(props.text);

export class Markdown extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string
   };

   static componentTypes = {
      ContainerComponent: ContainerComponent
   };

   render() {
      const [ Container ] = this.resolveComponents(Markdown);
      const { id, fullId, children, style, css, ...props } = this.attrs;

      const _children = React.Children.toArray(children);

      const renderText = section => (typeof section == 'string' ? <MarkdownText text={section} /> : section);

      let markdown = null;
      if (this.value) {
         let markdowns = [];
         this.value.split('[inset]').forEach((section, idx) => {
            markdowns.push(section);
            idx < _children.length && markdowns.push(_children[idx]);
         });

         markdown = markdowns.map((section, idx) => <React.Fragment key={idx}>{renderText(section)}</React.Fragment>);
      }
      else if (_children.length > 0) markdown = renderText(_children[0]);

      return (
         <Container id={fullId} style={style} css={css} className="markdown" {...props}>
            {markdown}
         </Container>
      );
   }
}

createWebComponent(Markdown, 'd-markdown');
