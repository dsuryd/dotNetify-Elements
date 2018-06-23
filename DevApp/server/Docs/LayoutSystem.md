## Layout System

Positioning elements on the page can be very time-consuming, and while css is very powerful, to apply it effectively comes with a high learning curve that not every developer can afford to take time to master.  That's why _dotNetify-Elements_ comes with simple layout elements to help you do the task quickly, while still leaving room for customization.

#### Layout Grid

Use the layout grid elements to set up your main application structure, with the options to add header, footer, and navigation sidebar.  See [LayoutGrid](layout/grid) for details.

#### Panel Element

A Panel element is a container, similar to the `<div>` tag, but equipped with the ability to arrange the layout of the child elements.  

By default a Panel will vertically stack the child elements with a fixed gap between them:

[inset]

Use the various Panel's attributes to change the layout of items.  For example, adding the _horizontal_ attribute will stack the items horizontally:

[inset]

Panels use css flexbox under the hood, which allows you to make it fill the available space and easily control the content's alignments.  Nest the panels, and you can create all sorts of layout: