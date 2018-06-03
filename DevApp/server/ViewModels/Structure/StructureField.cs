using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class StructureField : BaseVM
   {
      public StructureField()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Structure.Field.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}