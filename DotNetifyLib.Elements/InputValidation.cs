using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetify
{
   public abstract class Validation
   {
      public string Type => GetType().Name.Replace(nameof(Validation), "");
      public string Message { get; set; }

      public Validation(string message)
      {
         Message = message;
      }
   }

   public class RequiredValidation : Validation
   {
      public RequiredValidation(string message) : base(message)
      {
      }
   }
}
