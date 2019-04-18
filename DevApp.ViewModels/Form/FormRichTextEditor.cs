using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class FormRichTextEditor : BaseVM
   {
      public FormRichTextEditor()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Form.RichTextEditor.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class RichTextEditorExample : BaseVM
   {
      public RichTextEditorExample()
      {
         AddProperty<string>("Notes")
            .WithAttribute(new RichTextEditorAttribute
            {
               Label = "Notes:",
               Placeholder = "Enter your notes here"
            });
      }
   }

   public class CustomToolbarExample : RichTextEditorExample
   {
   }   

   public class RichTextEditorCustomize : BaseVM
   {
      public RichTextEditorCustomize()
      {
         AddProperty<string>("MyField")
            .WithAttribute(new RichTextEditorAttribute { Label = "Label:", Placeholder = "Placeholder" });
      }
   }
}