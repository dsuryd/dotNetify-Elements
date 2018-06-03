using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class StructureCard : BaseVM
   {
      public StructureCard()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Structure.Card.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}