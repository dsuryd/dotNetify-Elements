import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, Theme, VMContext } from 'elements/bootstrap';
import { Button, Collapsible, DropdownList, Element, Form, NumberField, TextField } from 'elements/bootstrap';
import Expander from '../components/Expander';

const Overview = props => (
   <VMContext vm="Docs">
      <Theme>
         <Frame margin="1rem 15% 1rem 1rem">
            <Markdown id="Overview">
               <Expander content={<NameInput />} />
               <Expander content={<NameGenderInput />} />
               <Expander content={<PrimeInput />} />
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

const NameInput = _ => (
   <VMContext vm="NameInput">
      <TextField id="Name" label="Name:" placeholder="Enter your name" />
      <br />
      You typed:{' '}
      <b>
         <Element id="Name" />
      </b>
   </VMContext>
);

const NameGenderInput = _ => (
   <VMContext vm="NameGenderInput">
      <TextField id="Name" />
      <DropdownList id="Gender" />
   </VMContext>
);

const PrimeInput = _ => (
   <VMContext vm="PrimeInput">
      <NumberField id="Prime" />
   </VMContext>
);

export default Overview;
