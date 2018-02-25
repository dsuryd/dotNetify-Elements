using System.Collections.Generic;
using DotNetify;
using DotNetify.Elements;
using DotNetify.Routing;

namespace dotNetify_Elements
{
   public class App : BaseVM, IRoutable
   {
      private enum Route
      {
         Home,
         FormDemo,
         FormValidationDemo,
         DataGridDemo
      }

      public RoutingState RoutingState { get; set; }

      public App()
      {
         this.RegisterRoutes("/", new List<RouteTemplate>
         {
            new RouteTemplate(nameof(Route.Home))                 { UrlPattern = "", ViewUrl = nameof(Route.FormDemo) },
            new RouteTemplate(nameof(Route.FormDemo))             { UrlPattern = "form" },
            new RouteTemplate(nameof(Route.FormValidationDemo))   { UrlPattern = "form/validation" },
            new RouteTemplate(nameof(Route.DataGridDemo))         { UrlPattern = "datagrid" },
         });

         AddProperty("NavMenu", new NavMenu(
            new NavMenuItem[]
            {
               new NavGroup
               {
                  Label = "Form",
                  Icon = "fa fa-edit",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Form Elements",   this.GetRoute(nameof(Route.FormDemo))),
                     new NavRoute("Validation", this.GetRoute(nameof(Route.FormValidationDemo)))
 
                  }
               },
               new NavRoute("Data Grid", this.GetRoute(nameof(Route.DataGridDemo)), "fa fa-table")
            }));
      }
   }
}