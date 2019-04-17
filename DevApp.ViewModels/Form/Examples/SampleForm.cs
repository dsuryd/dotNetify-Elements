using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class SampleForm : BaseVM
   {
      private class FormData
      {
         public string MyText { get; set; }
         public string MyPassword { get; set; }
         public float MyNumber { get; set; }
         public decimal MyMoney { get; set; }
         public DateTimeOffset MyDate { get; set; }
         public string MyDropdown { get; set; }
         public string[] MyMultiselect { get; set; }
         public string MyTextArea { get; set; }
         public string MyRichText { get; set; }
         public string MyRadio { get; set; }
         public string MyRadioToggle { get; set; }
         public bool MyCheckbox { get; set; }
         public string[] MyCheckboxGroup { get; set; }
      }

      public SampleForm()
      {
         AddProperty(nameof(FormData.MyText), "")
             .WithAttribute(new TextFieldAttribute
             {
                Label = "Text:",
                Placeholder = "Enter text"
             });

         AddProperty(nameof(FormData.MyPassword), "")
             .WithAttribute(new TextFieldAttribute
             {
                Label = "Password:",
                Placeholder = "Enter password"
             });

         AddProperty<int>(nameof(FormData.MyNumber))
             .WithAttribute(new NumberFieldAttribute
             {
                Label = "Number:",
                Placeholder = "Enter number",
                Min = 0,
                Max = 999
             });

         AddProperty<decimal>(nameof(FormData.MyMoney))
             .WithAttribute(new TextFieldAttribute
             {
                Label = "Money:",
                Placeholder = "Enter amount",
                Prefix = "$",
                MaxLength = 11,
                Mask = new NumberMask
                {
                   IncludeThousandsSeparator = true,
                   AllowDecimal = true,
                   DecimalLimit = 2
                }
             });

         AddProperty(nameof(FormData.MyDate), DateTimeOffset.Now)
             .WithAttribute(new DateFieldAttribute
             {
                Label = "Date:",
                Min = DateTimeOffset.Now.AddMonths(-1),
                Max = DateTimeOffset.Now.AddMonths(6)
             });

         AddProperty(nameof(FormData.MyDropdown), "D3")
             .WithAttribute(new DropdownListAttribute
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

         AddProperty(nameof(FormData.MyMultiselect), new string[] { "M1", "M4" })
             .WithAttribute(new DropdownListAttribute
             {
                Label = "Multiselect list:",
                Options = new Dictionary<string, string>
                {
                  { "M1", "Multiselect 1" },
                  { "M2", "Multiselect 2" },
                  { "M3", "Multiselect 3" },
                  { "M4", "Multiselect 4" },
                  { "M5", "Multiselect 5" }
                }.ToArray()
             });

         AddProperty(nameof(FormData.MyTextArea), "")
             .WithAttribute(new TextAreaFieldAttribute { Label = "Text area:", Placeholder = "Enter text", Rows = 3 });

         AddProperty(nameof(FormData.MyRichText), "")
         .WithAttribute(new RichTextEditorAttribute { Label = "Rich text editor:", Placeholder = "Enter rich text" });

         AddProperty(nameof(FormData.MyRadio), "R1")
             .WithAttribute(new RadioGroupAttribute
             {
                Label = "Radio Group:",
                Options = new Dictionary<string, string>
                {
                  { "R1", "Radio 1" },
                  { "R2", "Radio 2" },
                  { "R3", "Radio 3" }
                }.ToArray()
             });

         AddProperty(nameof(FormData.MyRadioToggle), "R2")
             .WithAttribute(new RadioGroupAttribute
             {
                Label = "Radio Toggle:",
                Options = new Dictionary<string, string>
                {
                  { "R1", "Radio 1" },
                  { "R2", "Radio 2" },
                  { "R3", "Radio 3" }
                }.ToArray()
             });

         AddProperty(nameof(FormData.MyCheckbox), true)
             .WithAttribute(new CheckboxAttribute { Label = "Check me" });

         AddProperty(nameof(FormData.MyCheckboxGroup), new string[] { "C1", "C3" })
             .WithAttribute(new RadioGroupAttribute
             {
                Label = "Checkbox Group:",
                Options = new Dictionary<string, string>
                {
                  { "C1", "Checkbox 1" },
                  { "C2", "Checkbox 2" },
                  { "C3", "Checkbox 3" }
                }.ToArray()
             });

         AddProperty<string>("SubmitSuccess")
            .SubscribeTo(
               AddInternalProperty<FormData>("Submit").Select(data => SuccessMessage(data)));
      }

      private string SuccessMessage(FormData data) =>
         // Written in Github-flavored markdown format:
         $@"**Submitted:**<br/>
         MyText: {Bold(data.MyText)}<br/>
         MyPassword: {Bold(data.MyPassword)}<br/>
         MyNumber: {Bold(data.MyNumber)}<br/>
         MyMoney: {Bold(data.MyMoney)}<br/>
         MyDate: {Bold(data.MyDate)}<br/>
         MyDropdown: {Bold(data.MyDropdown)}<br/>
         MyMultiselect: {Bold(string.Join(", ", data.MyMultiselect))}<br/>
         MyTextArea: {Bold(data.MyTextArea)}<br/>
         MyRichText: {Bold(data.MyRichText)}<br/>
         MyRadio: {Bold(data.MyRadio)}<br/>
         MyRadioToggle: {Bold(data.MyRadioToggle)}<br/>
         MyCheckbox: {Bold(data.MyCheckbox)}<br/>
         MyCheckboxGroup: {Bold(string.Join(", ", data.MyCheckboxGroup))}";

      private string Bold(object text) => text != null && !string.IsNullOrWhiteSpace(text.ToString()) ? $"<b>{text}</b>" : "";
   }
}