import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Form, Frame, Panel, Theme, VMContext } from '../../../elements/bootstrap';
import createEventEmitter from '../../../elements/event-emitter';

export default class CustomerInfoPage extends React.Component {

   state = { editable: false, edit: false, changed: false, submitEvent: createEventEmitter() };

   handleSelect = value => this.setState({ editable: value ? true : false });
   handleEdit = _ => this.setState({ edit: true });
   handleUpdate = _ => {
      this.state.submitEvent.emit(true);
      this.setState({ edit: false, changed: false });
   }
   handleCancel = _ => {
      this.state.submitEvent.emit(false);
      this.setState({ edit: false, changed: false });
   }
   handleChanged = _ => this.setState({ changed: true });

   render() {
      const { editable, edit, changed, submitEvent } = this.state;
      const showEdit = editable && !edit;
      const showUpdateCancel = edit;
      return (
         <VMContext vm="CustomerInfoPage">
            <Theme>
               <Frame>
                  <h2>Contacts</h2>
                  <DataGrid id="Contacts" onSelect={this.handleSelect} disabled={edit} />
                  <Panel horizontal left>
                     {showEdit && <Button onClick={this.handleEdit}>Edit</Button>}
                     {showUpdateCancel && <Button submit onClick={this.handleUpdate} disabled={!changed}>Update</Button>}
                     {showUpdateCancel && <Button secondary onClick={this.handleCancel}>Cancel</Button>}
                  </Panel>
                  <Form plainText={!edit} submitEvent={submitEvent} onChanged={this.handleChanged}>
                     <CustomerInfoForm />
                  </Form>
               </Frame>
            </Theme>
         </VMContext >
      );
   }
}