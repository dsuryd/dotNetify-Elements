using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormTextAreaField : BaseVM
   {
      public FormTextAreaField()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.TextAreaField.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class TextAreaFieldExample : BaseVM
   {
      public TextAreaFieldExample()
      {
         AddProperty<string>("Comment")
            .WithAttribute(this, new TextAreaFieldAttribute
            {
               Label = "Comment:",
               Placeholder = "Leave a comment",
               MaxLength = 200,
               Rows = 4
            }).
            WithRequiredValidation(this, "You must leave a comment");
      }
   }

   public class TextAreaFieldCustomize : BaseVM
   {
      public TextAreaFieldCustomize()
      {
         AddProperty<string>("MyField")
            .WithAttribute(this, new TextAreaFieldAttribute { Label = "Label:", Placeholder = "Placeholder" });
      }
   }
}