## Get Started

<if react>

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

</if>

#### Nuget Packages

- **DotNetify.SignalR**
- **DotNetify.Elements**

#### Server Setup

Add the following in **Startup.cs**:

```csharp
...
using DotNetify;

namespace MyApp
{
   public class Startup
   {
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddSignalR();
         services.AddDotNetify();
      }

      public void Configure(IApplicationBuilder app)
      {
         app.UseWebSockets();
         app.UseDotNetify();
<if react>
         app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
         {
            HotModuleReplacement = true,
            HotModuleReplacementClientOptions = new Dictionary<string, string> { { "reload", "true" } },
         });

         app.UseStaticFiles();
</if>
         app.UseRouting();
         app.UseEndpoints(endpoints =>
         {
            endpoints.MapHub<DotNetifyHub>("/dotnetify");
            endpoints.MapFallbackToFile("index.html");
         });
      }
   }
}

```

<if react>

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
    "presets": ["env", "react"],
    "plugins": ["babel-plugin-styled-components", "babel-plugin-transform-object-rest-spread", "babel-plugin-transform-class-properties"]
  },
  "dependencies": {
    "dotnetify": "^3.6.1",
    "dotnetify-elements": "^1.2.0",
    "react": "~16.8.0",
    "react-dom": "~16.8.0",
    "styled-components": "~4.1.3"
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
    modules: ['client', 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
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
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/dist/app.css" rel="stylesheet" />
  </head>
  <body>
    <div id="App"></div>

    <script src="https://unpkg.com/react@latest/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@latest/umd/react-dom.production.min.js"></script>
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
  <VMContext vm='MyApp'>
    <Main>
      <Section>
        <Frame>
          <Card>
            <Element id='Greetings' />
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

Open the browser to _http://localhost:5000_. If you make changes on client- or server-side, the application will rebuild and the browser reload.

</if>

<if react>
#### Reducing Bundle Size

Importing the root module is convenient, but will significantly increase the application bundle size. When this is a concern, you can import just the components you need, for example:

```jsx
import { Element, VMContext } from 'dotnetify-elements/components';
import { Alert } from 'dotnetify-elements/components/Alert';
import { TextField } from 'dotnetify-elements/components/TextField';
```

Dependency to `moment.js` will bring all the locale files into the bundle. To include only the locales you need, set your webpack to use `ContextReplacementPlugin`:

```jsx
const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // load `moment/locale/en.js` only
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/)
  ]
};
```

</if>

<if webcomponent>

#### Client Setup

Add the following to `index.html`:

```html
<!-- Dependencies -->
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/styled-components@4.1/dist/styled-components.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@aspnet/signalr@1.1.2/dist/browser/signalr.min.js"></script>
<script src="https://unpkg.com/dotnetify@latest/dist/dotnetify-react.min.js"></script>

<!-- Get the whole bundle... -->
<script src="https://unpkg.com/dotnetify-elements@latest/lib/dotnetify-elements.bundle.js"></script>
<!-- ...or individual components -->
<script src="https://unpkg.com/dotnetify-elements@latest/web-components/[component-name].js"></script>
```

</if>
