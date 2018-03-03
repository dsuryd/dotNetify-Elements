using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using Bogus;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public partial class CustomerInfoPage : BaseVM
   {
      public class Contact
      {
         public int Id { get; set; }
         public string Name { get; set; }
         public string Phone { get; set; }
         public string Address { get; set; }
         public string City { get; set; }
         public string ZipCode { get; set; }
      }

      public CustomerInfoPage()
      {
         var customers = GetSampleData();
         var contacts = customers.Select(customer => new Contact
         {
            Id = customer.Id,
            Name = customer.Name.FullName,
            Address = customer.Address.StreetAddress,
            City = customer.Address.City,
            ZipCode = customer.Address.Zipcode,
            Phone = customer.Phone.PrimaryNumber
         });

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
            }
               .CanSelect(
                  DataGridAttribute.Selection.Single,
                  AddProperty<string>("SelectedContact")
                     .SubscribedBy(AddProperty<NameInfo>("Name"), x => x.Select(id => customers.FirstOrDefault(cust => cust.Id == int.Parse(id)).Name))
                )
            );
      }
   }
}