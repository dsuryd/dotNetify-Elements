using DotNetify;
using DotNetify.Elements;
using System.Collections.Generic;
using System.Linq;

namespace dotNetify_Elements
{
   public class NameGenderInput : BaseVM
   {
      public NameGenderInput()
      {
         AddProperty<string>("Name")
            .WithAttribute(new TextFieldAttribute { Label = "Name:", Placeholder = "Enter your name" });

         AddProperty("Gender", "")
            .WithAttribute(new DropdownListAttribute
            {
               Label = "Gender:",
               Placeholder = "Select your gender...",
               Options = new Dictionary<string, string>
               {
                  { "", "" },
                  { "M", "Male" },
                  { "F", "Female" }
               }.ToArray()
            });
      }
   }
}