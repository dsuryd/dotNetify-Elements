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

   public class AlertExample : BaseVM
   {
      public string Feedback => "### Thank you!\r\n" +
         "Your request has been received.  " +
         "We will review it and will be in touch shortly.  If you have any further questions you can contact us [here](mailto:support@bogus.io).";
   }
}