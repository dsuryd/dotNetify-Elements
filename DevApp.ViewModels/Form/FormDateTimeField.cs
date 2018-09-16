using DotNetify;
using DotNetify.Elements;
using System;

namespace dotNetify_Elements
{
   public class FormDateTimeField : BaseVM
   {
      public FormDateTimeField()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Form.DateTimeField.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class DateTimeFieldExample : BaseVM
   {
      public DateTimeFieldExample()
      {
         AddProperty<DateTimeOffset?>("Date", DateTimeOffset.Now)
            .WithAttribute(new DateFieldAttribute
            {
               Label = "Date:"
            })
            .WithRequiredValidation();

         AddProperty<DateTimeOffset?>("Time", DateTimeOffset.Now)
            .WithAttribute(new DateFieldAttribute
            {
               Label = "Time:"
            });

         AddProperty<DateTimeOffset>("DateTime")
            .WithAttribute(new DateFieldAttribute
            {
               Label = "Date/time:",
               Placeholder = "Enter date...",
               Min = DateTimeOffset.Now.AddDays(-7),
               Max = DateTimeOffset.Now.AddDays(7)
            });
      }
   }

   public class DateTimeFieldCustomize : BaseVM
   {
      public DateTimeFieldCustomize()
      {
         AddProperty<DateTimeOffset>("MyDateTimeField", DateTime.Now)
            .WithAttribute(new DateFieldAttribute
            {
               Label = "Label:",
               Placeholder = "Placeholder"
            });
      }
   }
}