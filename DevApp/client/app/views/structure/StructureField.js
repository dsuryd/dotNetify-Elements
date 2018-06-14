import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const StructureField = props => (
   <TabsArticle vm="StructureField" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <FieldExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <FieldCustomize />
      </TabItem>
   </TabsArticle>
);

class FieldExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Field, Panel, VMContext } from 'dotnetify-elements';

/* Use React Material-UI library. */
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Panel>
         <Field label="What's your name?" {...this.state}>
            <TextField label="Name" />
         </Field>
         <Field label="How did you hear about us?" {...this.state}>
            <FormControlLabel value="internet" control={<Checkbox />} label="Internet" />
            <FormControlLabel value="newspaper" control={<Checkbox />} label="Newspaper" />
            <FormControlLabel value="friends" control={<Checkbox />} label="Friends" />
         </Field>
      </Panel>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample propTypes={Field.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 10rem">
               <Field label="What's your name?" {...this.state}>
                  <TextField label="Name" />
               </Field>
               <Field label="How did you hear about us?" {...this.state}>
                  <FormControlLabel value="internet" control={<Checkbox />} label="Internet" />
                  <FormControlLabel value="newspaper" control={<Checkbox />} label="Newspaper" />
                  <FormControlLabel value="friends" control={<Checkbox />} label="Friends" />
               </Field>
            </Panel>
         </RenderExample>
      );
   }
}

class FieldCustomize extends React.Component {
   state = {};

   render() {
      const { plainText, validationMessage } = this.state;
      const componentTypes = Field.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextContainer',
         validationMessage: value === 'ValidationMessageContainer'
      });

      return (
         <RenderCustomize name="Field" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Field label="Label:" plainText={plainText}>
               {plainText ? 'Plain text' : <input type="text" placeholder="Enter text..." />}
               {validationMessage ? <div key="validationMsg">Validation message</div> : null}
            </Field>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureField);
