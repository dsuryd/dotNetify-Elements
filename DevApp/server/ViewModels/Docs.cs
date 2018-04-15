using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class Docs : BaseVM
   {
      public Docs()
      {
         AddProperty("Overview", Utils.GetResource("dotNetify_Elements.server.Docs.Overview.md").Result);
      }
   }
}