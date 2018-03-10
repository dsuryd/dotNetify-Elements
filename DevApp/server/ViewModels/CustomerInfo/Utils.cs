using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace dotNetify_Elements
{
   public static class Utils
    {
      public static KeyValuePair<string, string>[] ToDescriptions(this Type enumType)
      {
         return Enum.GetValues(enumType).Cast<int>().Select(enumValue =>
         {
            var value = Enum.GetName(enumType, enumValue);
            value = enumType.GetField(value).GetCustomAttribute<DescriptionAttribute>()?.Description ?? value;
            return new KeyValuePair<string, string>(enumValue.ToString(), value);
         }).ToArray();
      }
   }
}
