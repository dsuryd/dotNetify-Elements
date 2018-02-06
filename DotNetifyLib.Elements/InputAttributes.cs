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

namespace DotNetify
{
   public class TextFieldAttribute
   {
      public string Label { get; set; }
      public string Placeholder { get; set; }
      public int MaxLength { get; set; }
   }

   public class DateFieldAttribute
   {
      public string Label { get; set; }
      public DateTimeOffset Min { get; set; }
      public DateTimeOffset Max { get; set; }
   }

   public class DropdownListAttribute
   {
      public string Label { get; set; }
      public KeyValuePair<string, string>[] Options { get; set; }
   }

   public class MultiselectListAttribute
   {
      public string Label { get; set; }
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