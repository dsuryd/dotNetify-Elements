using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class FormCheckboxGroup : BaseVM
   {
      public FormCheckboxGroup()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Form.CheckboxGroup.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class CheckboxGroupExample : BaseVM
   {
      public enum Choice { A, B, C, D, E, F }

      public CheckboxGroupExample()
      {
         var choices = new Dictionary<Choice, string>
         {
            { Choice.A, "Sound waves" },
            { Choice.B, "Visible light" },
            { Choice.C, "X rays" },
            { Choice.D, "Ultraviolet radiation" },
            { Choice.E, "Gamma rays" },
            { Choice.F, "Microwave radiation" },
         }
         .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

         AddProperty<string>("Quizz")
            .WithAttribute(new CheckboxGroupAttribute
            {
               Label = "Which of the following is part of the electromagnetic spectrum:",
               Options = choices.ToArray()
            });
      }
   }

   public class CheckboxGroupCustomize : BaseVM
   {
      public CheckboxGroupCustomize()
      {
         var choices = new Dictionary<string, string>
         {
            { "c1", "Choice 1" },
            { "c2", "Choice 2" },
            { "c3", "Choice 3" }
         };

         AddProperty<string>("MyCheckboxGroup", "c2")
            .WithAttribute(new CheckboxGroupAttribute { Label = "Label:", Options = choices.ToArray() });
      }
   }
}