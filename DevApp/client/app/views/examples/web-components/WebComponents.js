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
   <d-vm-context vm="CustomerForm">
      <d-panel>
         <d-data-grid id="Contacts" enable="true" />
         <d-form plainText="true">
            <d-panel>
               {/* Toolbar */}
               <d-panel horizontal="true">
                  <d-panel horizontal="true">
                     <d-button label="Edit" enable="true" />
                     <d-button label="Update" id="Submit" submit="true" show="false" />
                     <d-button label="Cancel" cancel="true" secondary="true" show="false" />
                  </d-panel>
                  <d-panel right="true">
                     <d-button label="New Customer" enable="true" />
                  </d-panel>
               </d-panel>
               {/* Edit forms */}
               <d-tab margin="1.5rem 0">
                  <d-tab-item label="Basic Info">
                     <d-panel horizontal="true" nogap="true">
                        <d-panel>
                           <d-cell header="Person" borders="top, left, right">
                              <d-vm-context vm="PersonForm">
                                 <d-form id="Person">
                                    <d-panel>
                                       <d-text-field id="FullName" plaintext="true" horizontal="true" />
                                       <d-dropdown-list id="Prefix" horizontal="true" />
                                       <d-text-field id="FirstName" horizontal="true" />
                                       <d-text-field id="MiddleName" horizontal="true" />
                                       <d-text-field id="LastName" horizontal="true" />
                                       <d-dropdown-list id="Suffix" horizontal="true" />
                                    </d-panel>
                                 </d-form>
                              </d-vm-context>
                           </d-cell>
                           <d-cell header="Phone" flex="true">
                              <d-vm-context vm="PhoneForm">
                                 <d-form id="Phone">
                                    <d-panel>
                                       <d-text-field id="Work" horizontal="true" />
                                       <d-text-field id="Home" horizontal="true" />
                                       <d-text-field id="Mobile" horizontal="true" />
                                       <drop-down-list id="Primary" horizontal="true" />
                                    </d-panel>
                                 </d-form>
                              </d-vm-context>
                           </d-cell>
                        </d-panel>
                        <d-panel>
                           <d-cell header="Other Info" borders="top, right">
                              <d-vm-context vm="OtherInfoForm">
                                 <d-form id="OtherInfo">
                                    <d-panel>
                                       <d-text-field id="SSN" horizontal="true" />
                                       <d-dropdown-list id="TaxFilingStatus" horizontal="true" />
                                       <d-date-field id="DateOfBirth" horizontal="true" />
                                       <d-radio-group id="Gender" horizontal="true" />
                                       <d-dropdown-list id="MaritalStatus" horizontal="true" />
                                    </d-panel>
                                 </d-form>
                              </d-vm-context>
                           </d-cell>
                           <d-cell header="Driver License" borders="top, right">
                              <d-vm-context vm="DriverLicenseForm">
                                 <d-form id="DriverLicense">
                                    <d-panel>
                                       <d-text-field id="Number" horizontal="true" />
                                       <d-dropdown-list id="State" horizontal="true" />
                                    </d-panel>
                                 </d-form>
                              </d-vm-context>
                           </d-cell>
                           <d-cell header="Notes" flex="true" borders="top, right, bottom">
                              <d-vm-context vm="NotesForm">
                                 <d-form id="Notes">
                                    <d-panel>
                                       <d-text-area-field id="Notes" horizontal="true" />
                                    </d-panel>
                                 </d-form>
                              </d-vm-context>
                           </d-cell>
                        </d-panel>
                     </d-panel>
                  </d-tab-item>
                  <d-tab-item label="Address">{/* <AddressForm /> */}</d-tab-item>
               </d-tab>
            </d-panel>
         </d-form>
      </d-panel>
      {/* <NewCustomerDialog open={openDialog} onClose={this.toggleDialog} /> */}
   </d-vm-context>
);
export default withTheme(WebComponents);
