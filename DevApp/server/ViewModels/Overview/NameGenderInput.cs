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
            .WithAttribute(this, new TextFieldAttribute { Label = "Name:", Placeholder = "Enter your name" });

         AddProperty("Gender", "")
            .WithAttribute(this, new DropdownListAttribute
            {
               Label = "Gender:",
               Options = new Dictionary<string, string>
               {
                  { "", "Select your gender" },
                  { "M", "Male" },
                  { "F", "Female" }
               }.ToArray()
            });
      }
   }
}