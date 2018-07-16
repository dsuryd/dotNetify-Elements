using DotNetify;
using DotNetify.Elements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;

namespace MVC
{
   public class Demo : BaseVM
   {
      public Demo()
      {
         AddProperty("Greetings", "Hello World");

         var timer = Observable.Interval(TimeSpan.FromSeconds(1));

         var random = new Random();
         var data = new Dictionary<string, double>
         {
            { "cpu", 0.2 },
            { "mem", 0.4 },
            { "dsk", 0.3 }
         }.ToArray();

         AddProperty("Utilization", data)
            .WithItemKey("Key")
            .WithAttribute(new ChartAttribute
            {
               Labels = new string[] { "CPU", "Memory", "Disk" }
            });

         timer.Subscribe(x =>
         {
            this.UpdateList("Utilization", new { Key = "mem", Value = random.NextDouble() });
            PushUpdates();
         });
      }
   }
}