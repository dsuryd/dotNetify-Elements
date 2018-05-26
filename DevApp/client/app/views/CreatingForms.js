import React from 'react';
import styled from 'styled-components';
import { Markdown, MarkdownTOC, VMContext, withTheme } from 'elements';
import { Alert, Button, Element, Form, Panel, NumberField, TextField } from 'elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const CreatingForms = props => (
   <Article vm="CreatingForms" id="CreatingForms">
      <Markdown id="CreatingForms">
         <Expander label={<SeeItLive />} content={<BasicForm vm="BasicForm" />} />
         <Expander label={<SeeItLive />} content={<BasicForm vm="AsyncValidation" />} />
         <Expander label={<SeeItLive />} content={<ClientValidation />} />
      </Markdown>
   </Article>
);

const SeeItLive = _ => <b>See It Live!</b>;

const BasicForm = props => (
   <VMContext vm={props.vm}>
      <Form>
         <Alert id="ServerResponse" />
         <Panel>
            <TextField id="Name" />
            <TextField id="Email" />
            <Panel right>
               <Button label="Cancel" cancel secondary />
               <Button id="Register" submit />
            </Panel>
         </Panel>
      </Form>
   </VMContext>
);

const nameLengthValidator = {
   validate: value => typeof value == 'string' && value.length >= 2,
   message: 'Name must be at least 2 characters'
};

const ClientValidation = _ => (
   <VMContext vm="ClientValidation">
      <Form>
         <Panel horizontal>
            <TextField id="Name" horizontal validation={nameLengthValidator} />
            <Button id="Register" submit />
         </Panel>
      </Form>
   </VMContext>
);

export default withTheme(CreatingForms);
