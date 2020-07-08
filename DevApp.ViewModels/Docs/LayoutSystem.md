## Layout System

Positioning elements on the page can be very time-consuming, and while Cascading Style Sheet (CSS) is pretty powerful, to apply it effectively comes with a high learning curve that not every developer can afford to take time to master. That's why _Elements_ comes with simple layout elements to help you do the task quickly, while still leaving room for customization.

#### Layout Grid

Use the layout grid elements to structure the application layout. Start with the _Main_ element, then add other elements to further divide the page into areas for header, footer, or navigation sidebar, along with the content section.

<if react>

```jsx
import React from 'react';
import { Main, Header, Footer, Nav, Section } from 'dotnetify-elements';

const MyApp = _ => (
  <Main>
    <Header />
    <Nav />
    <Section />
    <Footer />
  </Main>
);
```

</if>
<if webcomponent>
<d-main>
    <d-header />
    <d-nav />
    <d-section />
    <d-footer />
</d-main>
</if>

You can provide custom theme to the _Main_ element. See [LayoutGrid](layout/grid) for details.

#### Panels

The Panel element serves as a container, much like the `<div>` tag, but with the ability to control the position of its content.

By default a Panel will vertically stack the child elements with a fixed gap in-between:

[inset]

Use any combination of the Panel's properties to customize the layout. For example, adding the _horizontal_ property will stack the items horizontally:

[inset]

Panels use CSS flexbox under the hood, and when they are nested, they will fill the available space. The same will apply to the child elements when the _flex_ property is set on them:

[inset]

And if that's not enough, you can always use the _css_ property to further customize not only the Panel itself, but all HTML tags within it:

[inset]
<br/>

Here are a few of the Panel's properties; for a complete list and other derived elements, see [Panel](layout/panel):

- **apart**: display items horizontally with evenly distributed gap in-between.
- **flex** : CSS flex shorthand value; can be used on child elements too.
- **gap**: override default gap between items.
- **horizontal**: display items horizontally.
- **right**: shows items aligned to the right.
- **wrap**: wrap items to multi-lines on overflow.

You could create all sorts of layout by nesting the Panels, as demonstrated on [Layout Demo](layout/demo).
