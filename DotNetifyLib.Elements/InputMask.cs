/*
Copyright 2018 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

namespace DotNetify.Elements
{
   public abstract class Mask
   {
      public string Type => GetType().Name;

      public static implicit operator Mask(string mask) => new TextMask { Mask = mask };
   }

   public class NumberMask : Mask
   {
      // Text to display before the input.
      public string Prefix { get; set; } = "";

      // Text to display after the input.
      public string Suffix { get; set; } = "";

      // Separates thousands.
      public bool IncludeThousandsSeparator { get; set; } = true;

      // Character to separate thousands.
      public string ThousandsSeparatorSymbol { get; set; } = ",";

      // Allow fraction input.
      public bool AllowDecimal { get; set; }

      // Character to represent the decimal point.
      public string DecimalSymbol { get; set; } = ".";

      // Max numbers after the decimal point.
      public int DecimalLimit { get; set; } = 2;

      // Max numbers for the integer portion.
      public int IntegerLimit { get; set; }

      // Always includes a decimal point.
      public bool RequireDecimal { get; set; }

      // Allows negative number.
      public bool AllowNegative { get; set; }

      // Allows entering zeroes first.
      public bool AllowLeadingZeroes { get; set; }
   }

   public class TextMask : Mask
   {
      public static TextMask USPhoneNumber = new TextMask { Mask = "(999) 999-9999" };

      /// <summary>
      /// Mask: 9 - digits, A - alphabets, U - uppercase alphabets, * - alphanumerics.
      /// </summary>
      public string Mask { get; set; }
   }
}