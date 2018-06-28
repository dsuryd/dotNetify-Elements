using DotNetify;
using DotNetify.Elements;
using DotNetify.Routing;

namespace dotNetify_Elements
{
   public class NavigationNavMenu : BaseVM
   {
      public NavigationNavMenu()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Navigation.NavMenu.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class NavMenuExample : BaseVM, IRoutable
   {
      public RoutingState RoutingState { get; set; }

      public NavMenuExample()
      {
         AddProperty("NavMenu", new NavMenu(
            new NavMenuItem[]
            {
                  new NavRoute("Introduction",  this.Redirect("", "elements/intro")),
                  new NavGroup
                  {
                     Label = "Form",
                     Routes = new NavRoute[]
                     {
                        new NavRoute("Basic Demo",  this.Redirect("", "elements/form/demo"))
                     },
                     IsExpanded = false
                  },
                  new NavGroup
                  {
                     Label = "Examples",
                     Routes = new NavRoute[]
                     {
                        new NavRoute("Customer Info",  this.Redirect("", "elements/examples/customer-info"), "far fa-list-alt")
                     }
                  }
            }));
      }
   }

   public class NavMenuCustomize : BaseVM, IRoutable
   {
      public RoutingState RoutingState { get; set; }

      public NavMenuCustomize()
      {
         AddProperty("MyNavMenu", new NavMenu(
            new NavMenuItem[]
            {
                  new NavRoute("NavRoute",  this.Redirect("", "navroute")),
                  new NavGroup
                  {
                     Label = "NavGroup",
                     Routes = new NavRoute[]
                     {
                        new NavRoute("Nav Route 1.1",  this.Redirect("", "navroute1_1")),
                        new NavRoute("Nav Route 1.2",  this.Redirect("", "navroute1_2"))
                     }
                  }
            }));
      }
   }
}