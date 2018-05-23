import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, VMContext, withTheme } from 'elements';
import { Alert, Button, DropdownList, Element, Form, Panel, NumberField, TextField } from 'elements';
import Expander from '../components/Expander';

const CreatingForms = props => (
   <VMContext vm="CreatingForms">
      <Frame width="95%">
         <Markdown id="CreatingForms">
            <Expander label={<SeeItLive />} content={<BasicForm />} />
         </Markdown>
      </Frame>
   </VMContext>
);

const SeeItLive = _ => <b>See its Live!</b>;

const BasicForm = _ => (
   <VMContext vm="BasicForm">
      <Form>
         <Alert id="SubmitFeedback" />
         <Panel>
            <TextField id="Name" />
            <DropdownList id="Gender" />
            <Button id="Submit" submit />
         </Panel>
      </Form>
   </VMContext>
);

export default withTheme(CreatingForms);
