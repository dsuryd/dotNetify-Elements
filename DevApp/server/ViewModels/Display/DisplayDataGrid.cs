using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class DisplayDataGrid : BaseVM
   {
      public DisplayDataGrid()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Display.DataGrid.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }

      public class DataGridExample : SampleDataGrid { }

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
                        new DataGridColumn("Column1", "Column 1") { Sortable = true, Resizeable = true },
                        new DataGridColumn("Column2", "Column 2") { Sortable = true, Resizeable = true },
                        new DataGridColumn("Column3", "Column 3") { Sortable = true, Resizeable = true }
                     }
                  }
               );
         }
      }
   }
}