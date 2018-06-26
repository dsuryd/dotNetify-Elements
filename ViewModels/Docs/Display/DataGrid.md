## DataGrid

The element to display data grid. The columns are resizable and sortable by default.  Default column plain text rendering can be overridden by adding _GridColumn_ elements with a custom formatter function as attribute.

Single or multi-selection can be enabled on the view model.  Selection made on the client will be automatically dispatched to the specified view model property.

[inset]

```csharp
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
      var rowData = /* get sample data */

      AddProperty("Contacts", rowData)
         .WithAttribute(
            new DataGridAttribute
            {
               RowKey = nameof(Contact.Id),
               Columns = new DataGridColumn[] {
               new DataGridColumn(nameof(Contact.Id), "Id") { Width = 3, Resizable = false, Sortable = false },
               new DataGridColumn(nameof(Contact.FirstName), "First Name"),
               new DataGridColumn(nameof(Contact.LastName), "Last Name"),
               new DataGridColumn(nameof(Contact.Phone), "Phone"),
               new DataGridColumn(nameof(Contact.LastVisit), "Last Visit")
               },
               Rows = 10
            }
            .CanSelect(
               DataGridAttribute.Selection.Single,
               AddProperty("SelectedId", rowData.First().Id)
                  .SubscribedBy(AddProperty<string>("SelectedEmail"), id => rowData.First(row => row.Id == id).EmailAddress)
            )
         );
   }
}
```

#### Source

This element incorporates https://github.com/adazzle/react-data-grid ([license: MIT](https://github.com/adazzle/react-data-grid/blob/master/LICENSE))


#### Property Types

##### DataGrid
```jsx
static propTypes = {
   // Identifies the associated view model property.
   id: PropTypes.string.isRequired,

   // Enables selection.
   enable: PropTypes.bool,

   // Sets custom height.
   height: PropTypes.string,

   // Sets custom row height.
   rowHeight: PropTypes.string,

   // Occurs when an item is selected.
   onSelect: PropTypes.func
};
```

##### GridColumn
```jsx
static propTypes = {
   // Content formatter.
   formatter: PropTypes.func,

   // Sets custom width.
   width: PropTypes.string
};
```

#### Server-side Attribute

```csharp
public class DataGridAttribute
{
   public enum Selection { Single, Multiple }

   // Key to the column that contains the primary data key.
   public string RowKey { get; set; }

   // Data columns.
   public DataGridColumn[] Columns { get; set; }

   // Number of visible rows.
   public int? Rows { get; set; }

   // View model property that keeps the key to the selected row. Don't use directly, call CanSelect instead.
   public string SelectedKeyProperty { get; protected set; }

   // Whether it is single-select or mult-select. Don't use directly, call CanSelect instead.
   public string SelectMode { get; protected set; }

   /// <summary>
   /// Indicates the data grid is selectable.
   /// </summary>
   /// <param name="selectMode">Selection mode: single or multiple.</param>
   /// <param name="selectedKeyProperty">View model property that will receive the selected key(s).</param>
   /// <returns>The data grid object.</returns>
   public DataGridAttribute CanSelect(Selection selectMode, IReactiveProperty selectedKeyProperty);
}

public class DataGridColumn
{
   // Unique key to identify the column.
   public string Key { get; set; }

   // Column label.
   public string Label { get; set; }

   // Allows resize.
   public bool Resizable { get; set; } = true;

   // Allows sort.
   public bool Sortable { get; set; } = true;

   // Sets custom width.
   public int? Width { get; set; }
}
```