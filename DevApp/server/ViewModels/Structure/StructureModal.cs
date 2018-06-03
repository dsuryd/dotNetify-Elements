using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class StructureModal : BaseVM
   {
      public StructureModal()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Structure.Modal.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}