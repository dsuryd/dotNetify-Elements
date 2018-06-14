## DataGrid

The element to display data grid.

[inset]

```csharp
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
      var rowData = /* load data */

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
```

#### Source

This element incorporates https://github.com/adazzle/react-data-grid ([license: MIT](https://github.com/adazzle/react-data-grid/blob/master/LICENSE))


#### Property Types