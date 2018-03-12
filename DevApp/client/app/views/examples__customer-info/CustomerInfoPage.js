import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Frame, Panel, Theme, VMContext } from '../../../elements/bootstrap';

export default class CustomerInfoPage extends React.Component {

   state = { plainText: true };

   handleEdit = _ => this.setState({ plainText: !this.state.plainText });
   handleUpdate = _ => {}

   render() {
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
                  <CustomerInfoForm plainText={this.state.plainText} />
               </Frame>
            </Theme>
         </VMContext >
      );
   }
}