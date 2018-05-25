import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, MarkdownTOC, VMContext, withTheme } from 'elements';
import { Alert, Button, Element, Form, Panel, NumberField, TextField } from 'elements';
import Expander from '../components/Expander';

const TOCSidebar = styled.div`
   position: fixed;
   border-left: 2px solid #ddd;
   margin-left: 2rem;
   padding-left: 1rem;
`;

const CreatingForms = props => (
   <VMContext vm="CreatingForms">
      <Frame horizontal style={{ overflowX: 'hidden' }}>
         <Panel css="width: calc(100% - 20rem)">
            <Markdown id="CreatingForms">
               <Expander label={<SeeItLive />} content={<BasicForm vm="BasicForm" />} />
               <Expander label={<SeeItLive />} content={<BasicForm vm="AsyncValidation" />} />
               <Expander label={<SeeItLive />} content={<ClientValidation />} />
            </Markdown>
         </Panel>

         <TOCSidebar>
            <MarkdownTOC id="CreatingForms" />
         </TOCSidebar>
      </Frame>
   </VMContext>
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
