using DotNetify;
using DotNetify.Elements;
using System;
using System.Reactive.Linq;

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

   public class LabelExample : BaseVM
   {
      public LabelExample()
      {
         var timer = Observable.Interval(TimeSpan.FromSeconds(1)).StartWith(0);

         AddProperty<string>("Clock")
            .SubscribeTo(timer.Select(_ => DateTime.Now.ToString("hh:mm:ss tt")))
            .SubscribedBy(AddInternalProperty<bool>("Update"), _ =>
            {
               PushUpdates();
               return true;
            });

         AddProperty("NotificationLabel", "Notifications");
         AddProperty("NotificationCount", 3);
      }
   }
}