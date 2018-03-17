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
                  new DataGridColumn(nameof(Contact.Name), "Name") { Sortable = true },
                  new DataGridColumn(nameof(Contact.Phone), "Phone") { Sortable = true },
                  new DataGridColumn(nameof(Contact.Address), "Address") { Sortable = true },
                  new DataGridColumn(nameof(Contact.City), "City") { Sortable = true },
                  new DataGridColumn(nameof(Contact.ZipCode), "ZipCode") { Sortable = true }
                },
               Rows = 5
            }.CanSelect(DataGridAttribute.Selection.Single, _selectedContact));

         AddProperty<object>("Submit");
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
   }
}