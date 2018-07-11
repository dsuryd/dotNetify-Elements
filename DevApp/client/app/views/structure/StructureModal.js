import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, Button, Modal, Markdown, Panel, TabItem, TextField, VMContext, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureModal = props => (
   <TabsArticle vm="StructureModal" id="Overview">
      <TabItem label="Overview" key="Overview">
         <Markdown id="Overview">
            <ModalExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" key="API">
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
               <Button label="Cancel" cancel secondary onClick={props.onClose} />
               <Button id="Submit" label="Register" submit onClick={props.onClose} />
            </Panel>
         </footer>
      </Modal>
   </VMContext>
);

class ModalExample extends React.Component {
   state = { openDialog: false, formData: null };

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
               <Button label="Cancel" cancel secondary onClick={props.onClose} />
               <Button id="Submit" label="Register" submit onClick={props.onClose} />
            </Panel>
         </footer>
      </Modal>
   </VMContext>
);

class MyApp extends React.Component {
   state = { open: false, formData: null };
   render() {
      const { open, formData } = this.state;
      const handleClick = _ => this.setState({ open: true, formData: null });
      const handleClose = _ => this.setState({ open: false });
      const handleSubmit = x => this.setState({ formData: x.Email + ' has been registered!' });
      return (
         <Panel horizontal>
            <Button label="Show Modal" onClick={handleClick} />
            <Alert>{formData}</Alert>
            <MyDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
         </Panel>
      );
   }
}
\`\`\``;
      const { openDialog, formData, ...options } = this.state;
      const setState = state => this.setState(state);
      const propTypes = { small: null, large: null };

      const handleClick = _ => this.setState({ formData: null, openDialog: true });
      const handleClose = _ => this.setState({ openDialog: false });
      const handleSubmit = data => this.setState({ formData: data.Email + ' has been registered!' });
      return (
         <RenderExample propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 1rem">
               <Button label="Open Dialog" onClick={handleClick} />
               <Alert>{formData}</Alert>
               <MyDialog options={options} open={openDialog} onClose={handleClose} onSubmit={handleSubmit} />
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
      const select = value => {};

      return (
         <Panel>
            <Button label="Show Modal" onClick={handleClick} />

            <RenderCustomize name="Modal" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
               <Modal open={open}>
                  <header>Header</header>
                  Body
                  <footer>
                     <Panel apart>
                        Footer
                        <Button label="Close" secondary onClick={handleClose} />
                     </Panel>
                  </footer>
               </Modal>
            </RenderCustomize>
         </Panel>
      );
   }
}

export default withTheme(StructureModal);
