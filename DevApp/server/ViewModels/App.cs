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
         HorizontalFormDemo,
         ValidationFormDemo,
         DataGridDemo
      }

      public RoutingState RoutingState { get; set; }

      public App()
      {
         this.RegisterRoutes("/", new List<RouteTemplate>
         {
            new RouteTemplate(nameof(Route.Home))                 { UrlPattern = "", ViewUrl = nameof(Route.FormDemo) },
            new RouteTemplate(nameof(Route.FormDemo))             { UrlPattern = "form" },
            new RouteTemplate(nameof(Route.HorizontalFormDemo))   { UrlPattern = "form/horizontal" },
            new RouteTemplate(nameof(Route.ValidationFormDemo))   { UrlPattern = "form/validation" },
            new RouteTemplate(nameof(Route.DataGridDemo))         { UrlPattern = "datagrid" },
         });

         AddProperty("NavMenu", new NavMenu(
            new NavMenuItem[]
            {
               new NavGroup
               {
                  Label = "Form Elements",
                  Icon = "fa fa-edit",
                  Routes = new NavRoute[]
                  {
                     new NavRoute("Vertical Form",    this.GetRoute(nameof(Route.FormDemo))),
                     new NavRoute("Horizontal Form",  this.GetRoute(nameof(Route.HorizontalFormDemo))),
                     new NavRoute("Validation Form",  this.GetRoute(nameof(Route.ValidationFormDemo)))
                     
                  }
               },
               new NavRoute("Data Grid", this.GetRoute(nameof(Route.DataGridDemo)), "fa fa-table")
            }));
      }
   }
}