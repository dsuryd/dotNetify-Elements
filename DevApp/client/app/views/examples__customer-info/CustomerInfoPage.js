import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Frame, Panel, Theme, VMContext } from '../../../elements/bootstrap';
import createEventEmitter from '../../../elements/event-emitter';

export default class CustomerInfoPage extends React.Component {

   state = { plainText: true, submitEvent: createEventEmitter() };

   handleEdit = _ => this.setState({ plainText: !this.state.plainText });
   handleUpdate = _ => this.state.submitEvent.emit();

   render() {
      const { plainText, submitEvent } = this.state;
      return (
         <VMContext vm="CustomerInfoPage">
            <Theme>
               <Frame>
                  <h2>Contacts</h2>
                  <DataGrid id="Contacts" />
                  <Panel horizontal left>
                     <Button onClick={this.handleEdit}>Edit</Button>
                     <Button onClick={this.handleUpdate}>Update</Button>
                  </Panel>
                  <CustomerInfoForm plainText={plainText} submitEvent={submitEvent} />
               </Frame>
            </Theme>
         </VMContext >
      );
   }
}