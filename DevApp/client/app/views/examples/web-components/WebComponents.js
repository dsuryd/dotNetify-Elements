import React from 'react';
import { Markdown, withTheme } from 'dotnetify-elements';
import Article from '../../../components/Article';

const WebComponents = _ => (
   <Article vm="WebComponents" id="Content">
      <Markdown id="Content">
         <BasicDemo />
      </Markdown>
   </Article>
);

const BasicDemo = () => (
   <React.Fragment>
      <d-vm-context vm="MasterForm">
         <d-form>
            <d-alert id="ServerResponse" />
            <d-panel horizontal="true">
               <d-vm-context vm="ChildForm_NameEmail">
                  <d-form id="NameEmail">
                     <d-panel>
                        <d-text-field id="Name" />
                        <d-text-field id="Email" />
                     </d-panel>
                  </d-form>
               </d-vm-context>
               <d-vm-context vm="ChildForm_Address">
                  <d-form id="Address">
                     <d-panel>
                        <d-text-field id="Address" />
                        <d-text-field id="City" />
                        <d-dropdown-list id="State" />
                     </d-panel>
                  </d-form>
               </d-vm-context>
            </d-panel>
            <d-button id="Register" submit="true" />
         </d-form>
      </d-vm-context>
   </React.Fragment>
);
export default withTheme(WebComponents);
