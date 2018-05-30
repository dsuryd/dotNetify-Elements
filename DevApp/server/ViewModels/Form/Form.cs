using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Form : BaseVM
   {
      public Form()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.Form.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}