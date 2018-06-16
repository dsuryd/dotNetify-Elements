using System;
using System.Collections.Generic;
using System.Linq;
using Bogus;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class SampleDataGrid : BaseVM
   {
      public class Contact
      {
         public int Id { get; set; }
         public string FirstName { get; set; }
         public string LastName { get; set; }
         public string EmailAddress { get; set; }
         public string Phone { get; set; }
         public DateTimeOffset LastVisit { get; set; }
      }

      public SampleDataGrid()
      {
         var rowData = GetSampleData();

         AddProperty("Contacts", rowData)
            .WithAttribute(
               new DataGridAttribute
               {
                  RowKey = nameof(Contact.Id),
                  Columns = new DataGridColumn[] {
                     new DataGridColumn(nameof(Contact.Id), "Id") { Width = 3, Resizeable = false, Sortable = false },
                     new DataGridColumn(nameof(Contact.FirstName), "First Name"),
                     new DataGridColumn(nameof(Contact.LastName), "Last Name"),
                     new DataGridColumn(nameof(Contact.EmailAddress), "Email"),
                     new DataGridColumn(nameof(Contact.Phone), "Phone"),
                     new DataGridColumn(nameof(Contact.LastVisit), "Last Visit")
                  }
               }
               .CanSelect(
                  DataGridAttribute.Selection.Single,
                  AddProperty("SelectedContactId", rowData.First().Id)
               )
            );
      }

      protected List<Contact> GetSampleData()
      {
         int id = 1;
         return new Faker<Contact>()
            .CustomInstantiator(f => new Contact { Id = id++ })
            .RuleFor(o => o.FirstName, f => f.Name.FirstName())
            .RuleFor(o => o.LastName, f => f.Name.LastName())
            .RuleFor(o => o.EmailAddress, (f, u) => f.Internet.Email(u.FirstName, u.LastName))
            .RuleFor(o => o.Phone, f => f.Person.Phone)
            .RuleFor(o => o.LastVisit, f => f.Date.Recent(100))
            .Generate(20);
      }
   }
}