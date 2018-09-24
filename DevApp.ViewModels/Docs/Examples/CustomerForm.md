##### CustomerForm.js

```jsx
import React from 'react';
import BasicInfoForm from './BasicInfoForm';
import AddressForm from './AddressForm';
import NewCustomerDialog from './NewCustomerDialog';
import { Button, DataGrid, Form, Frame, Panel, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';

class CustomerForm extends React.Component {
   state = { editable: false, edit: false, openDialog: false };

   handleSelect = value => this.setState({ editable: value ? true : false });
   toggleEdit = _ => this.setState({ edit: !this.state.edit });
   toggleDialog = _ => this.setState({ openDialog: !this.state.openDialog });

   render() {
      const { editable, edit, openDialog } = this.state;
      const canEdit = editable && !edit;
      return (
         <VMContext vm="CustomerForm">
            <Frame>
               <DataGrid id="Contacts" onSelect={this.handleSelect} enable={!edit} />
               <Form plainText={!edit}>
                  <Panel>
                     {/* Toolbar */}
                     <Panel horizontal>
                        <Panel horizontal>
                           <Button label="Edit" enable={canEdit} onClick={this.toggleEdit} />
                           <Button label="Update" id="Submit" submit show={edit} onClick={this.toggleEdit} />
                           <Button label="Cancel" cancel secondary show={edit} onClick={this.toggleEdit} />
                        </Panel>
                        <Panel right>
                           <Button label="New Customer" onClick={this.toggleDialog} enable={!edit} />
                        </Panel>
                     </Panel>
                     {/* Edit forms */}
                     <Tab margin="1.5rem 0">
                        <TabItem label="Basic Info">
                           <BasicInfoForm />
                        </TabItem>
                        <TabItem label="Address">
                           <AddressForm />
                        </TabItem>
                     </Tab>
                  </Panel>
               </Form>
            </Frame>
            <NewCustomerDialog open={openDialog} onClose={this.toggleDialog} />
         </VMContext>
      );
   }
}

export default withTheme(CustomerForm);
```

##### BasicInfoForm.js

```jsx
import React from 'react';
import { Cell, DateField, DropdownList, Form, Panel, RadioGroup, TextField, TextAreaField, VMContext } from 'dotnetify-elements';

const BasicInfoForm = () => (
   <Panel horizontal noGap>
      <Panel>
         <Cell header="Person" borders="top, left, right">
            <VMContext vm="PersonForm">
               <Form id="Person">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="FullName" plainText />
                     <DropdownList id="Prefix" />
                     <TextField id="FirstName" />
                     <TextField id="MiddleName" />
                     <TextField id="LastName" />
                     <DropdownList id="Suffix" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Phone" flex>
            <VMContext vm="PhoneForm">
               <Form id="Phone">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="Work" />
                     <TextField id="Home" />
                     <TextField id="Mobile" />
                     <DropdownList id="Primary" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
      </Panel>
      <Panel>
         <Cell header="Other Info" borders="top, right">
            <VMContext vm="OtherInfoForm">
               <Form id="OtherInfo">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="SSN" />
                     <DropdownList id="TaxFilingStatus" />
                     <DateField id="DateOfBirth" />
                     <RadioGroup id="Gender" />
                     <DropdownList id="MaritalStatus" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Driver License" borders="top, right">
            <VMContext vm="DriverLicenseForm">
               <Form id="DriverLicense">
                  <Panel childProps={{ horizontal: true }}>
                     <TextField id="Number" />
                     <DropdownList id="State" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
         <Cell header="Notes" flex borders="top, right, bottom">
            <VMContext vm="NotesForm">
               <Form id="Notes">
                  <Panel childProps={{ horizontal: true }}>
                     <TextAreaField id="Notes" />
                  </Panel>
               </Form>
            </VMContext>
         </Cell>
      </Panel>
   </Panel>
);

export default BasicInfoForm;
```

##### AddressForm.js

```jsx
import React from 'react';
import { Button, Cell, DropdownList, Form, Frame, NumberField, Panel, RadioGroup, TextField, VMContext } from 'dotnetify-elements';

const AddressForm = () => (
   <Panel>
      <Cell header="Primary Address">
         <VMContext vm="AddressForm">
            <Form id="Address">
               <Panel childProps={{ horizontal: true }}>
                  <TextField id="Address1" />
                  <TextField id="Address2" />
                  <TextField id="City" />
                  <DropdownList id="State" />
                  <NumberField id="ZipCode" />
               </Panel>
            </Form>
         </VMContext>
      </Cell>
   </Panel>
);

export default AddressForm;
```

##### NewCustomerDialog.js

