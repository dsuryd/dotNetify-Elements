using DotNetify;
using DotNetify.Elements;

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
   }
}