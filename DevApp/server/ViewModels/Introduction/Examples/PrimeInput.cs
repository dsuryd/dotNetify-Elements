using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class PrimeInput : BaseVM
   {
      public PrimeInput()
      {
         AddProperty<int?>("Prime")
            .WithAttribute(new TextFieldAttribute
            {
               Label = "Number:",
               Placeholder = "Enter a prime number between 2 and 100"
            })
            .WithRequiredValidation()
            .WithMinValidation(2)
            .WithMaxValidation(100)
            .WithServerValidation(ValidatePrimeNumber, "Not a prime number");
      }

      private bool ValidatePrimeNumber(int? number)
      {
         if (number != null && number >= 2 && number <= 100)
            for (int i = 2; i < number; i++)
               if (number % i == 0) return false;
         return true;
      }
   }
}