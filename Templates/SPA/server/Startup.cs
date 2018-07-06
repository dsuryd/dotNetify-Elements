using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;
using DotNetify;

namespace spa_template
{
   public class Startup
   {
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddMemoryCache();
         services.AddSignalR();
         services.AddDotNetify();

         services.AddTransient<ILiveDataService, MockLiveDataService>();
         services.AddScoped<ICustomerRepository, CustomerRepository>();
      }

      public void Configure(IApplicationBuilder app)
      {
         app.UseWebSockets();
         app.UseSignalR(routes => routes.MapDotNetifyHub());
         app.UseDotNetify(config =>
         {
            config.UseDeveloperLogging();
         });

         app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
         {
            HotModuleReplacement = true,
            HotModuleReplacementClientOptions = new Dictionary<string, string> { { "reload", "true" } },
         });

         app.UseStaticFiles();

         app.Run(async (context) =>
         {
            var uri = context.Request.Path.ToUriComponent();
            if (uri.EndsWith(".map"))
               return;
            else if (uri.EndsWith("_hmr") || uri.Contains("hot-update"))  // Fix HMR for deep links.
               context.Response.Redirect(Regex.Replace(uri, ".+/dist", "/dist"));

            using (var reader = new StreamReader(File.OpenRead("wwwroot/index.html")))
               await context.Response.WriteAsync(reader.ReadToEnd());
         });
      }
   }
}