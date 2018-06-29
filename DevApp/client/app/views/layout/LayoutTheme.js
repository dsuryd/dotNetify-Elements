import React from 'react';
import PropTypes from 'prop-types';
import { Button, Markdown, Panel, withTheme } from 'dotnetify-elements';
import { Article } from '../../components';
import { themeToggleEvent } from './demo-helper';

const LayoutTheme = props => (
   <Article vm="LayoutTheme" id="Content">
      <Markdown id="Content">
         <LayoutThemeExample />
      </Markdown>
   </Article>
);

const copyToClipboard = str => {
   const el = document.createElement('textarea');
   el.value = str;
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
};

class LayoutThemeExample extends React.Component {
   static contextTypes = {
      theme: PropTypes.object
   };

   render() {
      let themeJson = JSON.stringify(this.context.theme, null, 4).replace(/\\n/g, '\r\n');
      return (
         <Panel noGap css="margin-top: 3rem">
            <Panel apart horizontal>
               <Button positive label="Toggle Theme" onClick={_ => themeToggleEvent.emit()} />
               <Button secondary label="Copy to Clipboard" onClick={_ => copyToClipboard(themeJson)} />
            </Panel>
            <Markdown>{'```json\r\n' + themeJson + '\r\n```'}</Markdown>
         </Panel>
      );
   }
}

export default withTheme(LayoutTheme);
