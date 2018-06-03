using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class DisplayMarkdown : BaseVM
   {
      public DisplayMarkdown()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Display.Markdown.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}