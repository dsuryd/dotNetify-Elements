using DotNetify;
using DotNetify.Elements;
using System;
using System.Linq;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class DisplayChart : BaseVM
   {
      public DisplayChart()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Display.Chart.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class ChartExample : BaseVM
   {
      public ChartExample()
      {
         var random = new Random();
         var timer = Observable.Interval(TimeSpan.FromSeconds(1)).StartWith(0);
         var initialValues = Enumerable.Range(1, 10).Select(x => random.Next(1, 10));

         AddProperty<int>("LineData")
            .SubscribeTo(timer.Select(_ => random.Next(1, 10)))
            .SubscribedBy(AddInternalProperty<bool>("Update"), _ =>
            {
               PushUpdates();
               return true;
            })
            .StartWith(initialValues);
      }
   }

   public class ChartCustomize : BaseVM
   {
      public ChartCustomize()
      {
         var random = new Random();
         var initialValues = Enumerable.Range(1, 10).Select(x => random.Next(1, 10));

         AddProperty<int>("LineData")
            .StartWith(initialValues);
      }
   }
}