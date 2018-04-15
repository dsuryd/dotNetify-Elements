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
         Overview,
         FormDemo,
         FormValidationDemo,
         DataGridDemo,
         CustomerInfoPage
      }

      public RoutingState RoutingState { get; set; }

      public App()
      {
         this.RegisterRoutes("/", new List<RouteTemplate>
         {
            new RouteTemplate(nameof(Route.Home))                 { UrlPattern = "", ViewUrl = nameof(Route.Overview) },
            new RouteTemplate(nameof(Route.Overview))             { UrlPattern = "overview" },
            new RouteTemplate(nameof(Route.FormDemo))             { UrlPattern = "form" },
            new RouteTemplate(nameof(Route.FormValidationDemo))   { UrlPattern = "form/validation" },
            new RouteTemplate(nameof(Route.DataGridDemo))         { UrlPattern = "datagrid" },
            new RouteTemplate(nameof(Route.CustomerInfoPage))  { UrlPattern = "examples/customer-info" },
         });

         AddProperty("NavMenu", new NavMenu(
            new NavMenuItem[]
            {
               new NavRoute("Overview", this.GetRoute(nameof(Route.Overview))),
               new NavGroup
               {
                  Label = "Form",
                  Icon = "far fa-edit",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Form Elements",   this.GetRoute(nameof(Route.FormDemo))),
                     new NavRoute("Validation", this.GetRoute(nameof(Route.FormValidationDemo)))
                  }
               },
               new NavRoute("Data Grid", this.GetRoute(nameof(Route.DataGridDemo)), "far fa-list-alt"),
               new NavGroup
               {
                  Label = "Examples",
                  Icon = "far fa-id-card",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Customer Info Page",   this.GetRoute(nameof(Route.CustomerInfoPage))),
                  }
               },
            }));
      }
   }
}