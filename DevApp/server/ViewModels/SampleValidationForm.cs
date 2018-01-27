using System;
using System.Collections.Generic;
using System.Linq;
using DotNetify;

namespace dotNetify_Elements
{
   public class SampleValidationForm : BaseVM
   {
      public SampleValidationForm()
      {
         AddProperty("MyText", "")
             .WithAttribute(this, new TextFieldAttribute
             {
                Label = "Text:",
                Placeholder = "Enter required text"
             })
            .WithValidation(this, new RequiredValidation("MyText is required"));

         AddProperty("MyEmail", "")
             .WithAttribute(this, new TextFieldAttribute
             {
                Label = "Email:",
                Placeholder = "Enter email address"
             });

      }
   }
}