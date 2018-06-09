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
         <Field label="My Input:" ${props}>
            <wired-input type="text" placeholder="Enter text..." />
         </Field>
         <Field label="My Radio Group:" ${props}>
            <wired-radio-group selected="two">
               <wired-radio name="one" text="Radio One" />
               <wired-radio name="two" text="Radio Two" />
               <wired-radio name="three" text="Radio Three" />
            </wired-radio-group>
         </Field>
      </Panel>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample propTypes={Field.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 11rem; font-family: 'Gloria Hallelujah'">
               <Field label="My Input:" {...this.state}>
                  <wired-input type="text" placeholder="Enter text..." />
               </Field>
               <Field label="My Radio Group:" {...this.state}>
                  <wired-radio-group selected="two">
                     <wired-radio name="one" text="Radio One" />
                     <wired-radio name="two" text="Radio Two" />
                     <wired-radio name="three" text="Radio Three" />
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
      const { plainText, validationMessages } = this.state;
      const componentTypes = Field.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({
         plainText: value === 'PlainTextComponent',
         validationMessages: value === 'ValidationMessageComponent' ? [ 'Validation message' ] : null
      });
      return (
         <RenderCustomize name="Field" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Field label="Label:" {...this.state} plainText={plainText} validationMessages={validationMessages}>
               <input type="text" placeholder="Enter text..." />
            </Field>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureField);
