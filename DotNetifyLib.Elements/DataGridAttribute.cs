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

namespace DotNetify.Elements
{
   public class DataGridAttribute
   {
      public enum Selection
      {
         Single,
         Multiple
      }

      public string RowKey { get; set; }
      public DataGridColumn[] Columns { get; set; }
      public int Rows { get; set; }
      public string SelectedKeyProperty { get; protected set; }
      public string SelectMode { get; protected set; }

      /// <summary>
      /// Indicates the data grid is selectable.
      /// </summary>
      /// <param name="selectMode">Selection mode: single or multiple.</param>
      /// <param name="selectedKeyProperty">View model property that will receive the selected key(s).</param>
      /// <returns>The data grid object.</returns>
      public DataGridAttribute CanSelect(Selection selectMode, IReactiveProperty selectedKeyProperty)
      {
         SelectMode = selectMode.ToString();
         SelectedKeyProperty = selectedKeyProperty.Name;
         return this;
      }
   }

   public class DataGridColumn
   {
      public string Key { get; set; }
      public string Name { get; set; }
      public bool Resizeable { get; set; }
      public int? Width { get; set; }

      public DataGridColumn(string key, string name)
      {
         Key = key;
         Name = name;
      }
   }
}
