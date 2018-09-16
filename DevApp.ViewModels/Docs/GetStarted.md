## Get Started

#### SPA Template

The easiest way to get started to use the basic SPA template that contains some of the examples from this website, and also include a functional login page with JWT authentication.

Prerequisites: 
- Node.js
- .NET Core SDK (v2.1 and up)

Download the template from nuget from the command line, then create your project:

```js
dotnet new -i dotnetify.react.template

dotnet new elements -o MyApp
cd MyApp
npm i
dotnet watch run
```

#### New ASP.NET Core

The following steps will create a new ASP.NET Core project that uses WebPack to build the client-side code and auto-reload the browser when changes are made.

Prerequisites: 
- Node.js
- .NET Core SDK (v2.1 and up)


**Create Project**

Create an empty ASP.NET Core web project from the command line:

```js
dotnet new web -o MyApp
cd MyApp
dotnet add package DotNetify.SignalR
dotnet add package DotNetify.Elements
dotnet add package System.Reactive.Compatibility
```


**Configure Startup**

Open **Startup.cs** and replace the content with the following:

```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using DotNetify;

namespace MyApp
{
   public class Startup
   {
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddMemoryCache();
         services.AddSignalR();
         services.AddDotNetify();
      }

      public void Configure(IApplicationBuilder app)
      {
         app.UseWebSockets();
         app.UseSignalR(routes => routes.MapDotNetifyHub());
         app.UseDotNetify();

         app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
         {
            HotModuleReplacement = true,
            HotModuleReplacementClientOptions = new Dictionary<string, string> { { "reload", "true" } },
         });

         app.UseStaticFiles();
         app.Run(async (context) =>
         {
            using (var reader = new StreamReader(File.OpenRead("wwwroot/index.html")))
               await context.Response.WriteAsync(reader.ReadToEnd());
         });
      }
   }
}

```

**Configure NPM**

Add **package.json** with the following content:

```json
{
  "version": "1.0.0",
  "name": "my-app",
  "private": true,
  "scripts": {
    "build": "webpack",
    "prod": "webpack --mode production"
  },
  "babel": {
    "presets": [
      "env",
      "react"
    ],
    "plugins": [
      "babel-plugin-styled-components",
      "babel-plugin-transform-object-rest-spread",
      "babel-plugin-transform-class-properties"
    ]
  },
  "devDependencies": {
    "aspnet-webpack": "~3.0.0",
    "babel-core": "~6.26.3",
    "babel-loader": "~7.1.4",
    "babel-plugin-styled-components": "~1.5.1",
    "babel-plugin-transform-class-properties": "~6.24.1",
    "babel-plugin-transform-object-rest-spread": "~6.26.0",
    "babel-preset-env": "~1.7.0",
    "babel-preset-react": "~6.24.1",
    "css-loader": "~0.28.11",
    "dotnetify": "~3.0.1",
    "dotnetify-elements": "~0.1.0",
    "react": "~16.3.2",
    "react-dom": "~16.3.2",
    "url-loader": "~1.0.1",
    "webpack": "~4.12.0",
    "webpack-cli": "~3.0.8",
    "webpack-dev-middleware": "~3.1.3",
    "webpack-hot-middleware": "~2.22.2"
  }
}
```

Install the packages from the command line:
```js
npm i
```

**Configure WebPack**

Add **webpack.config.js** with the following content:

```js
'use strict';

module.exports = {
	mode: 'development',
	entry: {
		app: './client/main.js'
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/wwwroot/dist',
		publicPath: '/dist/'
	},
	resolve: {
		modules: [ 'client', 'node_modules' ],
		extensions: [ '.js', '.jsx' ]
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, use: 'css-loader' },
			{ test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
			{ test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader' }
		]
	}
};
```


**Add Index Page**

Create a new file **/wwwroot/index.html** with the following content:
```html
<html>
    <head>
       <meta charset="utf-8">
       <meta name="viewport" content="initial-scale=1, width=device-width"/>
       <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" />
       <link href="/dist/app.css" rel="stylesheet" />
    </head>
    <body>
       <div id="App"></div>
        <script src="/dist/app.js"></script>
    </body>
</html>
```


**Add Client Source Code**

Add a new source code **client/main.js** with the following content:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Main, Section, Card, Element, Frame, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
	<VMContext vm="MyApp">
		<Main>
			<Section>
				<Frame>
					<Card>
						<Element id="Greetings" />
					</Card>
				</Frame>
			</Section>
		</Main>
	</VMContext>
);

ReactDOM.render(<MyApp />, document.getElementById('App'));
```


**Add View Model Source Code**

Add a new file **MyApp.cs** with the following content:
```csharp
using DotNetify;
using System;

