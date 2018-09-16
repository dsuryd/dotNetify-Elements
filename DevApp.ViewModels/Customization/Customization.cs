using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Customization : BaseVM
   {
      public string Content => new Markdown("dotNetify_Elements.Docs.Customization.md");
   }

   public class SubComponentExample : BaseVM
   {
      public SubComponentExample() 
      {
         AddProperty<string>("Name")
            .WithAttribute(new TextFieldAttribute
            {
               Label = "Name:",
               Placeholder = "Enter your name"
            });
      }
   }
}