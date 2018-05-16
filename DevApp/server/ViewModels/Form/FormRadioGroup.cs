using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class FormRadioGroup : BaseVM
   {
      public FormRadioGroup()
      {
         var markdown = Utils.GetResource("dotNetify_Elements.server.Docs.RadioGroup.md").Result;

         AddProperty("Overview", markdown.GetMarkdownSection(null, "Property Type"));
         AddProperty("API", markdown.GetMarkdownSection("Property Type"));
      }
   }

   public class RadioGroupExample : BaseVM
   {
      public enum Weather
      {
         Sunny,
         Cloudy,
         Rainy,
         Foggy
      }

      public RadioGroupExample()
      {
         var options = new Dictionary<Weather, string>
         {
            { Weather.Sunny, "Sunny" },
            { Weather.Cloudy, "Cloudy" },
            { Weather.Rainy, "Rainy" },
            { Weather.Foggy, "Foggy" },
         }
         .Select(kvp => KeyValuePair.Create($"{(int)kvp.Key}", kvp.Value));

         AddProperty("RadioGroup_Weather", Weather.Sunny)
            .WithAttribute(this, new RadioGroupAttribute
            {
               Label = "Weather:",
               Options = options.ToArray()
            });
      }
   }

   public class RadioGroupCustomize : BaseVM
   {
      public RadioGroupCustomize()
      {
         var options = new Dictionary<int, string>
         {
            { 1, "Option 1" },
            { 2, "Option 2" },
            { 3, "Option 3" },
         }
         .Select(kvp => KeyValuePair.Create($"{kvp.Key}", kvp.Value));

         AddProperty("MyRadioGroup", 1)
            .WithAttribute(this, new RadioGroupAttribute
            {
               Options = options.ToArray()
            });
      }
   }
}