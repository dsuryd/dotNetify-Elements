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
      public class SampleRow
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

         AddProperty("MyDataGrid", rowData)
            .WithAttribute(new DataGridAttribute
            {
               RowKey = nameof(SampleRow.Id),
               Columns = new DataGridColumn[] {
                  new DataGridColumn(nameof(SampleRow.Id), "Id") { Width = 3 },
                  new DataGridColumn(nameof(SampleRow.FirstName), "First Name") { Sortable = true },
                  new DataGridColumn(nameof(SampleRow.LastName), "Last Name") { Sortable = true },
                  new DataGridColumn(nameof(SampleRow.EmailAddress), "Email")  { Sortable = true },
                  new DataGridColumn(nameof(SampleRow.Phone), "Phone")  { Sortable = true },
                  new DataGridColumn(nameof(SampleRow.LastVisit), "Last Visit")  { Sortable = true }
                }
            }
               .CanSelect(
                  DataGridAttribute.Selection.Single,
                  AddProperty("SelectedGridKey", rowData.First().Id)
                )
            );
      }

      private static List<SampleRow> GetSampleData()
      {
         int id = 1;
         return new Faker<SampleRow>()
            .CustomInstantiator(f => new SampleRow { Id = id++ })
            .RuleFor(o => o.FirstName, f => f.Name.FirstName())
            .RuleFor(o => o.LastName, f => f.Name.LastName())
            .RuleFor(o => o.EmailAddress, (f, u) => f.Internet.Email(u.FirstName, u.LastName))
            .RuleFor(o => o.Phone, f => f.Person.Phone)
            .RuleFor(o => o.LastVisit, f => f.Date.Recent(100))
            .Generate(100);
      }
   }
}