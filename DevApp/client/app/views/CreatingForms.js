import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, VMContext, withTheme } from 'elements';
import { Button, Collapsible, DropdownList, Element, Form, NumberField, TextField } from 'elements';
import Expander from '../components/Expander';

const CreatingForms = props => (
   <VMContext vm="CreatingForms">
      <Frame width="95%">
         <Markdown id="CreatingForms" />
      </Frame>
   </VMContext>
);

const SeeItLive = _ => <b>See its Live!</b>;

export default withTheme(CreatingForms);
