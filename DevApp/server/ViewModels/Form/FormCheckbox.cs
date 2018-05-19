using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormCheckbox : BaseVM
   {
      public FormCheckbox()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.Checkbox.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class CheckboxExample : BaseVM
   {
      public CheckboxExample()
      {
         AddProperty<bool>("Agree")
            .WithAttribute(this, new CheckboxAttribute
            {
               Label = "I have read and agree to the Terms of Service"
            });
      }
   }

   public class CheckboxCustomize : BaseVM
   {
      public CheckboxCustomize()
      {
         AddProperty<string>("MyCheckbox").WithAttribute(this, new { Label = "Checkbox" });
      }
   }
}