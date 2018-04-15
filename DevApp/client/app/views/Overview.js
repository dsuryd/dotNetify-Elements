import React from 'react';
import { Frame, Markdown, Theme, VMContext } from 'elements/bootstrap';

const Overview = props => (
   <VMContext vm="Docs">
      <Theme>
         <Frame>
            <Markdown id="Overview" />
         </Frame>
      </Theme>
   </VMContext>
);

export default Overview;
