import React from 'react';
import styled from 'styled-components';
import { Main, Header, Section } from 'dotnetify-elements';
import { Button, Card, CellPanel, Frame, Markdown, Panel, VMContext, withTheme } from 'dotnetify-elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const LayoutSystem = props => (
   <Article vm="LayoutSystem" id="Content">
      <Markdown id="Content">
         <DefaultPanelLayout />
         <HorizontalPanelLayout />
         <FlexPanelLayout />
         <CssPanelLayout />
         <BootstrapExampleLayout />
      </Markdown>
   </Article>
);

const Item = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 50px;
   height: 50px;
   color: white;
   font-size: x-large;
   background: #999;
`;

const SourceCode = props => <Markdown css=".prism-code { margin:0 !important }" {...props} />;

const panelSource = props => `
\`\`\`jsx
const MyApp = _ => (
   <Panel${props ? ' ' + props : ''}>
      <Item>1</Item>
      <Item>2</Item>
      <Item>3</Item>
   </Panel>
);
\`\`\``;

const DefaultPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel flex>
         <Panel>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
         </Panel>
      </Panel>
      <Panel flex>
         <SourceCode>{panelSource()}</SourceCode>
      </Panel>
   </Panel>
);

const HorizontalPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel horizontal flex>
         <Item>1</Item>
         <Item>2</Item>
         <Item>3</Item>
      </Panel>
      <Panel flex>
         <SourceCode>{panelSource('horizontal')}</SourceCode>
      </Panel>
   </Panel>
);

const flexPanelSource = props => `
\`\`\`jsx
const MyApp = _ => (
   <Panel horizontal>
      <Panel flex>
         <Item>1</Item>
      </Panel>
      <Item>2</Item>
      <Panel flex right>
         <Item>3</Item>
      </Panel>
   </Panel>
);
\`\`\``;

const FlexPanelLayout = _ => (
   <Panel horizontal css="margin: 2rem 0">
      <Panel horizontal>
         <Panel flex>
            <Item>1</Item>
         </Panel>
         <Item>2</Item>
         <Panel flex right>
            <Item>3</Item>
         </Panel>
      </Panel>
      <Panel flex>
         <SourceCode>{flexPanelSource()}</SourceCode>
      </Panel>
   </Panel>
);

const cssPanelSource = props => `
\`\`\`jsx
const customCss = \`
   padding: 1rem; 
   border: 1px solid;
   .make-me-red { background: red; }    
\`;
const MyApp = _ => (
   <Panel horizontal css={customCss}>
      <Panel flex>
         <Item>1</Item>
      </Panel>
      <Item>2</Item>
      <Panel flex right>
         <Item className="make-me-red">3</Item>
      </Panel>
   </Panel>
);
\`\`\``;

const customCss = `
   padding: 1rem; 
   border: 1px solid;
   .make-me-red { background: red; }    
`;

const CssPanelLayout = _ => (
   <Panel horizontal>
      <Panel flex>
         <Panel flex="0" horizontal css={customCss}>
            <Panel flex>
               <Item>1</Item>
            </Panel>
            <Item>2</Item>
            <Panel flex right>
               <Item className="make-me-red">3</Item>
            </Panel>
         </Panel>
      </Panel>
      <Panel flex>
         <SourceCode>{cssPanelSource()}</SourceCode>
      </Panel>
   </Panel>
);

const DemoArea = styled.div`
   margin: 0 auto;
   padding: 1rem;
   background: white;
`;

const headerCss = `
   height: 130px;
   border: none;
   box-shadow: none;
   background: none;
`;

const jumbotronCss = `
   color: #fff;
   background: #343a40;
   font-size: 16px;
`;

const aboutCss = `
   padding: 1rem;
   background: #efefef;
   border-radius: .25rem;
`;

const thumbnailImg =
   'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1642fdc4ccb%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1642fdc4ccb%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

const BootstrapExampleLayout = _ => (
   <DemoArea>
      <Main>
         <Header css={headerCss}>
            <CellPanel>
               <Panel flex horizontal middle>
                  <Panel flex>
                     <a href="#">Subscribe</a>
                  </Panel>
                  <h1>Large</h1>
                  <Panel flex right>
                     <Button>Sign up</Button>
                  </Panel>
               </Panel>
               <hr />
               <Panel flex horizontal apart>
                  <a href="#">World</a>
                  <a href="#">U.S.</a>
                  <a href="#">Technology</a>
                  <a href="#">Design</a>
                  <a href="#">Culture</a>
                  <a href="#">Business</a>
                  <a href="#">Politics</a>
               </Panel>
            </CellPanel>
         </Header>
         <Section css="background: none">
            <Panel>
               <Card css={jumbotronCss}>
                  <CellPanel horizontal>
                     <Panel flex>
                        <h1>Title of a featured post</h1>
                        Multiple lines of text informing new readers quickly and efficiently about what's most interesting in this post's contents.
                        <a href="#">Continue reading...</a>
                     </Panel>
                     <Panel flex />
                  </CellPanel>
               </Card>
               <Panel horizontal childProps={{ flex: true }}>
                  <Card horizontal>
                     <b>World</b>
                     <h3>Featured Post</h3>
                     <label>June 22</label>
                     <p>This is a card with supporting text as a natural lead-in to additional content.</p>
                     <a href="#">Continue reading...</a>
                     <img src={thumbnailImg} />
                  </Card>
                  <Card horizontal>
                     <b>Design</b>
                     <h3>Post Title</h3>
                     <label>June 21</label>
                     <p>This is a card with supporting text as a natural lead-in to additional content.</p>
                     <a href="#">Continue reading...</a>
                     <img src={thumbnailImg} />
                  </Card>
               </Panel>
               <Panel horizontal gap="2rem">
                  <Panel css="margin-top: 2rem;">
                     <h4>From the Firehose</h4>
                     <h2>Sample Blog Post</h2>
                     July 4th, 2018
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     </p>
                     <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                     </p>
                     <h3>Heading</h3>
                     <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et
                        quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga.
                     </p>
                     <h5>Subheading</h5>
                     <p>
                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit
                        quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et
                        aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                     </p>
                  </Panel>
                  <Panel>
                     <Panel css={aboutCss}>
                        <h5>About</h5>
                        <p>
                           Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed
                           consectetur.
                        </p>
                     </Panel>
                     <Panel>
                        <h5>Archives</h5>
                        <Panel noGap>
                           <a href="#">June 2018</a>
                           <a href="#">May 2018</a>
                           <a href="#">April 2018</a>
                           <a href="#">March 2018</a>
                           <a href="#">February 2018</a>
                           <a href="#">January 2018</a>
                           <a href="#">December 2017</a>
                        </Panel>
                     </Panel>
                  </Panel>
               </Panel>
            </Panel>
         </Section>
      </Main>
   </DemoArea>
);

export default withTheme(LayoutSystem);
