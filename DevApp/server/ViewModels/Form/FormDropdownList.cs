using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class FormDropdownList : BaseVM
   {
      public FormDropdownList()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.DropdownList.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class DropdownListExample : BaseVM
   {
      public enum TaxFilingStatus
      {
         None,
         Single,
         MarriedFilingJointly,
         MarriedFilingSeparately,
         HeadOfHousehold,
         QualifyingWidowWidower
      }

      public DropdownListExample()
      {
         var options = new Dictionary<TaxFilingStatus, string>
         {
            { TaxFilingStatus.None, ""},
            { TaxFilingStatus.Single, "Single" },
            { TaxFilingStatus.MarriedFilingJointly, "Married Filing Jointly" },
            { TaxFilingStatus.MarriedFilingSeparately, "Married Filing Separately" },
            { TaxFilingStatus.HeadOfHousehold, "Head of Household" },
            { TaxFilingStatus.QualifyingWidowWidower, "Qualifying Widow(er) with Dependent Child" }
         }
         .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

         AddProperty<TaxFilingStatus>("FilingStatus")
            .WithAttribute(this, new DropdownListAttribute
            {
               Label = "Filing status:",
               Placeholder = "Select one...",
               Options = options.ToArray()
            })
            .WithRequiredValidation(this);
      }
   }

   public class DropdownListCustomize : BaseVM
   {
      public DropdownListCustomize()
      {
         var options = new Dictionary<string, string>
         {
            { "na", "" },
            { "c1", "Choice 1" },
            { "c2", "Choice 2" },
            { "c3", "Choice 3" },
            { "c4", "Choice 4" },
            { "c5", "Choice 5" },
         };

         AddProperty<string>("MyDropdownList")
            .WithAttribute(this, new DropdownListAttribute
            {
               Label = "Label:",
               Placeholder = "Placeholder",
               Options = options.ToArray()
            });
      }
   }
}