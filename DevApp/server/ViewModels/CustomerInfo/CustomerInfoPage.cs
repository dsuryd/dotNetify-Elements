using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   using StringDictionary = Dictionary<string, string>;

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

      public class FormData
      {
         public StringDictionary Person { get; set; }
         public StringDictionary Phone { get; set; }
         public StringDictionary OtherInfo { get; set; }
         public StringDictionary DriverLicense { get; set; }
         public StringDictionary Notes { get; set; }
      }

      public CustomerInfoPage(ICustomerRepository customerRepository)
      {
         _customerRepository = customerRepository;

         _selectedContact = AddProperty<string>("SelectedContact");

         AddProperty("Contacts", customerRepository.GetAll().Select(customer => ToContact(customer)))
            .WithItemKey(this, nameof(Contact.Id))
            .WithAttribute(this, new DataGridAttribute
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

         AddProperty<FormData>("Submit")
            .SubscribedBy(AddProperty<bool>("SubmitSuccess"), x => x.Select(formData => Save(formData)));
      }

      public override void OnSubVMCreated(BaseVM subVM)
      {
         // Have the sub-form subscribes to the customer data grid's selection changed event.
         var customerPropInfo = subVM.GetType().GetProperty(nameof(Customer));
         if (typeof(ReactiveProperty<Customer>).IsAssignableFrom(customerPropInfo.PropertyType))
            _selectedContact.SubscribedBy(
               customerPropInfo.GetValue(subVM) as ReactiveProperty<Customer>,
               x => x.Select(id => _customerRepository.Get(id))
            );
      }

      private bool Save(FormData formData)
      {
         var id = (string)_selectedContact.Value;
         var customer = _customerRepository.Update(id, formData.Person, formData.Phone, 
            formData.OtherInfo, formData.DriverLicense, formData.Notes);

         this.UpdateList("Contacts", ToContact(customer));
         return true;
      }

      private Contact ToContact(Customer customer) => new Contact
      {
         Id = customer.Id,
         Name = customer.Name.FullName,
         Address = customer.Address.StreetAddress,
         City = customer.Address.City,
         ZipCode = customer.Address.Zipcode,
         Phone = customer.Phone.PrimaryNumber
      };
   }
}