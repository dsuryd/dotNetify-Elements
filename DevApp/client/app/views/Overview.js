import React from 'react';
import { Frame, Markdown, Theme, VMContext } from 'elements/bootstrap';
import { Element, TextField } from 'elements/bootstrap';

const Overview = props => (
   <VMContext vm="Docs">
      <Theme>
         <Frame>
            <Markdown id="Overview" />
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
      <TextField id="Name" />
      You have typed: <Element id="Name" />
   </VMContext>
);

export default Overview;
