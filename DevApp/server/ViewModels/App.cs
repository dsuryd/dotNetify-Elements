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
         TextField,
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
            new RouteTemplate(nameof(Route.TextField))            { UrlPattern = "form/textfield" },
            new RouteTemplate(nameof(Route.FormDemo))             { UrlPattern = "form/demo" },
            new RouteTemplate(nameof(Route.FormValidationDemo))   { UrlPattern = "form/validationdemo" },
            new RouteTemplate(nameof(Route.DataGridDemo))         { UrlPattern = "list/datagrid" },
            new RouteTemplate(nameof(Route.CustomerInfoPage))     { UrlPattern = "examples/customer-info" },
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
                     new NavRoute("TextField",   this.GetRoute(nameof(Route.TextField))),
                     new NavRoute("Form Demo",   this.GetRoute(nameof(Route.FormDemo))),
                     new NavRoute("Validation Demo", this.GetRoute(nameof(Route.FormValidationDemo)))
                  }
               },
               new NavGroup
               {
                  Label = "List",
                  Icon = "far fa-list-alt",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Data Grid", this.GetRoute(nameof(Route.DataGridDemo)), "far fa-list-alt"),
                  }
               },

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