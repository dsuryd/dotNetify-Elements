## Customization

_Elements_ is designed to help developers build great-looking applications without too much time being spent on styling or wiring things up.  Simplicity is always the ultimate design goal, but it's also careful to ensure every element can be progressively customized beyond the default settings.  

#### Element Properties

Some elements provide a few properties to provide common customization points, such as width and height.  The _Panel_ element, for example, provide properties to customize the gap size between child items and the CSS flex alignments.

[inset]

Check the API documentation for a particular element to find out which properties it supports.

#### CSS Override

In addition to React's inline styling (the standard _style_ property), almost every element supports style override in CSS format through its _css_ property.  Because the actual stylesheet is generated, the CSS can include nesting to modify the inner HTML tags.

[inset]
<br/>

An element's _css_ property is great for one-off styling, but if you need to apply the same styles repeatedly, it's recommended to create reusable styled components instead.

#### Theming

To customize all element instances, _Elements_ provides a theme object, where you can define CSS styles for every element, including its sub-components. There are two built-in themes, the light and dark themes, which you can by clicking the light bulb icon on the top-right corner.  For the complete content of these theme objects, see [Theme](layout/theme).  

You can derive a custom theme by starting from one of theme object, and then specify how it should differ by overriding the desired object properties.  For example:

```jsx
import React from 'react';
import { lightTheme } from 'dotnetify-elements';

const myTheme = {
      ...lightTheme,
      Card: {
         HeaderContainer: 'font-weight: 500',
         FooterContainer: lightTheme.Card.FooterContainer + 'padding: .5rem'
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

class MuiTextFieldAdapter extends React.Component {
   render() {
      const { muiLabel, inputComponent, ...props } = this.props;
      return <MuiTextField label={muiLabel} {...props} />;
   }
}

const SubComponentExample = _ => (
   <VMContext vm="SubComponentExample">
      <TextField id="Name" label="" inputComponent={MuiTextFieldAdapter} />
   </VMContext>
);
```

It so happens that both the Boostrap and Material UI components have the same properties and are interchangeable.  But in other cases, you may need to do a bit of work writing a proper adapter.

#### Build Your Own

Ultimately you may need something that doesn't exist in this library.  Perhaps there's a good React component out there that you would like to wrap.  The way to do it is by creating a new component that extends the _Element_ class.  

For example, here is a custom element to render an image, with the source URL, width, and height coming from a view model:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'dotnetify-elements';

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
AddProperty("MyImageProp", "my-image.jpg")
   .WithAttribute(new { width = "100px", height = "100px" });
```

Things to note:
- __this.attrs__: gets the view model property attributes given by the _WithAttribute_ extension method. If the component is declared with properties of the same name, they will override the server-side attributes.
- __this.value__: gets the view model property value; when set, can be used to store changed value on the client-side.
- __fullId__: a property from _this.attrs_ that contains a unique DOM ID, if you ever need one.

To dispatch the value back to the view model, use __this.dispatch()__. 

