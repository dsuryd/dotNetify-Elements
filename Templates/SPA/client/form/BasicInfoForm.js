import React from 'react';
import { Cell, DropdownList, Form, Panel, TextField, VMContext } from 'dotnetify-elements';

const BasicInfoForm = () => (
   <Panel horizontal noGap>
      <Panel horizontal>
         <Cell header="Person" flex borders="top, left, right">
            <VMContext vm="PersonForm">
               <Form id="Person">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="FullName" plainText />
                     <DropdownList id="Prefix" />
                     <TextField id="FirstName" />
                     <TextField id="MiddleName" />
                     <TextField id="LastName" />
                     <DropdownList id="Suffix" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Phone" flex>
            <VMContext vm="PhoneForm">
               <Form id="Phone">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="Work" />
                     <TextField id="Home" />
                     <TextField id="Mobile" />
                     <DropdownList id="Primary" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
      </Panel>
   </Panel>
);

export default BasicInfoForm;
