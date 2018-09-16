using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class FormRadioToggle : BaseVM
   {
      public FormRadioToggle()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Form.RadioToggle.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class RadioToggleExample : BaseVM
   {
      public enum Position
      {
         Left,
         Middle,
         Right
      }

      public RadioToggleExample()
      {
         var options = new Dictionary<Position, string>
         {
            { Position.Left, "Left" },
            { Position.Middle, "Middle" },
            { Position.Right, "Right" },
         }
         .Select(kvp => new KeyValuePair<string, string>($"{(int)kvp.Key}", kvp.Value));

         AddProperty("Position", Position.Middle)
            .WithAttribute(new RadioGroupAttribute
            {
               Label = "Position:",
               Options = options.ToArray()
            });
      }
   }

   public class RadioToggleCustomize : BaseVM
   {
      public RadioToggleCustomize()
      {
         var options = new Dictionary<int, string>
         {
            { 1, "Option 1" },
            { 2, "Option 2" },
            { 3, "Option 3" },
         }
         .Select(kvp => new KeyValuePair<string, string>($"{kvp.Key}", kvp.Value));

         AddProperty("MyRadioToggle", 1)
            .WithAttribute(new RadioGroupAttribute
            {
               Options = options.ToArray()
            });
      }
   }
}