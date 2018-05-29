import React from 'react';
import { Frame, Panel, Checkbox, RadioToggle, withTheme } from 'elements';
import SampleForm from './SampleForm';

class FormDemo extends React.Component {
   state = { horizontal: false, plainText: false };

   get layout() {
      return this.state.horizontal ? 'horizontal' : 'vertical';
   }
   get plainText() {
      return this.state.plainText;
   }

   handleLayoutChange = value => this.setState({ horizontal: value === 'horizontal' });
   handlePlainTextChange = value => this.setState({ plainText: value });

   render() {
      const layoutOptions = [ { key: 'horizontal', value: 'Horizontal' }, { key: 'vertical', value: 'Vertical' } ];
      return (
         <Frame css="margin-left: 3rem; width: calc(100% - 20rem)">
            <h2>Basic Form Demo</h2>
            <SampleForm
               vm="SampleForm"
               title={
                  <Panel horizontal middle>
                     <RadioToggle id="_layoutOptions" options={layoutOptions} value={this.layout} onChange={this.handleLayoutChange} />
                     <Checkbox id="_plainText" label="Plain Text" value={this.plainText} onChange={this.handlePlainTextChange} />
                  </Panel>
               }
               horizontal={this.state.horizontal}
               plainText={this.state.plainText}
            />
         </Frame>
      );
   }
}

export default withTheme(FormDemo);
