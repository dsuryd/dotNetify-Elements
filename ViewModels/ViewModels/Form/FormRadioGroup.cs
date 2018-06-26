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
         var markdown = new Markdown("dotNetify_Elements.Docs.Form.RadioGroup.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
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
         .Select(kvp => new KeyValuePair<string, string>($"{(int)kvp.Key}", kvp.Value));

         AddProperty("Weather", Weather.Sunny)
            .WithAttribute(new RadioGroupAttribute
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
         .Select(kvp => new KeyValuePair<string, string>($"{kvp.Key}", kvp.Value));

         AddProperty("MyRadioGroup", 1)
            .WithAttribute(new RadioGroupAttribute
            {
               Options = options.ToArray()
            });
      }
   }
}