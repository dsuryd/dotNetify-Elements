using DotNetify;
using System;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class RealtimeClock : BaseVM
   {
      public RealtimeClock()
      {
         var timer = Observable.Interval(TimeSpan.FromSeconds(1)).StartWith(0);

         AddProperty<string>("Clock")
            .SubscribeTo(timer.Select(_ => DateTime.Now.ToString("hh:mm:ss tt")))
            .SubscribedBy(AddInternalProperty<bool>("Update"), _ =>
            {
               PushUpdates();
               return true;
            });
      }
   }
}