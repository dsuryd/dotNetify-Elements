using DotNetify;
using DotNetify.Elements;
using System;

namespace dotNetify_Elements
{
   public class FormDateTimeField : BaseVM
   {
      public FormDateTimeField()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.DateTimeField.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class DateTimeFieldExample : BaseVM
   {
      public DateTimeFieldExample()
      {
         AddProperty<DateTime>("Date", DateTime.Now)
            .WithAttribute(this, new DateFieldAttribute
            {
               Label = "Date:"
            });

         AddProperty<DateTime>("Time", DateTime.Now)
            .WithAttribute(this, new DateFieldAttribute
            {
               Label = "Time:"
            });

         AddProperty<DateTimeOffset>("DateTime")
            .WithAttribute(this, new DateFieldAttribute
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
         AddProperty<string>("MyDateTimeField")
            .WithAttribute(this, new DateFieldAttribute
            {
               Label = "Label:"
            });
      }
   }
}