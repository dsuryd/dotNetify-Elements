import React from 'react';
import { Frame, Panel, Checkbox, RadioToggle, Theme } from 'elements';
import SampleForm from '../../components/SampleForm';

const layoutOptions = [ { key: 'horizontal', value: 'Horizontal' }, { key: 'vertical', value: 'Vertical' } ];

export default class FormDemo extends React.Component {
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
      return (
         <Theme>
            <Frame>
               <h2>Form Elements</h2>
               <SampleForm
                  vm="SampleForm"
                  title={
                     <Panel horizontal centerAligned>
                        <RadioToggle id="_layoutOptions" options={layoutOptions} value={this.layout} onChange={this.handleLayoutChange} />
                        <Checkbox id="_plainText" label="Plain Text" value={this.plainText} onChange={this.handlePlainTextChange} />
                     </Panel>
                  }
                  horizontal={this.state.horizontal}
                  plainText={this.state.plainText}
               />
            </Frame>
         </Theme>
      );
   }
}