```jsx
import React from 'react';
import {
   Button,
   DateField,
   DropdownList,
   Form,
   Modal,
   NumberField,
   Panel,
   RadioGroup,
   Tab,
   TabItem,
   TextField,
   TextAreaField,
   VMContext
} from 'dotnetify-elements';

export default class NewCustomerDialog extends React.Component {
   state = { activeTab: 'Person' };

   handleClose = _ => this.props.onClose();
   handleSubmitError = data => this.setState({ activeTab: data.failedForms[0].formId });
   handleActivate = tab => this.setState({ activeTab: tab });

   render() {
      const { open } = this.props;
      const { activeTab } = this.state;
      return (
         <VMContext vm="NewCustomerForm">
            <Modal header="New Customer" open={open} large onSubmitError={this.handleSubmitError}>
               <Tab active={activeTab} onActivate={this.handleActivate}>
                  <TabItem key="Person" label="Person">
                     <VMContext vm="PersonForm">
                        <Form id="Person">
                           <Panel>
                              <DropdownList id="Prefix" />
                              <TextField id="FirstName" />
                              <TextField id="MiddleName" />
                              <TextField id="LastName" />
                              <DropdownList id="Suffix" />
                           </Panel>
                        </Form>
                     </VMContext>
                  </TabItem>
                  <TabItem key="Phone" label="Phone">
                     <VMContext vm="PhoneForm">
                        <Form id="Phone">
                           <Panel>
                              <TextField id="Work" />
                              <TextField id="Home" />
                              <TextField id="Mobile" />
                              <DropdownList id="Primary" />
                           </Panel>
                        </Form>
                     </VMContext>
                  </TabItem>
                  <TabItem key="Address" label="Address">
                     <VMContext vm="AddressForm">
                        <Form id="Address">
                           <Panel>
                              <TextField id="Address1" />
                              <TextField id="Address2" />
                              <TextField id="City" />
                              <DropdownList id="State" />
                              <NumberField id="ZipCode" />
                           </Panel>
                        </Form>
                     </VMContext>
                  </TabItem>
                  <TabItem key="OtherInfo" label="Other">
                     <VMContext vm="OtherInfoForm">
                        <Form id="OtherInfo">
                           <Panel>
                              <TextField id="SSN" />
                              <DropdownList id="TaxFilingStatus" />
                              <DateField id="DateOfBirth" />
                              <RadioGroup id="Gender" />
                              <DropdownList id="MaritalStatus" />
                           </Panel>
                        </Form>
                     </VMContext>
                     <VMContext vm="DriverLicenseForm">
                        <Form id="DriverLicense">
                           <Panel>
                              <TextField id="Number" />
                              <DropdownList id="State" />
                           </Panel>
                        </Form>
                     </VMContext>
                     <VMContext vm="NotesForm">
                        <Form id="Notes">
                           <Panel>
                              <TextAreaField id="Notes" />
                           </Panel>
                        </Form>
                     </VMContext>
                  </TabItem>
               </Tab>
               <footer>
                  <Panel horizontal right>
                     <Button label="Cancel" cancel secondary onClick={this.handleClose} />
                     <Button label="Submit" id="Submit" submit onClick={this.handleClose} />
                  </Panel>
               </footer>
            </Modal>
         </VMContext>
      );
   }
}

```

##### CustomerForm.cs

