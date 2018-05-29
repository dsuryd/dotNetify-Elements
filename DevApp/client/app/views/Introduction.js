import React from 'react';
import styled from 'styled-components';
import { Markdown, VMContext, withTheme } from 'dotnetify-elements';
import { Button, DropdownList, Element, NumberField, TextField } from 'dotnetify-elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const Introduction = props => (
   <Article vm="Introduction" id="Content">
      <Markdown id="Content">
         <Expander label={<SeeItLive />} content={<NameInput />} />
         <Expander label={<SeeItLive />} content={<NameGenderInput />} />
         <Expander label={<SeeItLive />} content={<PrimeInput />} />
      </Markdown>
   </Article>
);

const SeeItLive = _ => <b>See It Live!</b>;

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

export default withTheme(Introduction);
