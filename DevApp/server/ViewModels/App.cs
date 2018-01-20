using System;
using System.Collections.Generic;
using System.Linq;
using DotNetify;
using DotNetify.Routing;

namespace dotNetify_Elements
{
   public class App : BaseVM, IRoutable
   {
      private enum Route
      {
         Home,
         FormDemo,
         HorizontalFormDemo
      }

      public RoutingState RoutingState { get; set; }

      public App()
      {
         this.RegisterRoutes("/", new List<RouteTemplate>
         {
            new RouteTemplate(nameof(Route.Home))              { UrlPattern = "", ViewUrl = nameof(Route.FormDemo) },
            new RouteTemplate(nameof(Route.FormDemo))          { UrlPattern = "form" },
            new RouteTemplate(nameof(Route.HorizontalFormDemo)){ UrlPattern = "form/horizontal" },
         });

         AddProperty("NavMenu", new NavMenu(
            new NavMenuItem[]
            {
               new NavGroup {
                  Label = "Form Elements",
                  Icon = "fa fa-list",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Vertical Form",    this.GetRoute(nameof(Route.FormDemo))),
                     new NavRoute("Horizontal Form",  this.GetRoute(nameof(Route.HorizontalFormDemo)))
                  }
               }
            }));
      }
   }
}