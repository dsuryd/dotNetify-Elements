using DotNetify;
using DotNetify.Elements;
using DotNetify.Routing;

namespace dotNetify_Elements
{
   public class StructureMenu : BaseVM
   {
      public StructureMenu()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Structure.Menu.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class MenuExample : BaseVM, IRoutable
   {
      public RoutingState RoutingState { get; set; }

      public MenuExample()
      {
         AddProperty("Menu", new Menu(
            new MenuItem[] {
               new MenuItem("Introduction", this.Redirect("", "elements/intro")),
               new MenuItem("Disabled Menu") { Disabled = true },
               new MenuSeparator(),
               new MenuGroup("Examples", new MenuItem[]
               {
                  new MenuItem("Customer Form", this.Redirect("", "elements/examples/customerform")),
                  new MenuItem("Admin Dashboard", this.Redirect("", "elements/examples/dashboard"))
               }) { Icon = "material-icons web" },
               new MenuGroup("Documentation", new MenuItem[]
               {
                  new MenuGroup("Structure", new MenuItem[]
                  {
                     new MenuItem("Menu", this.Redirect("", "elements/structure/menu"))
                  })
               })
            }
         ));
      }
   }

   public class MenuCustomize: BaseVM, IRoutable
   {
      public RoutingState RoutingState { get; set; }

      public MenuCustomize()
      {
         AddProperty("MyMenu", new Menu(
            new MenuItem[] {
               new MenuItem("Menu item 1", this.Redirect("", "menuitem1")),
               new MenuItem("Menu item 2") { Disabled = true },
               new MenuSeparator(),
               new MenuGroup("Menu group", new MenuItem[]
               {
                  new MenuItem("Menu item 3", this.Redirect("", "menuitem3")),
                  new MenuItem("Menu item 4", this.Redirect("", "menuitem4"))
               }) 
            }
         ));
      }      
   }
}