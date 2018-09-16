using DotNetify;
using DotNetify.Elements;
using System.Linq;

namespace dotNetify_Elements
{
   public class StructureCell : BaseVM
   {
      public StructureCell()
      {
         var markdown = new Markdown("dotNetify_Elements.Docs.Structure.Cell.md");

         AddProperty("Title", markdown.Title);
         AddProperty("Overview", markdown.GetSection("", "Property Type"));
         AddProperty("API", markdown.GetSection("Property Type"));
      }
   }

   public class CellGroupExample : BaseVM
   {
      public CellGroupExample(ICustomerRepository customerRepository)
      {
         AddProperty("Customers", customerRepository.GetAll().Take(3));
      }
   }
}