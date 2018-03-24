import React from 'react';
import CustomerInfoForm from './CustomerInfoForm';
import { Button, DataGrid, Form, Frame, Modal, Panel, VMContext } from 'elements/bootstrap';

export default class NewCustomerDialog extends React.Component {
   handleSubmit = _ => this.props.onSubmit();
   handleCancel = _ => this.props.onCancel();

   render() {
      const { onSubmit, onCancel } = this.props;
      return (
         <VMContext vm="NewCustomerForm">
            <Form>
               <Modal header="New Customer" large>
                  <CustomerInfoForm />
                  <footer>
                     <Panel horizontal right>
                        <Button cancel secondary onClick={this.handleCancel}>
                           Cancel
                        </Button>
                        <Button submit onClick={this.handleSubmit}>
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
