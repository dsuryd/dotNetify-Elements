## Panel

The element to arrange the layout of other elements.

[inset]

#### Flex Layout

Panel elements are flex containers.  This means that you can use css flexbox to control the layout of any component that are put inside it.  When the _flex_ property is specified, it makes the Panel resize to fit the remaining space.  The property also doubles as css flex shorthand to provide more control the Panel's layout when it's nested inside another Panel.

[inset]

#### Child Properties

Apply the same set of properties to every child component by using _childProps_ property:

[inset]


#### Property Types

```jsx
static propTypes = {
   // Properties to apply to all child components.
   childProps: PropTypes.object,

   // Sets the container component's css styles.
   css: PropTypes.string,

   // Sets css flex property; if true, same as 'flex: 1'.
   flex: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

   // Sets custom gap between child components.
   gap: PropTypes.string,

   // Sets custom height.
   height: PropTypes.string,

   // Displays child components horizontally.
   horizontal: PropTypes.bool,

   // Sets custom panel's margin.
   margin: PropTypes.string,

   // Centers the child components on the cross-axis.
   middle: PropTypes.bool,

   // Removes the gap between child components.
   noGap: PropTypes.bool,

   // Removes the panel's margin.
   noMargin: PropTypes.bool,

   // Displays child components horizontally from the right.
   right: PropTypes.bool,

   // Sets small gap between child components according to the theme.
   smallGap: PropTypes.bool,

   // Sets small panel's margin according to the theme.
   smallMargin: PropTypes.bool,

   // Sets custom width.
   width: PropTypes.string,

   // Wraps the child components to multi-lines if they overflow.
   wrap: PropTypes.bool
};
```