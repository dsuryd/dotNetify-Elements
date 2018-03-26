import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Form, Frame, Modal, Panel, VMContext } from 'elements/bootstrap';

export default class NewCustomerDialog extends React.Component {
   handleClose = _ => this.props.onClose();

   render() {
      const { open, onClose } = this.props;
      return (
         <VMContext vm="NewCustomerForm">
            <Form>
               <Modal header="New Customer" show={open} large>
                  <CustomerInfoForm />
                  <footer>
                     <Panel horizontal right>
                        <Button cancel secondary onClick={this.handleClose}>
                           Cancel
                        </Button>
                        <Button id="Submit" submit onClick={this.handleClose}>
                           Submit
                        </Button>
                     </Panel>
                  </footer>
               </Modal>
            </Form>
         </VMContext>
      );
   }
}
