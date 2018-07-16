using DotNetify;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MVC.Startup))]

namespace MVC
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