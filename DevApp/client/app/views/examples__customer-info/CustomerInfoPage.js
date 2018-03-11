import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Frame, Theme, VMContext } from '../../../elements/bootstrap';

export default class CustomerInfoPage extends React.Component {

   state = { plainText: true };

   handleEdit = _ => this.setState({ plainText: !this.state.plainText });

   render() {
      return (
         <VMContext vm="CustomerInfoPage">
            <Theme>
               <Frame>
                  <h2>Contacts</h2>
                  <DataGrid id="Contacts" />
                  <Button onClick={this.handleEdit}>Edit</Button>
                  <CustomerInfoForm plainText={this.state.plainText} />
               </Frame>
            </Theme>
         </VMContext >
      );
   }
}