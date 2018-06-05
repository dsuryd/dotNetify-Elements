using DotNetify;
using DotNetify.Elements;

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
         AddProperty("Title", "Registration is open");
         AddProperty("Content", "Join us December 3 - 6, 2018 in MGM Grand, NV.  See registration page for details.");
         AddProperty<object>("Register").WithAttribute(new ButtonAttribute { Label = "Register Today" });

         AddProperty("SpecialsTitle", "Lunch Specials");
         AddProperty("Specials", "Supreme Pizza + Large Drink - $8.99");
      }
   }
}