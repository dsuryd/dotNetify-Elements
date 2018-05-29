import React from 'react';
import styled from 'styled-components';
import { Markdown, MarkdownTOC, VMContext, withTheme } from 'elements';
import { Alert, Button, DropdownList, Element, Form, Panel, NumberField, TextField } from 'elements';
import Expander from '../components/Expander';
import Article from '../components/Article';

const WorkingWithForms = props => (
   <Article vm="WorkingWithForms" id="Content">
      <Markdown id="Content">
         <Expander label={<SeeItLive />} content={<BasicForm vm="BasicForm" />} />
         <Expander label={<SeeItLive />} content={<BasicForm vm="AsyncValidation" />} />
         <Expander label={<SeeItLive />} content={<ClientValidation />} />
         <Expander label={<SeeItLive />} content={<NestedForms />} />
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

const NestedForms = _ => (
   <VMContext vm="MasterForm">
      <Form>
         <Alert id="ServerResponse" />
         <Panel horizontal>
            <ChildForm_NameEmail flex />
            <ChildForm_Address flex />
         </Panel>
         <Button id="Register" submit />
      </Form>
   </VMContext>
);

const ChildForm_NameEmail = _ => (
   <VMContext vm="ChildForm_NameEmail">
      <Form id="NameEmail">
         <Panel flex>
            <TextField id="Name" />
            <TextField id="Email" />
         </Panel>
      </Form>
   </VMContext>
);

const ChildForm_Address = _ => (
   <VMContext vm="ChildForm_Address">
      <Form id="Address">
         <Panel flex>
            <TextField id="Address" />
            <TextField id="City" />
            <DropdownList id="State" />
         </Panel>
      </Form>
   </VMContext>
);

export default withTheme(WorkingWithForms);
