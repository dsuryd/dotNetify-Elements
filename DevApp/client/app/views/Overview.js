import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Theme, VMContext } from 'elements/bootstrap';
import { Button, Collapsible, Element, TextField } from 'elements/bootstrap';

const Overview = props => (
   <VMContext vm="Docs">
      <Theme>
         <Frame>
            <Markdown id="Overview">
               <Expander>
                  <UserInput />
               </Expander>
            </Markdown>
         </Frame>
      </Theme>
   </VMContext>
);

const HelloWorld = _ => (
   <VMContext vm="HelloWorld">
      <div>
         <Element id="Greetings" />
      </div>
   </VMContext>
);

const UserInput = _ => (
   <VMContext vm="UserInput">
      <TextField id="Name" label="Name:" placeholder="Enter your name" />
      <br />You have typed:{' '}
      <b>
         <Element id="Name" />
      </b>
   </VMContext>
);

const ExpanderPanel = styled.div`
   padding: .5rem;
   border-radius: 5px;
   border: 1px solid #ddd;
`;

const ExpanderInnerPanel = styled.div`padding: 1rem .5rem;`;

const Expander = props => (
   <ExpanderPanel>
      <Collapsible collapsed={true} label={<b>Show Result</b>}>
         <ExpanderInnerPanel>{props.children}</ExpanderInnerPanel>
      </Collapsible>
   </ExpanderPanel>
);

export default Overview;
