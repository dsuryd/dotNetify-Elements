using DotNetify;
using DotNetify.Elements;
using System;
using System.Text;

namespace dotNetify_Elements
{
   public class StructureCard : BaseVM
   {
      public StructureCard()
      {
         var markdown = new Markdown("dotNetify_Elements.server.Docs.Structure.Card.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class CardExample : BaseVM
   {
      public CardExample()
      {
         AddProperty("Title", "### Registration is open");
         AddProperty("Content", "Join us December 3 - 6, 2018 in MGM Grand, NV<br/>See registration page for details.");
         AddProperty<object>("Register").WithAttribute(new ButtonAttribute { Label = "Register Today" });
      }
   }

   public class CardImageExample : BaseVM
   {
      public CardImageExample()
      {
         var image = Utils.GetResourceAsBytes("dotNetify_Elements.server.Docs.Structure.card_image_example.jpg");

         AddProperty("Picture", $"data:image/jpeg;base64,{Convert.ToBase64String(image)}");
         AddProperty("Content", "### Our Favourite Menu\r\nFish Chip Cheese - __$22__");
      }
   }
}