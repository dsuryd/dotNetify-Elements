import React from 'react';
import {
   Alert,
   Button,
   Card,
   Checkbox,
   CheckboxGroup,
   DateField,
   Panel,
   DropdownList,
   Form,
   MultiselectList,
   TextField,
   NumberField,
   TextAreaField,
   PasswordField,
   RadioGroup,
   RadioToggle,
   VMContext
} from 'dotnetify-elements';

const SampleForm = ({ vm, title, horizontal, plainText }) => (
   <VMContext vm={vm}>
      <Card header={title}>
         <Panel>
            <Form plainText={plainText}>
               <Panel childProps={{ horizontal: horizontal }}>
                  <TextField id="MyText" />
                  <PasswordField id="MyPassword" />
                  <NumberField id="MyNumber" />
                  <TextField id="MyMoney" />
                  <DateField id="MyDate" />
                  <DropdownList id="MyDropdown" />
                  <MultiselectList id="MyMultiselect" />
                  <TextAreaField id="MyTextArea" />
                  <RadioGroup id="MyRadio" />
                  <RadioToggle id="MyRadioToggle" />
                  <Checkbox id="MyCheckbox" />
                  <CheckboxGroup id="MyCheckboxGroup" />
                  <Panel right>
                     <Button label="Cancel" cancel secondary />
                     <Button label="Submit" id="Submit" submit primary />
                  </Panel>
               </Panel>
            </Form>
            <Alert id="SubmitSuccess" success />
         </Panel>
      </Card>
   </VMContext>
);

export default SampleForm;
