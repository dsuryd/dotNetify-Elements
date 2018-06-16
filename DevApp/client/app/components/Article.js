import React from 'react';
import styled from 'styled-components';
import { Element, Frame, Markdown, MarkdownTOC, Panel, Tab, VMContext } from 'dotnetify-elements';

const Sidebar = styled.div`
   position: fixed;
   border-left: 2px solid #ddd;
   margin-left: 2rem;
   padding-left: 1rem;
`;

const Title = styled.div`
   ${props => (!props.show ? 'display: none' : '')};
   ${props => props.theme.MarkdownTOC.Container};
   margin-bottom: 1rem;
   font-size: 1.1rem;
`;

const frameCss = `
   margin-left: 5rem; 
   margin-right: 0;
   @media (max-width: 768px) {
      margin-left: 1rem;
      > *:last-child {
         display: none;
      }
    }   
`;

const panelCss = `
   width: calc(100% - 30rem); 
   min-width: 65%;
   @media (max-width: 768px) {
      width: 100%;
    }    
`;

const scrollIntoView = id => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

const Article = props => (
   <VMContext vm={props.vm}>
      <Frame horizontal css={frameCss} gap="3rem">
         <Panel css={panelCss}>{props.children}</Panel>
         <Sidebar>
            <Title show={props.tocTitle}>
               <a href="javascript:void(0)" onClick={_ => scrollIntoView(props.title)}>
                  {props.tocTitle}
               </a>
            </Title>
            {props.id && <MarkdownTOC id={props.id} />}
         </Sidebar>
      </Frame>
   </VMContext>
);

export class TabsArticle extends React.Component {
   state = { id: this.props.id, tocTitle: null, title: null };
   render() {
      const { vm, children } = this.props;
      const { id, title, tocTitle } = this.state;
      const handleActivate = (key, label) => this.setState({ id: key.length > 1 ? key : null, tocTitle: key.length > 1 ? label : null });
      const handleTitle = title => this.setState({ title: title, tocTitle: this.props.id });
      return (
         <Article vm={vm} id={id} title={title} tocTitle={tocTitle}>
            <h2 id={this.state.title}>
               <Element id="Title" onChange={handleTitle} />
            </h2>
            <Tab css="margin: 1rem .5rem" onActivate={handleActivate}>
               {children}
            </Tab>
         </Article>
      );
   }
}

export default Article;
