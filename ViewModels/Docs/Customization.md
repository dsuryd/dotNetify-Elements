## Customization

_Elements_ is designed to help developers build great-looking applications without too much time being spent on styling or wiring things up.  Simplicity is always the ultimate design goal, but it's also careful to ensure every element can be progressively customized beyond the default settings.  

#### Element Properties

Some elements provide a few properties to provide common customization points, such as width and height.  The _Panel_ element, for example, provide properties to customize the gap size between child items and the CSS flex alignments.  Check the API documentation for a particular element to find out which properties it supports.

#### CSS Override

In addition to React's inline styling (the standard _style_ property), almost every element supports style override in CSS format through its _css_ property.  Because the actual stylesheet is generated, the CSS can include nesting to modify the inner HTML tags.

[inset]
<br/>

An element's _css_ property is great for one-off styling, but if you need to apply the same styles repeatedly, it's recommended to create stateless styled components instead.

#### Global Theme

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

[inset]

#### Sub-Component Override

Every element is designed to be composed of multiple parts, or sub-components.  Each sub-component can be replaced, either at an instance level, or for all the element types.  The goal of this design is so that we can, for whatever reason, substitute a third-party library that an element uses with another one, without breaking the element's APIs.

[inset]

#### Build Your Own



