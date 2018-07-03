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
         var timer = Observable.Interval(TimeSpan.FromSeconds(1));

         var initialWaveform = Enumerable.Range(1, 30).Select(x => new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" }).ToArray();

         AddProperty("Waveform", initialWaveform)
            .WithAttribute(new ChartAttribute { XAxisLabel = "Time (second)", YAxisLabel = "in/sec", MaxDataSize = 30 });

         timer.Subscribe(x => 
         {
            x += 31;
            this.AddList("Waveform", new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" });
            PushUpdates();
         });

         AddProperty("MonthlySales", Enumerable.Range(1, 12).Select(x => random.Next(500, 1000)).ToArray())
            .WithAttribute(new ChartAttribute 
            { 
               YAxisLabel = "Revenue (US$)",
               Labels = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" } 
            })
            .SubscribeTo(timer.Select(_ => Enumerable.Range(1, 12).Select(x => random.Next(500, 1000)).ToArray()));

         AddProperty("Utilization", Enumerable.Range(1, 3).Select(x => random.NextDouble() * 100).ToArray())
            .WithAttribute(new ChartAttribute 
            { 
               Labels = new string[] { "CPU", "Memory", "Disk" } 
            })
            .SubscribeTo(timer.Select(_ => Enumerable.Range(1, 3).Select(x => random.NextDouble() * 100).ToArray()));         
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