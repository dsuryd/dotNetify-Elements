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
      let { name, ...theme } = this.context.theme;
      theme = Object.keys(theme).sort().reduce((all, item) => ({ ...all, [item]: this.context.theme[item] }), {});
      theme = { name: name, ...theme };

      let themeJson = JSON.stringify(theme, null, 4).replace(/\\n/g, '\r\n');
      let themeClipboard = themeJson.replace(/"/g, '`').replace(/`(.+)`:/g, x => `${x.replace(/`/g, '')}`);
      return (
         <Panel noGap css="margin-top: 3rem; .token {color: #ccc} .token.property, .token.operator { color: #9cdcfe}">
            <Panel apart horizontal>
               <Button positive label="Toggle Theme" onClick={_ => themeToggleEvent.emit()} />
               <Button secondary label="Copy to Clipboard" onClick={_ => copyToClipboard(themeClipboard)} />
            </Panel>
            <Markdown>{'```json\r\n' + themeJson + '\r\n```'}</Markdown>
         </Panel>
      );
   }
}

export default withTheme(LayoutTheme);
