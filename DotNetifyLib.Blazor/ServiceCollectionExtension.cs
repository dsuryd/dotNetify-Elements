using Microsoft.Extensions.DependencyInjection;

namespace DotNetify.Blazor
{
   public static class ServiceCollectionExtension
   {
      public static IServiceCollection UseDotNetifyBlazor(this IServiceCollection services)
      {
         services.AddTransient(typeof(IVMContext<>), typeof(VMContext<>));
         return services;
      }
   }
}