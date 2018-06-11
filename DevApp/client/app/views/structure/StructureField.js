import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';
import { WiredInput, WiredRadio, WiredRadioGroup } from 'wired-elements';

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

/* Use wiredjs: a set of web components with handrawn, sketchy look. */
import { WiredInput, WiredRadio, WiredRadioGroup } from 'wired-elements';

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Panel css="font-family: 'Gloria Hallelujah'">
         <Field label="What's your name?" ${props}>
            <wired-input type="text" placeholder="Type your name..." />
         </Field>
         <Field label="How do you like to be contacted?" ${props}>
            <wired-radio-group selected="two">
               <wired-radio name="call" text="Call me" />
               <wired-radio name="email" text="Email me" />
               <wired-radio name="text" text="Text me" />
            </wired-radio-group>
         </Field>
      </Panel>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample propTypes={Field.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 10rem; font-family: 'Gloria Hallelujah'">
               <Field label="What's your name?" {...this.state}>
                  <wired-input type="text" placeholder="Type your name..." />
               </Field>
               <Field label="How do you like to be contacted?" {...this.state}>
                  <wired-radio-group selected="two">
                     <wired-radio name="call" text="Call me" />
                     <wired-radio name="email" text="Email me" />
                     <wired-radio name="text" text="Text me" />
                  </wired-radio-group>
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
