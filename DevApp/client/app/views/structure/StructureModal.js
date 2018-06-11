import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Modal, Markdown, Panel, TabItem, TextField, defaultTheme, withTheme } from 'dotnetify-elements';
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
   </TabsArticle>
);

const MyDialog = props => (
   <Modal {...props.options} show={props.show} onSubmit={props.onSubmit}>
      <header>Registration Dialog</header>
      <TextField horizontal id="Email" />
      <footer>
         <Panel right>
            <Button label="Cancel" secondary onClick={props.onClose} />
            <Button id="Register" submit onClick={props.onClose} />
         </Panel>
      </footer>
   </Modal>
);

class ModalExample extends React.Component {
   state = { show: false, modalData: null };

   showDialog = () => this.setState({ show: true });
   closeDialog = () => this.setState({ show: false });
   handleSubmit = data => this.setState({ modalData: data });

   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Button, Modal, Panel, TextField, VMContext } from 'dotnetify-elements';

const MyDialog = props => (
   <Modal ${props}show={props.show} onSubmit={props.onSubmit}>
      <header>Registration Dialog</header>
      <TextField horizontal id="Email" />
      <footer>
         <Panel right>
            <Button label="Cancel" secondary onClick={props.onClose} />
            <Button id="Register" submit onClick={props.onClose} />
         </Panel>
      </footer>
   </Modal>
);

class MyApp extends React.Component {
   state = {show: false, modalData: null};
   showDialog = () => this.setState({ show: true });
   closeDialog = () => this.setState({ show: false });
   handleSubmit = data => this.setState({ modalData: data });   
   render() {
      const { show, modalData } = this.state;
      return (
         <VMContext vm="ModalExample">
            <Button label="Show Modal" onClick={this.showDialog} />
            {modalData ? <div><b>{modalData.Email}</b> has been registered!</div> : null}            
            <MyDialog show={show} onClose={this.closeDialog} onSubmit={this.handleSubmit} />
         </VMContext>
      );
   }
}
\`\`\``;
      const { modalData, ...options } = this.state;
      const setState = state => this.setState(state);
      const { show, ...propTypes } = Modal.propTypes;
      return (
         <RenderExample vm="ModalExample" propTypes={propTypes} buildCode={buildCode} onChange={setState}>
            <Button label="Show Modal" onClick={this.showDialog} />
            {modalData ? (
               <div>
                  <b>{modalData.Email}</b> has been registered!
               </div>
            ) : null}
            <MyDialog show={this.state.show} options={options} onClose={this.closeDialog} onSubmit={this.handleSubmit} />
         </RenderExample>
      );
   }
}

export default withTheme(StructureModal);
