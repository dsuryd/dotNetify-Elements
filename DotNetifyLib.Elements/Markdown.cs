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

using System.Reflection;
using System.Text.RegularExpressions;

namespace DotNetify.Elements
{
   public class Markdown
   {
      private string _content = string.Empty;

      public static implicit operator string(Markdown markdown) => markdown._content;

      // Returns the markdown title text.
      public string Title => GetTitle();

      /// <summary>
      /// Constructor.
      /// </summary>
      /// <param name="embeddedResource">Embedded resource containing markdown text.</param>
      public Markdown(string embeddedResource)
      {
         var assembly = Assembly.GetCallingAssembly();
         _content = Utils.GetResource(embeddedResource, assembly).Result;
      }

      /// <summary>
      /// Returns certain section text from the markdown content.
      /// </summary>
      /// <param name="fromHeader">Section header. If null, start from the top; if empty, start right after the main title.</param>
      /// <param name="stopAtHeader">Optional section title that marks the end.</param>
      /// <returns>Markdown section.</returns>
      public string GetSection(string fromHeader, string stopAtHeader = null)
      {
         string startPattern = fromHeader == null ? @"(.+)" : (fromHeader == "" ? $@"\r\n(.+)" : $@"(\r\n#+ {fromHeader}.+)");
         string stopPattern = !string.IsNullOrWhiteSpace(stopAtHeader) ? $@"\r\n#+ {stopAtHeader}" : "";

         Match match = Regex.Match(_content, startPattern + stopPattern, RegexOptions.Singleline | RegexOptions.Multiline);
         return match.Success ? match.Groups[1].Value : null;
      }

      /// <summary>
      /// Returns the title text of the markdown content.
      /// </summary>
      /// <returns></returns>
      private string GetTitle()
      {
         string pattern = @"^#+ (.+)";
         Match match = Regex.Match(_content, pattern);
         return match.Success ? match.Groups[1].Value : null;
      }
   }
}