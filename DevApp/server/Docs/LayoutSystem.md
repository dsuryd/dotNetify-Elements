## Layout System

Positioning elements on the page can be very time-consuming, and while css is very powerful, to apply it effectively comes with a high learning curve that not every developer can afford to take time to master.  That's why _dotNetify-Elements_ comes with simple layout elements to help you do the task quickly, while still leaving room for customization.

#### Layout Grid

Use the layout grid elements to set up your main application structure, with the options to add header, footer, and navigation sidebar.  See [LayoutGrid](layout/grid) for details.

#### Panel Element

The Panel element serves as a container, much like the `<div>` tag, but with the ability to control the position of its content.  

By default a Panel will vertically stack the child elements with a fixed gap in-between:

[inset]

Use any combination of the [Panel's properties](layout/panel) to customize the layout.  For example, adding the _horizontal_ property will stack the items horizontally:

[inset]

Panels use css flexbox under the hood, and when the _flex_ property is added, the element will fill the available space.  You can create all sorts of layout with nested panels, for example:

[inset]

And if that's not enough, you can always use the _css_ property to further customize not only the Panel itself, but all HTML tags within it:

[inset]

#### Responsive Design

[inset]
