using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class StructureTab : BaseVM
   {
      public StructureTab()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Structure.Tab.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}