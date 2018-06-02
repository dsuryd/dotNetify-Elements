## Panel

The element to arrange the layout of other elements.  It automatically inserts fixed gap between child components, and provide properties for various layout configuration.

[inset]

#### Frame

_Frame_ elements are Panels with _noMargin_ property set to false. The margin size can be set globally on the theme object.

#### Flex Layout

Panel elements are flex containers.  This means that you can use [css flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to control the layout of any component that are put inside it.  When the _flex_ property is specified, it makes the Panel resize to fit the remaining space.  The property also doubles as css flex shorthand to provide more control the Panel's layout when it's nested inside another Panel.

Using the combination of _flex_ and other properties such as _horizontal_ and _css_ (to apply styles using css syntax), you can make all sorts of layout with nested Panel elements:

[inset]
<br>
```jsx
const FlexLayoutExample = props => (
   <Panel css="border: 2px dashed #ccc">
      <Frame>
         <Panel horizontal>
            <Panel horizontal flex css="border: 2px dashed red">
               <Square />
               <Square />
               <Square />
            </Panel>
            <Panel flex css="border: 2px dashed green">
               <Rectangle />
               <Rectangle />
            </Panel>
         </Panel>
         <Panel horizontal>
            <Panel flex="0 1 20%" right css="border: 2px dashed blue">
               <Square />
            </Panel>
            <Panel flex middle css="border: 2px dashed orange">
               <Square />
               <Rectangle />
            </Panel>
            <Panel flex="0 1 30%" css="border: 2px dashed purple">
               <Square />
            </Panel>
         </Panel>
      </Frame>
   </Panel>
);
```
> **Caution:** While the examples here make liberal use of the _css_ property, in real projects, it reduces code maintainability. It's highly recommended the usage is kept to a minimum - only for edge cases - and favor creating reusable styled components instead.


#### Child Properties

If you need to apply the same set of properties to every child component, set the _childProps_ property of the parent Panel:

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