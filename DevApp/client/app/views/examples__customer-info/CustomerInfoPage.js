import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Form, Frame, Panel, Theme, VMContext } from '../../../elements/bootstrap';
import createEventEmitter from '../../../elements/event-emitter';

export default class CustomerInfoPage extends React.Component {

   state = { editable: false, edit: false };

   handleSelect = value => this.setState({ editable: value ? true : false });
   toggleEdit = _ => this.setState({ edit: !this.state.edit });

   render() {
      const { editable, edit } = this.state;
      const showEdit = editable && !edit;
      const showUpdateCancel = edit;
      return (
         <VMContext vm="CustomerInfoPage">
            <Theme>
               <Frame>
                  <h2>Contacts</h2>
                  <DataGrid id="Contacts" onSelect={this.handleSelect} disabled={edit} />
                  <Form plainText={!edit}>
                     <Panel>
                        <Panel horizontal left>
                           {showEdit && <Button onClick={this.toggleEdit}>Edit</Button>}
                           {showUpdateCancel && <Button id="Submit" submit onClick={this.toggleEdit}>Update</Button>}
                           {showUpdateCancel && <Button secondary onClick={this.toggleEdit}>Cancel</Button>}
                        </Panel>
                        <CustomerInfoForm />
                     </Panel>
                  </Form>
               </Frame>
            </Theme>
         </VMContext>
      );
   }
}