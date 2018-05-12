import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Theme, VMContext } from 'elements';

const TextField = props => (
   <VMContext vm="Docs">
      <Theme>
         <Frame margin="1rem 15% 1rem 1rem">
            <Markdown id="Form__TextField" />
         </Frame>
      </Theme>
   </VMContext>
);

export default TextField;
