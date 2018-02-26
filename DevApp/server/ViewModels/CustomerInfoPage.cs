using System;
using System.Collections.Generic;
using Bogus;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class CustomerInfoPage : BaseVM
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
         AddProperty("Contacts", GetSampleData())
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
                  AddProperty<string[]>("SelectedContact")
                )
            );
      }

      private static List<Contact> GetSampleData()
      {
         int id = 1;
         return new Faker<Contact>()
            .CustomInstantiator(f => new Contact { Id = id++ })
            .RuleFor(o => o.Name, f => f.Person.FullName)
            .RuleFor(o => o.Phone, f => f.Phone.PhoneNumber("(###) ###-####"))
            .RuleFor(o => o.Address, f => f.Address.StreetAddress())
            .RuleFor(o => o.City, f => f.Address.City())
            .RuleFor(o => o.ZipCode, f => f.Address.ZipCode())
            .Generate(100);
      }
   }
}