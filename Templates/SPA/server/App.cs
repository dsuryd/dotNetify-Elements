using System.Collections.Generic;
using DotNetify;
using DotNetify.Elements;
using DotNetify.Routing;

namespace spa_template
{
   public class App : BaseVM, IRoutable
   {
      private enum Route
      {
         Home,
         Dashboard
      }

      public RoutingState RoutingState { get; set; }

      public App()
      {
         this.RegisterRoutes("elements", new List<RouteTemplate>
         {
            new RouteTemplate(nameof(Route.Home))        { UrlPattern = "", ViewUrl = nameof(Route.Dashboard) },
            new RouteTemplate(nameof(Route.Dashboard))   { UrlPattern = "admin" },
        });

         AddProperty("NavMenu", new NavMenu(
            new NavMenuItem[]
            {
               new NavRoute("Dashboard", this.GetRoute(nameof(Route.Dashboard))),
            }));
      }
   }
}