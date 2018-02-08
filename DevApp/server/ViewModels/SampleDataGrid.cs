using System;
using System.Collections.Generic;
using Bogus;
using DotNetify;

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
         public DateTimeOffset LastVisited { get; set; }
      }

      public SampleDataGrid()
      {
         AddProperty("MyDataGrid", GetSampleData())
            .WithAttribute(this, new DataGridAttribute
            {
               Columns = new DataGridColumn[] {
                  new DataGridColumn(nameof(SampleRow.FirstName)) { Width = 40 },
                  new DataGridColumn(nameof(SampleRow.LastName)),
                  new DataGridColumn(nameof(SampleRow.EmailAddress)),
                  new DataGridColumn(nameof(SampleRow.Phone)),
                  new DataGridColumn(nameof(SampleRow.LastVisited))
                }
            });
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
            .RuleFor(o => o.LastVisited, f => f.Date.Recent(100))
            .Generate(1000);
      }
   }
}