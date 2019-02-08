using Bogus;
using DotNetify;
using DotNetify.Elements;
using System;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class DisplayDataGrid : BaseVM
   {
      public DisplayDataGrid()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Display.DataGrid.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }

      public class DataGridExample : BaseVM
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

         public DataGridExample()
         {
            var rowData = GetSampleData(20);

            AddProperty("Contacts", rowData)
               .WithAttribute(
                  new DataGridAttribute
                  {
                     RowKey = nameof(Contact.Id),
                     Columns = new DataGridColumn[] {
                     new DataGridColumn(nameof(Contact.Id), "Id") { Width = 3, Resizable = false, Sortable = false },
                     new DataGridColumn(nameof(Contact.FirstName), "First Name") { Editable = true },
                     new DataGridColumn(nameof(Contact.LastName), "Last Name")  { Editable = true },
                     new DataGridColumn(nameof(Contact.Phone), "Phone")  { Editable = true },
                     new DataGridColumn(nameof(Contact.LastVisit), "Last Visit")
                     },
                     Rows = 10
                  }
                  .CanSelect(
                     DataGridAttribute.Selection.Single,
                     AddProperty("SelectedId", rowData.First().Id)
                        .SubscribedBy(AddProperty<string>("SelectedEmail"), id => rowData.First(row => row.Id == id).EmailAddress)
                  )
                  .OnEdit(AddInternalProperty<dynamic>("HandleEdit"))
               );
         }

         protected List<Contact> GetSampleData(int numSamples)
         {
            int id = 1;
            return new Faker<Contact>()
               .CustomInstantiator(f => new Contact { Id = id++ })
               .RuleFor(o => o.FirstName, f => f.Name.FirstName())
               .RuleFor(o => o.LastName, f => f.Name.LastName())
               .RuleFor(o => o.Phone, f => f.Person.Phone)
               .RuleFor(o => o.EmailAddress, (f, u) => f.Internet.Email(u.FirstName, u.LastName))
               .RuleFor(o => o.LastVisit, f => f.Date.Recent(100))
               .Generate(numSamples);
         }
      }

      public class DataGridCustomize : BaseVM
      {
         public DataGridCustomize()
         {
            var rowData = new List<object>
            {
               new { Column1 = 1, Column2 = "Data 1.2", Column3 = "Data 1.3" },
               new { Column1 = 2, Column2 = "Data 2.2", Column3 = "Data 2.3" },
               new { Column1 = 3, Column2 = "Data 3.2", Column3 = "Data 3.3" },
            };

            AddProperty("MyDataGrid", rowData)
               .WithAttribute(
                  new DataGridAttribute
                  {
                     RowKey = "Column1",
                     Columns = new DataGridColumn[] {
                        new DataGridColumn("Column1", "Column 1"),
                        new DataGridColumn("Column2", "Column 2"),
                        new DataGridColumn("Column3", "Column 3")
                     }
                  }
               );
         }
      }
   }
}