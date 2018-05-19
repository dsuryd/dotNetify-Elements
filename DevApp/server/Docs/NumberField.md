The element to accept whole number input.  

[inset]

```cs
public class NumberFieldExample : BaseVM
{
   public NumberFieldExample()
   {
      AddProperty<int?>("HeightFeet")
         .WithAttribute(this, new NumberFieldAttribute
         {
            Label = "Height (ft):",
            Placeholder = "Feet",
            Suffix = "'",
            Min = 0,
            Max = 8
         })
         .WithRangeValidation(this, 0, 8, "Must be between 0' and 8'");

      AddProperty<int?>("HeightInches")
         .WithAttribute(this, new NumberFieldAttribute
         {
            Label = "Height (in):",
            Placeholder = "Inches",
            Suffix = "''",
            Min = 0,
            Max = 11
         })
         .WithMinValidation(this, 0, "Must be at least 0''")
         .WithMaxValidation(this, 11, "Must be at most 11''");
   }
}
```

#### Property Types

Same as [TextField](textfield).


#### Server-side Attributes

```cs
public class NumberFieldAttribute
{
   // Label text of the field.
   public string Label { get; set; }

   // Placeholder text to display when the field is empty.
   public string Placeholder { get; set; }

   // Text to display before the field.
   public string Prefix { get; set; }

   // Text to display after the field.
   public string Suffix { get; set; }

   // Input mask, can be number mask or text mask.
   public Mask Mask { get; set; }

   // Min value.
   public int? Min { get; set; }

   // Max value.
   public int? Max { get; set; }
}
```