```csharp
using System;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public partial class CustomerForm : BaseVM
   {
      private readonly ICustomerRepository _customerRepository;
      private readonly ReactiveProperty<int> _selectedContact;

      public class Contact
      {
         public int Id { get; set; }
         public string Name { get; set; }
         public string Phone { get; set; }
         public string Address { get; set; }
         public string City { get; set; }
         public string ZipCode { get; set; }
      }

      public CustomerForm(ICustomerRepository customerRepository)
      {
         _customerRepository = customerRepository;

         _selectedContact = AddProperty<int>("SelectedContact", 1);

         AddProperty("Contacts", customerRepository.GetAll().Select(customer => ToContact(customer)))
            .WithItemKey(nameof(Contact.Id))
            .WithAttribute(new DataGridAttribute
            {
               RowKey = nameof(Contact.Id),
               Columns = new DataGridColumn[] {
                  new DataGridColumn(nameof(Contact.Name), "Name") { Sortable = true },
                  new DataGridColumn(nameof(Contact.Phone), "Phone") { Sortable = true },
                  new DataGridColumn(nameof(Contact.Address), "Address") { Sortable = true },
                  new DataGridColumn(nameof(Contact.City), "City") { Sortable = true },
                  new DataGridColumn(nameof(Contact.ZipCode), "ZipCode") { Sortable = true }
                },
               Rows = 5
            }.CanSelect(DataGridAttribute.Selection.Single, _selectedContact));

         AddInternalProperty<CustomerFormData>("Submit")
            .SubscribedBy(AddProperty<bool>("SubmitSuccess"), formData => Save(formData));
      }

      public override void OnSubVMCreated(BaseVM subVM)
      {
         // Have sub-forms with 'Customer' property subscribe to the customer data grid's selection changed event.
         var customerPropInfo = subVM.GetType().GetProperty(nameof(Customer));
         if (typeof(ReactiveProperty<Customer>).IsAssignableFrom(customerPropInfo?.PropertyType))
            _selectedContact.SubscribedBy(
               customerPropInfo.GetValue(subVM) as ReactiveProperty<Customer>,
               id => _customerRepository.Get(id)
            );

         if (subVM is NewCustomerForm)
            (subVM as NewCustomerForm).NewCustomer.Subscribe(customer => UpdateContact(customer));
      }

      private bool Save(CustomerFormData formData)
      {
         var id = (int)_selectedContact.Value;
         var customer = _customerRepository.Update(id, formData);

         this.UpdateList("Contacts", ToContact(customer));
         _selectedContact.Value = id;
         return true;
      }

      private Contact ToContact(Customer customer) => new Contact
      {
         Id = customer.Id,
         Name = customer.Name.FullName,
         Address = customer.Address.StreetAddress,
         City = customer.Address.City,
         ZipCode = customer.Address.ZipCode,
         Phone = customer.Phone.PrimaryNumber
      };

      private void UpdateContact(Customer newCustomer)
      {
         this.AddList("Contacts", ToContact(newCustomer));
         _selectedContact.OnNext(newCustomer.Id);
      }
   }
}
```

##### PersonForm.cs

```csharp
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class PersonForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public PersonForm()
      {
         AddProperty<string>(nameof(NameInfo.FullName))
            .WithAttribute(new TextFieldAttribute { Label = "Name:" })
            .SubscribeTo(Customer.Select(x => x.Name.FullName));

         AddProperty<NamePrefix>(nameof(NameInfo.Prefix))
            .WithAttribute(new DropdownListAttribute { Label = "Prefix:", Options = typeof(NamePrefix).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.Name.Prefix));

         AddProperty<string>(nameof(NameInfo.FirstName))
            .WithAttribute(new TextFieldAttribute { Label = "First Name:", MaxLength = 35 })
            .WithRequiredValidation()
            .SubscribeTo(Customer.Select(x => x.Name.FirstName));

         AddProperty<string>(nameof(NameInfo.MiddleName))
            .WithAttribute(new TextFieldAttribute { Label = "Middle Name:", MaxLength = 35 })
            .SubscribeTo(Customer.Select(x => x.Name.MiddleName));

         AddProperty<string>(nameof(NameInfo.LastName))
            .WithAttribute(new TextFieldAttribute { Label = "Last Name:", MaxLength = 35 })
            .WithRequiredValidation()
            .SubscribeTo(Customer.Select(x => x.Name.LastName));

         AddProperty<NameSuffix>(nameof(NameInfo.Suffix))
            .WithAttribute(new DropdownListAttribute { Label = "Suffix:", Options = typeof(NameSuffix).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.Name.Suffix));
      }
   }
}
```

##### PhoneForm.cs

```csharp
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class PhoneForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public PhoneForm()
      {
         AddProperty<string>(nameof(PhoneInfo.Work))
            .WithAttribute(new TextFieldAttribute { Label = "Work:", Mask = "(999) 999-9999" })
            .WithPatternValidation(Pattern.USPhoneNumber)
            .SubscribeTo(Customer.Select(x => x.Phone.Work));

         AddProperty<string>(nameof(PhoneInfo.Home))
            .WithAttribute(new TextFieldAttribute { Label = "Home:", Mask = "(999) 999-9999" })
            .WithPatternValidation(Pattern.USPhoneNumber)
            .SubscribeTo(Customer.Select(x => x.Phone.Home));

         AddProperty<string>(nameof(PhoneInfo.Mobile))
            .WithAttribute(new TextFieldAttribute { Label = "Mobile:", Mask = "(999) 999-9999" })
            .WithPatternValidation(Pattern.USPhoneNumber)
            .SubscribeTo(Customer.Select(x => x.Phone.Mobile));

         AddProperty<PrimaryPhone>(nameof(PhoneInfo.Primary))
            .WithAttribute(new DropdownListAttribute { Label = "Primary Phone:", Options = typeof(PrimaryPhone).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.Phone.Primary));
      }
   }
}
```

##### AddressForm.cs