namespace MyApp
{
	public class MyApp : BaseVM
	{
	   public MyApp()
	   {
		  AddProperty("Greetings", "Hello World");
	   }
	}
}
```


**Build and Run**

Run the WebPack bundler, then launch the application the command line:
```
npm run build
dotnet watch run
```

Open the browser to *http://localhost:5000*.  If you make changes on client- or server-side, the application will rebuild and the browser reload.


#### Existing ASP.NET Framework

The following steps will insert a demo page to an existing ASP.NET Framework project.  We'll start from the _ASP.NET Web Application (.NET Framework)_  template that Visual Studio generates, and use _MVC_.  But the same can also apply with _WebForms_.

Prerequisites: 
- .NET Framework 4.6 or up.

Similar code is also available in [this github repo](https://github.com/dsuryd/dotNetify-Elements/tree/master/Templates/ASPNetFramework).

**Add NuGet**

Use the NuGet Package Manager to add the following packages:
- DotNetify.SignalR.Owin
- DotNetify.Elements
- System.Reactive.Compatibility

**Add OWIN Startup**

Add a new file **Startup.cs** with the following content:

```csharp
using DotNetify;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MyApplication.Startup))]
namespace MyApplication
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
```

**Add Script Tags**

Update **Views\Shared\_Layout.cshtml** by adding:
- links to Bootstrap v4, and _dotNetify-Elements_ stylesheets.   There's some incompatibility with Bootstrap v3 that came with ASP.NET template, so we also add some style overrides to fix the issue with the nav bar.
- all the required scripts from CDN before the closing _body_ tag.

```html
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>@ViewBag.Title - My ASP.NET Application</title>

   <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" />
   <link href="https://unpkg.com/dotnetify-elements@0.1.1/dotnetify-elements.css" rel="stylesheet"></link>
   <style>
      .navbar .container { flex-wrap: nowrap; }
      ul.navbar-nav { flex-direction: row; }
   </style>   

   @Styles.Render("~/Content/css")
   @Scripts.Render("~/bundles/modernizr")
</head>
<body>
   <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
         <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
            </button>
            @Html.ActionLink("Application name", "Index", "Home", new { area = "" }, new { @class = "navbar-brand" })
         </div>
         <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
               <li>@Html.ActionLink("Home", "Index", "Home")</li>
               <li>@Html.ActionLink("About", "About", "Home")</li>
               <li>@Html.ActionLink("Contact", "Contact", "Home")</li>
            </ul>
         </div>
      </div>
   </div>
   <div class="container body-content">
      @RenderBody()
      <hr />
      <footer>
         <p>&copy; @DateTime.Now.Year - My ASP.NET Application</p>
      </footer>
   </div>

   @Scripts.Render("~/bundles/jquery")
   @Scripts.Render("~/bundles/bootstrap")
   @RenderSection("scripts", required: false)

   <script src="https://unpkg.com/react@16.3.2/umd/react.production.min.js"></script>
   <script src="https://unpkg.com/react-dom@16.3.2/umd/react-dom.production.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/styled-components/3.3.3/styled-components.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.js"></script>
   <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
   <script src="https://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-2.2.2.min.js"></script>
   <script>
      // Replace dotnetify-hub in bundle.min.js with the SignalR for .NET FX version.
      signalR = jQuery.signalR;
   </script>
   <script src="https://unpkg.com/dotnetify@3.0.1/dist/dotnetify-hub.js"></script>
   <script src="https://unpkg.com/dotnetify@3.0.1/dist/dotnetify-react.min.js"></script>
   <script src="https://unpkg.com/dotnetify-elements@0.1.1/lib/dotnetify-elements.bundle.js"></script>   
</body>
</html>
```

**Add Client Source Code**

Add a new file **Scripts/demo.js** with the following JSX code:

```jsx
const { Main, Section, Card, Element, Frame, VMContext } = dotNetifyElements;

const Demo = _ => (
   <VMContext vm="Demo">
      <Main>
         <Section>
            <Frame>
               <Card>
                  <Element id="Greetings" />
               </Card>
            </Frame>
         </Section>
      </Main>
   </VMContext>
);

ReactDOM.render(<Demo />, document.getElementById('Mount'));
```

The last part is the instruction for _React_ to render the _Demo_ component on the HTML tag with its _id_ equals to _Mount_.

**Add Mounting Tag**

Find a place where you want to mount the component, and add the HTML tag there.  In our case here, we'll just put it in the "About" page. Update **Views/Home/About.cshtml** with the following content:

```html
@{
   ViewBag.Title = "About";
}
<h2>@ViewBag.Title.</h2>

<div id="Mount"></div>
<script type="text/babel" src="~/Scripts/demo.js"></script>
```

> **NOTE**: We're using Babel to transpile the JSX code on-the-fly.  It's quick to set up, but carries performance penalty.  If this poses an issue, use a build tool like WebPack instead.

**Add View Model Source Code**

Add a new file **Demo.cs** with the following content:
```csharp
using DotNetify;
using System;

namespace MyApplication
{
	public class Demo : BaseVM
	{
	   public Demo()
	   {
		  AddProperty("Greetings", "Hello World");
	   }
	}
}
```

That's it!  Compile and run it, then click the About link.  Hello World!

