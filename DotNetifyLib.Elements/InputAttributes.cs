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

using System;
using System.Collections.Generic;

namespace DotNetify.Elements
{
   public class TextFieldAttribute
   {
      // Label text of the field.
      public string Label { get; set; }

      // Placeholder text to display when the field is empty.
      public string Placeholder { get; set; }

      // Text to display before the field.
      public string Prefix { get; set; }

      // Text to display after the field.
      public string Suffix { get; set; }

      // Input max length.
      public int? MaxLength { get; set; }

      // Input mask, can be number mask or text mask.
      public Mask Mask { get; set; }
   }

   public class TextAreaFieldAttribute
   {
      // Label text of the field.
      public string Label { get; set; }

      // Placeholder text to display when the field is empty.
      public string Placeholder { get; set; }

      // Text to display before the field.
      public string Prefix { get; set; }

      // Text to display after the field.
      public string Suffix { get; set; }

      // Input max length.
      public int? MaxLength { get; set; }

      // Number of rows of the input area.
      public int? Rows { get; set; }
   }

   public class DateFieldAttribute
   {
      public string Label { get; set; }
      public string Prefix { get; set; }
      public string Suffix { get; set; }
      public DateTimeOffset Min { get; set; } = DateTimeOffset.MinValue;
      public DateTimeOffset Max { get; set; } = DateTimeOffset.MaxValue;
   }

   public class DropdownListAttribute
   {
      public string Label { get; set; }
      public string Prefix { get; set; }
      public string Suffix { get; set; }
      public KeyValuePair<string, string>[] Options { get; set; }
   }

   public class MultiselectListAttribute
   {
      public string Label { get; set; }
      public string Prefix { get; set; }
      public string Suffix { get; set; }
      public KeyValuePair<string, string>[] Options { get; set; }
   }

   public class RadioGroupAttribute
   {
      public string Label { get; set; }
      public KeyValuePair<string, string>[] Options { get; set; }
   }

   public class CheckboxAttribute
   {
      public string Label { get; set; }
   }

   public class CheckboxGroupAttribute
   {
      public string Label { get; set; }
      public KeyValuePair<string, string> Options { get; set; }
   }
}