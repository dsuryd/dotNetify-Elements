using Microsoft.Extensions.DependencyInjection;

namespace DotNetify.Blazor
{
   public static class ServiceCollectionExtension
   {
      public static IServiceCollection UseDotNetifyBlazor(this IServiceCollection services)
      {
         services.AddTransient(typeof(IVMProxy), typeof(VMProxy));
         return services;
      }
   }
}