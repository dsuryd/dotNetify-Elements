using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using Newtonsoft.Json;

namespace dotNetify_Elements
{
   public class SampleForm : BaseVM
   {
      private class FormData
      {
         public string MyText { get; set; }
         public string MyPassword { get; set; }
         public string MyDropdown { get; set; }
         public string MyTextArea { get; set; }
         public string MyRadio { get; set; }
         public bool MyCheckbox { get; set; }
         public string MyCheckboxGroup { get; set; }
      }

      public SampleForm()
      {
         AddProperty("MyText", "")
             .WithAttribute(this, new TextFieldAttribute
             {
                Label = "Text:",
                Placeholder = "Enter text",
                MaxLength = 10
             });

         AddProperty("MyPassword", "")
             .WithAttribute(this, new TextFieldAttribute
             {
                Label = "Password:",
                Placeholder = "Enter password"
             });

         AddProperty("MyDropdown", "D3")
             .WithAttribute(this, new DropdownListAttribute
             {
                Label = "Dropdown list:",
                Options = new Dictionary<string, string>
                {
                  { "D1", "Dropdown 1" },
                  { "D2", "Dropdown 2" },
                  { "D3", "Dropdown 3" },
                  { "D4", "Dropdown 4" },
                  { "D5", "Dropdown 5" }
                }.ToArray()
             });

         AddProperty("MyTextArea", "")
             .WithAttribute(this, new TextFieldAttribute { Label = "Text area:", Placeholder = "Enter text" });

         AddProperty("MyRadio", "R1")
             .WithAttribute(this, new RadioGroupAttribute
             {
                Label = "Radio Group:",
                Options = new Dictionary<string, string>
                {
                  { "R1", "Radio 1" },
                  { "R2", "Radio 2" },
                  { "R3", "Radio 3" }
                }.ToArray()
             });

         AddProperty("MyCheckbox", true)
             .WithAttribute(this, new CheckboxAttribute { Label = "Check me" });

         AddProperty("MyCheckboxGroup", new string[] { "C1", "C3" })
             .WithAttribute(this, new RadioGroupAttribute
             {
                Label = "Checkbox Group:",
                Options = new Dictionary<string, string>
                {
                  { "C1", "Checkbox 1" },
                  { "C2", "Checkbox 2" },
                  { "C3", "Checkbox 3" }
                }.ToArray()
             });

         AddProperty<string>("Alert")
            .SubscribeTo(
               AddProperty<Action<dynamic>>("Submit")
                  .Select(data => JsonConvert.SerializeObject(data)));
      }
   }
}