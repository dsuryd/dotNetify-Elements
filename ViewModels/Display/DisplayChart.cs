using DotNetify;
using DotNetify.Elements;
using System;
using System.Collections.Generic;
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

         var initialValues = Enumerable.Range(1, 30).Select(x => new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" }).ToArray();

         AddProperty("Waveform", initialValues)
            .WithAttribute(new ChartAttribute { XAxisLabel = "in/sec", YAxisLabel = "Time (second)" });
      }
   }

   public class ChartCustomize : BaseVM
   {
      public ChartCustomize()
      {
         var random = new Random();
         var data = Enumerable.Range(1, 10).Select(x => new KeyValuePair<string, float>($"{x}", random.Next(1, 10))).ToArray();

         AddProperty("LineData", data);
      }
   }
}