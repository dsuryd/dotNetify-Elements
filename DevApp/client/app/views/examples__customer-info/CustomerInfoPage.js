import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Form, Frame, Panel, Theme, VMContext } from 'elements/bootstrap';

export default class CustomerInfoPage extends React.Component {
   state = { editable: false, edit: false };

   handleSelect = value => this.setState({ editable: value ? true : false });
   toggleEdit = _ => this.setState({ edit: !this.state.edit });

   render() {
      const { editable, edit } = this.state;
      const canEdit = editable && !edit;
      return (
         <VMContext vm="CustomerInfoPage">
            <Theme>
               <Frame>
                  <h2>Contacts</h2>
                  <DataGrid id="Contacts" onSelect={this.handleSelect} disabled={edit} />
                  <Form plainText={!edit}>
                     <Panel>
                        <Panel horizontal left>
                           <Button hide={!canEdit} onClick={this.toggleEdit}>
                              Edit
                           </Button>
                           <Button id="Submit" submit hide={!edit} onClick={this.toggleEdit}>
                              Update
                           </Button>
                           <Button cancel secondary hide={!edit} disabled={false} onClick={this.toggleEdit}>
                              Cancel
                           </Button>
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
