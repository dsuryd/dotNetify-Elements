using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class DisplayLabel : BaseVM
   {
      public DisplayLabel()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Display.Label.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}