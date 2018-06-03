using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class DisplayAlert : BaseVM
   {
      public DisplayAlert()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Display.Alert.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}