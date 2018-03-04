using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public partial class CustomerInfoPage : BaseVM
   {
      private readonly ICustomerRepository _customerRepository;
      private readonly ReactiveProperty<string> _selectedContact;

      public class Contact
      {
         public int Id { get; set; }
         public string Name { get; set; }
         public string Phone { get; set; }
         public string Address { get; set; }
         public string City { get; set; }
         public string ZipCode { get; set; }
      }

      public CustomerInfoPage(ICustomerRepository customerRepository)
      {
         _customerRepository = customerRepository;

         var contacts = customerRepository.GetAll()
            .Select(customer => new Contact
            {
               Id = customer.Id,
               Name = customer.Name.FullName,
               Address = customer.Address.StreetAddress,
               City = customer.Address.City,
               ZipCode = customer.Address.Zipcode,
               Phone = customer.Phone.PrimaryNumber
            });

         _selectedContact = AddProperty<string>("SelectedContact");

         AddProperty("Contacts", contacts)
            .WithAttribute(this, new DataGridAttribute
            {
               RowKey = nameof(Contact.Id),
               Columns = new DataGridColumn[] {
                  new DataGridColumn(nameof(Contact.Name), "Name"),
                  new DataGridColumn(nameof(Contact.Phone), "Phone"),
                  new DataGridColumn(nameof(Contact.Address), "Address"),
                  new DataGridColumn(nameof(Contact.City), "City"),
                  new DataGridColumn(nameof(Contact.ZipCode), "ZipCode")
                }
            }.CanSelect(DataGridAttribute.Selection.Single, _selectedContact));
      }

      public override void OnSubVMCreated(BaseVM subVM)
      {
         if (subVM is CustomerFormVM)
            _selectedContact.SubscribedBy((subVM as CustomerFormVM).Customer, x => x.Select(id => _customerRepository.Get(int.Parse(id))));
      }
   }

   public class CustomerFormVM : BaseVM
   {
      private readonly ReactiveProperty<Customer> _customer = new ReactiveProperty<Customer>();

      public ReactiveProperty<Customer> Customer => _customer;

      public CustomerFormVM()
      {
         AddProperty<string>("FirstName")
            .WithAttribute(this, new TextFieldAttribute { Label = "First Name:" })
            .SubscribeTo(_customer.Select(x => x.Name.FirstName));

         AddProperty<string>("LastName")
            .WithAttribute(this, new TextFieldAttribute { Label = "Last Name:" })
            .SubscribeTo(_customer.Select(x => x.Name.LastName));
      }
   }
}