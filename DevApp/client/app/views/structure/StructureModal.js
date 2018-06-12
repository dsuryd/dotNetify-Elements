import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, Button, Modal, Markdown, Panel, TabItem, TextField, VMContext, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureModal = props => (
   <TabsArticle vm="StructureModal" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <ModalExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <ModalCustomize />
      </TabItem>
   </TabsArticle>
);

const MyDialog = props => (
   <VMContext vm="ModalExample">
      <Modal {...props.options} open={props.open} onSubmit={props.onSubmit}>
         <header>Registration Dialog</header>
         <TextField horizontal id="Email" />
         <footer>
            <Panel right>
               <Button label="Cancel" secondary onClick={props.onClose} />
               <Button id="Register" submit onClick={props.onClose} />
            </Panel>
         </footer>
      </Modal>
   </VMContext>
);

class ModalExample extends React.Component {
   state = { show: false, openDialog: false, formData: null };

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Alert, Button, Modal, Panel, TextField, VMContext } from 'dotnetify-elements';

const MyDialog = props => (
   <VMContext vm="ModalExample">
      <Modal ${props}open={props.open} onSubmit={props.onSubmit}>
         <header>Registration Dialog</header>
         <TextField horizontal id="Email" />
         <footer>
            <Panel right>
               <Button label="Cancel" secondary onClick={props.onClose} />
               <Button id="Register" submit onClick={props.onClose} />
            </Panel>
         </footer>
      </Modal>
   </VMContext>
);

class MyApp extends React.Component {
   state = {show: false, open: false, formData: null};
   render() {
      const { show, open, formData } = this.state;
      const handleClick = _ => this.setState({ show: true, open: true, formData: null });
      const handleClose = _ => this.setState({ open: false });
      const handleSubmit = data => {
         /* Give time for the closing animation before hiding the component */
         setTimeout(_ => this.setState({ formData: data, show: false }), 250);      
      };
      return (
         <Panel horizontal>
            <Button label="Show Modal" onClick={handleClick} />
            {formData && <Alert>{formData.Email + ' has been registered!'}</Alert>}
            {show && <MyDialog options={options} open={open} onClose={handleClose} onSubmit={handleSubmit} />}
         </Panel>
      );
   }
}
\`\`\``;
      const { show, openDialog, formData, ...options } = this.state;
      const setState = state => this.setState(state);
      const { open, form, ...propTypes } = Modal.propTypes;

      const handleClick = _ => this.setState({ show: true, formData: null, openDialog: true });
      const handleClose = _ => this.setState({ openDialog: false });
      const handleSubmit = data => setTimeout(_ => this.setState({ formData: data, show: false }), 250);
      return (
         <RenderExample propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="min-height: 3.5rem">
               <Button label="Register..." onClick={handleClick} />
               {formData && <Alert>{formData.Email + ' has been registered!'}</Alert>}
               {show && <MyDialog options={options} open={openDialog} onClose={handleClose} onSubmit={handleSubmit} />}
            </Panel>
         </RenderExample>
      );
   }
}

class ModalCustomize extends React.Component {
   state = { open: false };

   render() {
      const { open } = this.state;
      const componentTypes = Modal.componentTypes;
      const handleClick = _ => this.setState({ open: true });
      const handleClose = _ => this.setState({ open: false });
      const handleSelected = state => this.setState(state);
      const select = (value, componentProps) => console.log(value, componentProps);

      return (
         <Panel>
            <Button label="Show Modal" onClick={handleClick} />

            <Modal open={open} large>
               <header>Header</header>
               <RenderCustomize name="Modal" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
                  <Modal open={false} />
               </RenderCustomize>
               <footer>
                  <Panel right>
                     <Button label="OK" secondary onClick={handleClose} />
                  </Panel>
               </footer>
            </Modal>
         </Panel>
      );
   }
}

export default withTheme(StructureModal);
