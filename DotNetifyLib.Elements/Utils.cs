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
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DotNetify.Elements
{
   public static class Utils
   {
      /// <summary>
      /// Returns description attribute values of enum values.
      /// </summary>
      /// <param name="enumType">Enum type.</param>
      /// <returns>Peir of description string and the enum value.</returns>
      public static KeyValuePair<string, string>[] ToDescriptions(this Type enumType)
      {
         return Enum.GetValues(enumType).Cast<int>().Select(enumValue =>
         {
            var value = Enum.GetName(enumType, enumValue);
            value = enumType.GetField(value).GetCustomAttribute<DescriptionAttribute>()?.Description ?? value;
            return new KeyValuePair<string, string>(enumValue.ToString(), value);
         }).ToArray();
      }

      /// <summary>
      /// Returns an embedded resource.
      /// </summary>
      /// <param name="resourceName">Resource name.</param>
      /// <returns>The embedded resource.</returns>
      public static async Task<string> GetResource(string resourceName)
      {
         var assembly = Assembly.GetEntryAssembly();
         var resourceStream = assembly.GetManifestResourceStream(resourceName);
         if (resourceStream == null)
            throw new FileNotFoundException($"'{resourceName}' is not an embedded resource", resourceName);

         using (var reader = new StreamReader(resourceStream, Encoding.UTF8))
         {
            return await reader.ReadToEndAsync();
         }
      }
   }
}