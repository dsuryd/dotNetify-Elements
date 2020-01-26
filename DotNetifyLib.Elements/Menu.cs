﻿/*
Copyright 2019 Dicky Suryadi

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

namespace DotNetify.Elements
{
   public class Menu : List<MenuItem>
   {
      public Menu(MenuItem[] menuItems) : base(menuItems)
      {
      }
   }

   public class MenuItem
   {
      public string Label { get; set; }
      public string Icon { get; set; }
      public bool Disabled { get; set; }
      public Route Route { get; set; }

      public MenuItem()
      {
      }

      public MenuItem(string label, Route route = null, string icon = null)
      {
         Label = label;
         Route = route;
         Icon = icon;
      }
   }

   public class MenuGroup : MenuItem
   {
      public MenuItem[] SubMenu { get; set; }

      public MenuGroup()
      {
      }

      public MenuGroup(string label, MenuItem[] subMenu)
      {
         Label = label;
         SubMenu = subMenu;
      }
   }

   public class MenuSeparator : MenuItem
   {
   }
}