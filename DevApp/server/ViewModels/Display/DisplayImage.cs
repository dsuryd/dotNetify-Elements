using DotNetify;
using DotNetify.Elements;
using System;

namespace dotNetify_Elements
{
   public class DisplayImage : BaseVM
   {
      public DisplayImage()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Display.Image.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class ImageExample : BaseVM
   {
      public ImageExample()
      {
         var image = Utils.GetResourceAsBytes("dotNetify_Elements.server.Docs.Structure.card_image_example.jpg");
         AddProperty("Picture", image.ToBase64Image(Utils.Image.Jpeg));
      }
   }
}