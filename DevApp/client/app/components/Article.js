import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Element, Frame, MarkdownTOC, Panel, Tab, VMContext } from "dotnetify-elements";
import { FrameworkContext, currentFramework, frameworkSelectEvent } from "../components/SelectFramework";

const Sidebar = styled.div`
  position: fixed;
  border-left: 1px solid orange;
  margin-left: 2rem;
  padding-left: 1rem;
`;

const Title = styled.div`
  ${props => (!props.show ? "display: none" : "")};
  ${props => props.theme.MarkdownTOC.Container};
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const frameCss = `
   margin-left: 10%; 
   margin-right: 0;
   max-width: 1268px;
   @media (max-width: 1170px) {
      margin-left: 2rem;
      max-width: calc(100% - 2rem);
      > *:last-child {
         display: none;
      }
    }   
    @media (max-width: 414px) {
      margin-left: 1rem;
      max-width: calc(100% - 1rem);
    }      
`;

const panelCss = `
   max-width: calc(100% - 30rem); 
   min-width: 65%;
   @media (max-width: 1170px) {
      max-width: calc(100% - 2rem);
    }    
    @media (max-width: 414px) {
      max-width: calc(100% - 1rem);
    }  
`;

const scrollIntoView = id => document.getElementById(id).scrollIntoView({ behavior: "smooth" });

const Article = props => {
  const [framework, setFramework] = useState(currentFramework);
  useEffect(() => frameworkSelectEvent.subscribe(framework => setFramework(framework)), []);

  return (
    <FrameworkContext.Provider value={framework}>
      <VMContext vm={props.vm}>
        <Frame horizontal css={frameCss} gap="10%">
          <Panel css={panelCss} children={props.children} />
          <Sidebar>
            <Title show={props.tocTitle}>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  scrollIntoView(props.title);
                }}
              >
                {props.tocTitle}
              </a>
            </Title>
            {props.id && <MarkdownTOC id={props.id} />}
          </Sidebar>
        </Frame>
      </VMContext>
    </FrameworkContext.Provider>
  );
};

export const TabsArticle = props => {
  const [id, setId] = useState(props.id);
  const [tocTitle, setTocTitle] = useState();
  const [title, setTitle] = useState();
  const [framework, setFramework] = useState(currentFramework);
  useEffect(
    () =>
      frameworkSelectEvent.subscribe(framework => {
        setFramework(framework);
        props.onChangeFramework && props.onChangeFramework(framework);
      }),
    []
  );

  const { vm, children } = props;

  const handleActivate = (key, label) => {
    setId(key.length > 1 ? key : null);
    setTocTitle(key.length > 1 ? label : null);
  };

  const handleTitle = title => {
    setTitle(title);
    setTocTitle(props.id);
  };

  // Remove "Customize" tab if not React component.
  let _children = React.Children.toArray(children);
  if (framework !== "React") _children = _children.filter(x => x.props && x.props.label !== "Customize");

  return (
    <Article vm={vm} id={id} title={title} tocTitle={tocTitle}>
      <h2 id={title}>
        <Element id="Title" onChange={handleTitle} />
      </h2>
      <Tab key={framework} css="margin: 0 .5rem; margin-top: 2rem" onActivate={handleActivate}>
        {_children}
      </Tab>
    </Article>
  );
};

export default Article;
