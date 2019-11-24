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

   public class LineChartExample : BaseVM
   {
      public LineChartExample()
      {
         var timer = Observable.Interval(TimeSpan.FromSeconds(1));

         var data = Enumerable.Range(1, 30).Select(x => new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" }).ToArray();

         AddProperty("Waveform", data)
            .WithAttribute(new ChartAttribute
            {
               XAxisLabel = "Time (second)",
               YAxisLabel = "in/sec",
               YAxisMin = -1,
               YAxisMax = 1,
               MaxDataSize = 30
            });

         timer.Subscribe(x =>
         {
            x += 31;
            this.AddList("Waveform", new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" });
            PushUpdates();
         });
      }
   }

   public class BarChartExample : BaseVM
   {
      public BarChartExample()
      {
         var random = new Random();
         int[] data = Enumerable.Range(1, 12).Select(x => random.Next(500, 1000)).ToArray();

         AddProperty("MonthlySales", data)
            .WithAttribute(new ChartAttribute
            {
               YAxisLabel = "Revenue (US$)",
               Labels = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" }
            });
      }
   }

   public class PieChartExample : BaseVM
   {
      public PieChartExample()
      {
         var random = new Random();
         var data = new Dictionary<string, double>
         {
            { "cpu", 0.2 },
            { "mem", 0.4 },
            { "dsk", 0.3 }
         }.ToArray();

         AddProperty("Utilization", data)
            .WithAttribute(new ChartAttribute
            {
               Labels = new string[] { "CPU", "Memory", "Disk" }
            });

         AddProperty("Utilization_itemKey", "Key");

         AddProperty<object>("Refresh")
            .Subscribe(_ => this.UpdateList("Utilization", new { Key = "mem", Value = random.NextDouble() }));
      }
   }

   public class ChartCustomize : BaseVM
   {
      public ChartCustomize()
      {
         var random = new Random();
         var data = Enumerable.Range(1, 30).Select(x => new string[] { $"{x}", $"{Math.Sin(x / Math.PI)}" }).ToArray();

         AddProperty("Chart", data);
      }
   }
}