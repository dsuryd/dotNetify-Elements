## Overview

DotNetify-Elements provide the building blocks that will make your web application development a breeze.  Built on top of dotNetify-React, Elements are a set of React components that you can readily connect to your cross-platform .NET back-end and get your data streaming without much effort at all!

Consider this Hello World example:

```jsx
import React from 'react';
import dotnetify from 'dotnetify';

class MyApp extends React.Component {
   constructor(props) {
      super(props);
      dotnetify.react.connect("HelloWorld", this);
      this.state = { Greetings: "" };
   }
   render() {
      return <div>{this.state.Greetings}</div>
   }
}
```
```cs
public class HelloWorld : BaseVM
{
   public string Greetings => "Hello World!";
}
```

With Elements, the above React component can be declaratively rewritten as a stateless component:
```jsx
import React from 'react';
import { VMContext, Element } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="HelloWorld">
      <div><Element id="Greetings" /></div>
   </VMContext>
);
```




