﻿## Panel

The element to arrange the layout of other elements. It automatically inserts fixed gap between child components, and provide properties for various layout configuration, including _css_ property for inline styling using CSS syntax.

[inset]

#### Frame

Frame is derived from the Panel element, but with _noMargin_ property set to false. It is intended to set up a container that frames its content.
The margin and gap sizes can be configured with the global theme.

#### Flex Layout

Panel elements are flex containers. This means that you can use [CSS flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to control the layout of any component that are put inside it. When the _flex_ property is specified, it makes the Panel resizes to fit the remaining space. The property also doubles as CSS flex shorthand to provide more control the Panel's layout when it's nested inside another Panel.

Using the combination of _flex_ and other properties such as _horizontal_ and _css_ (to apply styles using CSS syntax), you can make all sorts of layout with nested Panel elements:

[inset]
<br/>

<if react>

```jsx
const FlexLayoutExample = props => (
  <Panel css='border: 2px dashed #ccc'>
    <Frame>
      <Panel horizontal flex css='border: 2px dashed red'>
        <Square>1</Square>
        <Square>2</Square>
      </Panel>
      <Panel horizontal css='border: 2px dashed aquamarine'>
        <Square>3</Square>
        <Square>4</Square>
      </Panel>
      <Panel css='border: 2px dashed green'>
        <Rectangle>5</Rectangle>
        <Rectangle>6</Rectangle>
      </Panel>
    </Panel>
    <Panel horizontal>
      <Panel flex='20%' right css='border: 2px dashed blue'>
        <Square>7</Square>
      </Panel>
      <Panel middle css='border: 2px dashed orange'>
        <Square>8</Square>
        <Rectangle>9</Rectangle>
      </Panel>
      <Panel flex='30%' css='border: 2px dashed purple'>
        <Square>10</Square>
      </Panel>
    </Frame>
  </Panel>
);
```

</if>
<if webcomponent>
```jsx
<d-panel css="border: 2px dashed #ccc">
  <d-frame>
    <d-panel horizontal>
      <d-panel horizontal flex="1" css="border: 2px dashed red">
        <Square>1</Square>
        <Square>2</Square>
      </d-panel>
      <d-panel horizontal css="border: 2px dashed aquamarine">
        <Square>3</Square>
        <Square>4</Square>
      </d-panel>
      <d-panel css="border: 2px dashed green">
        <Rectangle>5</Rectangle>
        <Rectangle>6</Rectangle>
      </d-panel>
    </d-panel>
    <d-panel horizontal>
      <d-panel flex="20%" right css="border: 2px dashed blue">
        <Square>7</Square>
      </d-panel>
      <d-panel middle css="border: 2px dashed orange">
        <Square>8</Square>
        <Rectangle>9</Rectangle>
      </d-panel>
      <d-panel flex="30%" css="border: 2px dashed purple">
        <Square>10</Square>
      </d-panel>
    </d-panel>
  </d-frame>
</d-panel>
```
</if>

<if react>

#### Child Properties

If you need to apply the same set of properties to every child component, set the _childProps_ property of the parent Panel:

[inset]
</if>

#### Property Types

```jsx
static propTypes = {
   // Displays child components horizontally and apart from each other.
   apart: PropTypes.bool,

   // Aligns child components to the bottom.
   bottom: PropTypes.bool,

   // Centers the child components horizontally.
   center: PropTypes.bool,

   // Properties to apply to all child components.
   childProps: PropTypes.object,

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

   // Sets custom padding.
   padding: PropTypes.string,

   // Aligns child components to the right.
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
