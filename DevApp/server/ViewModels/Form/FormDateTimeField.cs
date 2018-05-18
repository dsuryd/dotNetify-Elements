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
         AddProperty<DateTimeOffset>("Date")
            .WithAttribute(this, new DateFieldAttribute
            {
               Label = "Date:",
               Min = new DateTimeOffset(new DateTime(1900, 1, 1)),
               Max = DateTimeOffset.Now
            });

         AddProperty<DateTimeOffset>("Time")
            .WithAttribute(this, new DateFieldAttribute
            {
               Label = "Time:",
               Min = new DateTimeOffset(new DateTime(1900, 1, 1)),
               Max = DateTimeOffset.Now
            });

         AddProperty<DateTimeOffset>("DateTime")
            .WithAttribute(this, new DateFieldAttribute
            {
               Label = "Date/time:",
               Min = new DateTimeOffset(new DateTime(1900, 1, 1)),
               Max = DateTimeOffset.Now
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