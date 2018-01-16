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
using DotNetify.Routing;

namespace DotNetify
{
   public class NavMenu : List<NavMenuItem>
   {
      public NavMenu(NavMenuItem[] navMenuItems) : base(navMenuItems)
      {
      }
   }

   public class NavMenuItem
   {
      public string Label { get; set; }
      public string Icon { get; set; }
   }

   public class NavGroup : NavMenuItem
   {
      public bool IsExpanded { get; set; }

      public NavRoute[] Routes { get; set; }
   }

   public class NavRoute : NavMenuItem
   {
      public Route Route { get; set; }
   }
}