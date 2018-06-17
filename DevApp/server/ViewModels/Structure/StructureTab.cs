using DotNetify;
using DotNetify.Elements;
using System;

namespace dotNetify_Elements
{
   public class StructureTab : BaseVM
   {
      public StructureTab()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Structure.Tab.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class TabExample : BaseVM
   {
      public TabExample()
      {
         var image = Utils.GetResourceAsBytes("dotNetify_Elements.server.Docs.Structure.card_image_example.jpg");

         AddProperty("Home", "### Home\r\n" +
            "Our menu rotates with the seasons in order to make the most of market availability. We source whole animals from small family farms, " +
            "local and North Atlantic seafood stocks, and local, organic produce whenever possible.All of our herbs and specialty botanicals are " +
            "grown on - site in the organic garden.\r\n  \r\n_We’re taking it back to basics, and it sure does taste good_.");

         AddProperty("Menu", "### Menu\r\n[inset]");
         AddProperty("MenuPicture", image.ToBase64Image(Utils.Image.Jpeg));

         AddProperty("About", "### About\r\n" +
            "We open early in the morning with fresh baked goods and breakfast sandwiches. Throughout the afternoon and evening, we offer " +
            "made - to - order sandwiches, slow - roasted rotisserie chicken, seasonal sides and a selection of beer and wine to toast the day.");
      }
   }
}