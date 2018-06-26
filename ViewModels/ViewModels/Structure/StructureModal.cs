using DotNetify;
using DotNetify.Elements;
using System.Reactive.Linq;

namespace dotNetify_Elements
{
   public class StructureModal : BaseVM
   {
      public StructureModal()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Structure.Modal.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class ModalExample : BaseVM
   {
      public ModalExample()
      {
         AddProperty<string>("Email")
            .WithAttribute(new { Label = "Email:", Placeholder = "Enter your email address" })
            .WithRequiredValidation()
            .WithPatternValidation(Pattern.Email, "Must be a valid email address.")
            .SubscribeTo(AddInternalProperty<object>("Submit").Select(_ => ""));
      }
   }
}