```csharp
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class AddressForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public AddressForm()
      {
         AddProperty<string>(nameof(AddressInfo.Address1))
            .WithAttribute(new TextFieldAttribute { Label = "Address 1:" })
            .SubscribeTo(Customer.Select(x => x.Address.Address1));

         AddProperty<string>(nameof(AddressInfo.Address2))
            .WithAttribute(new TextFieldAttribute { Label = "Address 2:" })
            .SubscribeTo(Customer.Select(x => x.Address.Address2));

         AddProperty<string>(nameof(AddressInfo.City))
            .WithAttribute(new TextFieldAttribute { Label = "City:" })
            .SubscribeTo(Customer.Select(x => x.Address.City));

         AddProperty<State>(nameof(AddressInfo.State))
            .WithAttribute(new DropdownListAttribute
            {
               Label = "State:",
               Options = typeof(State).ToDescriptions()
            })
            .SubscribeTo(Customer.Select(x => x.Address.State));

         AddProperty<string>(nameof(AddressInfo.ZipCode))
            .WithAttribute(new TextFieldAttribute { Label = "Zip Code:" })
            .SubscribeTo(Customer.Select(x => x.Address.ZipCode));
      }
   }
}
```

##### DriverLicenseForm.cs

```csharp
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class DriverLicenseForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public DriverLicenseForm()
      {
         AddProperty<string>(nameof(DriverLicenseInfo.Number))
            .WithAttribute(new TextFieldAttribute { Label = "Number:" })
            .SubscribeTo(Customer.Select(x => x.DriverLicense.Number));

         AddProperty<State>(nameof(DriverLicenseInfo.State))
            .WithAttribute(new DropdownListAttribute { Label = "State:", Options = typeof(State).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.DriverLicense.State));
      }
   }
}
```

##### OtherInfoForm.cs

```csharp
using System;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class OtherInfoForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public OtherInfoForm()
      {
         AddProperty<string>(nameof(OtherInfo.SSN))
            .WithAttribute(new TextFieldAttribute { Label = "SSN:", Mask = "999-99-9999" })
            .WithPatternValidation(Pattern.USSocialSecurityNumber)
            .SubscribeTo(Customer.Select(x => x.OtherInfo.SSN));

         AddProperty<TaxFilingStatus>(nameof(OtherInfo.TaxFilingStatus))
            .WithAttribute(new DropdownListAttribute { Label = "Tax Filing Status:", Options = typeof(TaxFilingStatus).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.TaxFilingStatus));

         AddProperty<DateTimeOffset>(nameof(OtherInfo.DateOfBirth))
            .WithAttribute(new DateFieldAttribute { Label = "Date Of Birth:" })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.DateOfBirth));

         AddProperty<Gender>(nameof(OtherInfo.Gender))
            .WithAttribute(new RadioGroupAttribute { Label = "Gender:", Options = typeof(Gender).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.Gender));

         AddProperty<MaritalStatus>(nameof(OtherInfo.MaritalStatus))
            .WithAttribute(new DropdownListAttribute { Label = "Marital Status:", Options = typeof(MaritalStatus).ToDescriptions() })
            .SubscribeTo(Customer.Select(x => x.OtherInfo.MaritalStatus));
      }
   }
}
```

##### NotesForm.cs

```csharp
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class NotesForm : BaseVM
   {
      public ReactiveProperty<Customer> Customer { get; } = new ReactiveProperty<Customer>();

      public NotesForm()
      {
         AddProperty<string>(nameof(CustomerFormData.Notes))
            .WithAttribute(new TextFieldAttribute { Label = "Notes:" })
            .SubscribeTo(Customer.Select(x => x.Notes));
      }
   }
}
```

##### NewCustomerForm.cs

```csharp
using DotNetify;

namespace dotNetify_Elements
{
   public class NewCustomerForm : BaseVM
   {
      private readonly ICustomerRepository _customerRepository;

      public ReactiveProperty<Customer> NewCustomer { get; } = new ReactiveProperty<Customer>();

      public NewCustomerForm(ICustomerRepository customerRepository)
      {
         _customerRepository = customerRepository;

         AddInternalProperty<CustomerFormData>("Submit")
            .SubscribedBy(NewCustomer, formData => Save(formData));
      }

      public override void Dispose()
      {
         base.Dispose();
      }

      public Customer Save(CustomerFormData formData)
      {
         return _customerRepository.Add(formData);
      }
   }
}
```

##### CustomerFormData.cs

```csharp
using System.Collections.Generic;

namespace dotNetify_Elements
{
   using StringDictionary = Dictionary<string, string>;

   public class CustomerFormData
   {
      public StringDictionary Person { get; set; }
      public StringDictionary Phone { get; set; }
      public StringDictionary Address { get; set; }
      public StringDictionary OtherInfo { get; set; }
      public StringDictionary DriverLicense { get; set; }
      public StringDictionary Notes { get; set; }
   }
}
```