#### Text Mask

Mask pattern can be of the following combinations:
- A - alphabets (both uppercase and lowercase)
- U - uppercase only
- 9 - digits
- \* - alphanumerics

#### Number Mask

Use __NumberMask__ type to format user input as currency:
```cs
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
```

#### Credits

This element incorporates https://github.com/text-mask/text-mask ([license: The Unlicense](https://github.com/text-mask/text-mask/blob/master/LICENSE))
