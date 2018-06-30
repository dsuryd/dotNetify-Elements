## Customization

_Elements_ is designed to help developers build great-looking applications without too much time being spent on styling or wiring things up.  Simplicity is always the ultimate design goal, but it's also careful to ensure every element can be progressively customized beyond the default settings.  

#### Element Properties

Some elements provide a few properties to provide common customization points, such as width and height.  The _Panel_ element, for example, provide properties to customize the gap size between child items and the CSS flex alignments.  Check the API documentation for a particular element to find out which properties it supports.

#### CSS Override

In addition to React's inline styling (the standard _style_ property), almost every element supports style override in CSS format through its _css_ property.  Because the actual stylesheet is generated, the CSS can include nesting to modify the inner HTML tags.

[inset]
<br/>

An element's _css_ property is great for one-off styling, but if you need to apply the same styles repeatedly, it's recommended to create stateless styled components instead.

#### Theming

To customize all element instances, _Elements_ provides a theme object, where you can define CSS styles for every element, including its sub-components. The light and dark built-in themes are available:

[inset]
<br/>

See [Theme](layout/theme) for complete content of these theme objects.  You can derive a custom theme starting from one of these, and specify how it should differ by overriding the desired object properties.  For example:

```jsx
import React from 'react';
import { Theme } from 'dotnetify-elements';

const myTheme = {
      ...Theme.currentTheme,
      Card: {
         HeaderContainer: 'font-weight: 500',
         FooterContainer: Theme.currentTheme.Card.FooterContainer + 'padding: .5rem'
};

const MyApp = props => <Main theme={myTheme}> /* ... */ </Main>;
```

#### Sub-Component Override

Every element is designed to be composed of multiple parts, or sub-components.  Each sub-component can be replaced, either at an instance level, or for all the element types.  The goal of this design is so that we can, for whatever reason, substitute a third-party library that an element uses with another one, without breaking the element's APIs.

For example, let's change the _TextField_ element from its current Bootstrap style to Material UI.  By looking at the element's API documentation, we know that it exposes the _inputComponent_ property to replace the component that accepts user input.  Change that to the Material UI's TextField component, it becomes:

[inset]
<br/>

```jsx
import React from 'react';
import { TextField, VMContext } from 'dotnetify-elements';
import MuiTextField from '@material-ui/core/TextField';

const SubComponentExample = _ => (
   <VMContext vm="SubComponentExample">
      <TextField id="Name" horizontal inputComponent={MuiTextField} />
   </VMContext>
);
```

It so happens that both the Boostrap and Material UI components have the same properties and are interchangeable.  But in other cases, you may need to do a bit of work writing a proper adapter.

#### Build Your Own

Ultimately you may need something that doesn't exist in this library.  Perhaps there's a good React component out there that you would like to wrap.  The way to do it is by creating a new component that extends the _Element_ class.  

For example, here is a custom element to render an image, with the source URL, width, and height coming from a view model:

```jsx
import React from 'react';
import { PropTypes } from 'prop-types';
import Element from '../core/Element';

export class MyImage extends Element {
   static propTypes = {
      id: PropTypes.string.isRequired
   };

   render() {
      const { fullId, width, height, ...props } = this.attrs;
      const src = this.value;
      return src && <img id={fullId} src={src} width={width} height={height} {...props} />;
   }
}
```
```csharp
// Example of use:
AddProperty("MyImageProp")
   .WithAttribute(new { src = "my-image.jpg", width = "100px", height = "100px" });
```

Things to note:
- __this.attrs__: gets the view model property attributes given by the __WithAttribute__ extension method. 
- __this.value__: gets the view model property value; when set, can be used to store changed value on the client-side.
- __fullId__: a property from _this.attrs_ that contains a unique DOM ID, if you ever need one.

You can also dispatch the value back to the view model by using __this.dispatch()__. 

