using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class NavigationNavMenu : BaseVM
   {
      public NavigationNavMenu()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Navigation.NavMenu.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class NavMenuExample : BaseVM
   {
      public NavMenuExample()
      {
      }
   }
}