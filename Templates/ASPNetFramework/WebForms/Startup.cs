using DotNetify;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(WebForms.Startup))]

namespace WebForms
{
   public class Startup
   {
      public void Configuration(IAppBuilder app)
      {
         app.Map("/signalr", map => map.RunSignalR());
         app.UseDotNetify(config => config.RegisterAssembly(GetType().Assembly));
      }
   }
}