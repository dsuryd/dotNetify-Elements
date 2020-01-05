using DotNetify;
using DotNetify.Elements;
using System;
using System.Text;

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

   public class MenuExample : BaseVM
   {
      public MenuExample()
      {
      }
   }
}