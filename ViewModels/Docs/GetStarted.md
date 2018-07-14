## Get Started

#### SPA Template

The easiest way to get started to use the basic SPA template that contains some of the examples from this website, and also include a functional login page with JWT authentication.

Prerequisite: 
- Node.js
- .NET Core SDK (v2.1 and up)

Download the template from [this github repo](https://github.com/dsuryd/dotNetify-Elements/tree/master/Templates/SPA), and then run the following from the command line:

```
npm i
dotnet watch run
```

#### New ASP.NET Core Project

The following steps will create a new ASP.NET Core project that uses WebPack to build the client-side code and auto-reload the browser when changes are made.

Prerequisite: 
- Node.js
- .NET Core SDK (v2.1 and up)


**Create Project**

Create an empty ASP.NET Core web project from the command line:

```js
dotnet new web -o MyApp
cd MyApp
dotnet add package DotNetify.SignalR
dotnet add package DotNetify.Elements
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

Open the browser to **http://localhost:5000**.  If you make changes on client- or server-side, the application will rebuild and the browser reload.