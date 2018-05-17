using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class FormMultiselectList : BaseVM
   {
      public FormMultiselectList()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.MultiselectList.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class MultiselectListExample : BaseVM
   {
      public enum VisitPurpose
      {
         Holiday,
         Business,
         Education,
         Employment,
         Medical,
         Transit,
         Other
      }

      public MultiselectListExample()
      {
         var options = new Dictionary<VisitPurpose, string>
         {
            { VisitPurpose.Holiday, "Holiday" },
            { VisitPurpose.Business, "Business" },
            { VisitPurpose.Education, "Education" },
            { VisitPurpose.Employment, "Employment" },
            { VisitPurpose.Medical, "Medical" },
            { VisitPurpose.Transit, "Transit" },
            { VisitPurpose.Other, "Other" },
         }
         .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

         AddProperty<VisitPurpose[]>("VisitPurpose")
            .WithAttribute(this, new DropdownListAttribute
            {
               Label = "Purpose of visit:",
               Placeholder = "Select all that apply",
               Options = options.ToArray()
            });
      }
   }

   public class MultiselectListCustomize : BaseVM
   {
      public MultiselectListCustomize()
      {
         var options = new Dictionary<string, string> 
         {
            { "c1", "Choice 1" },
            { "c2", "Choice 2" },
            { "c3", "Choice 3" },
            { "c4", "Choice 4" },
            { "c5", "Choice 5" },
         };

         AddProperty<string>("MyMultiselectList")
            .WithAttribute(this, new DropdownListAttribute
            {
               Label = "Label:",
               Placeholder = "Placeholder",
               Options = options.ToArray()
            });
      }
   }
}