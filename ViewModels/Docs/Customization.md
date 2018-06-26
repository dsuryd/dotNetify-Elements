## Customization

_Elements_ is designed to help developers build great-looking applications without too much time being spent on styling or wiring things up.  Simplicity is always the ultimate design goal, but it's also careful to ensure every element can be progressively customized beyond the default settings.  

#### Element Properties

Some elements provide a few properties to provide common customization points, such as width and height.  The _Panel_ element, for example, provide properties to customize the gap size between child items and the CSS flex alignments.  Check the API documentation for a particular element to find out which properties it supports.

#### CSS Override

In addition to React's inline styling (the standard _style_ property), almost every element supports style override in CSS format through its _css_ property.  Because the actual stylesheet is generated, the CSS can include nesting to modify the inner HTML tags.

[inset]

An element's _css_ property is great for one-off styling, but if you need to apply the same styles repeatedly, it's recommended to create stateless styled components instead.

#### Global Theme

To customize all element instances, _Elements_ provides a theme object, where you can define CSS styles for every element, including its sub-components.  This object should be passed to the _Main_ element at the application root, and to each routeable component using the higher-order-component _withTheme()_.

Here is the content of the current theme:

[inset]

You can derive a custom theme from the default theme, and only specify how it should differ by overriding the desired object properties.  For example:

[inset]

#### Sub-Component Override

Every element is designed to be composed of multiple parts, or sub-components.  Each sub-component can be replaced, either at an instance level, or for all the element types.  The goal of this design is so that we can, for whatever reason, substitute a third-party library that an element uses with another one, without breaking the element's APIs.

[inset]

#### Build Your Own



