using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class StructureCollapsible : BaseVM
   {
      public StructureCollapsible()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Structure.Collapsible.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}