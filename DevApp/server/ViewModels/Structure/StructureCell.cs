﻿using DotNetify;
using DotNetify.Elements;

namespace dotNetify_Elements
{
   public class StructureCell : BaseVM
   {
      public StructureCell()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Structure.Cell.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }
}