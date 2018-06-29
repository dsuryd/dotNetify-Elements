## Theme

Change the global application styles by passing the theme object to the _Main_ element at the application root, or the _Theme_ element anywhere else.  The object constitutes of element names paired with their CSS styles, with some elements further decomposed to sub-components.

Any routable component (those used with the Navigation element) should be enclosed with _Theme_, or by the Higher-Order Component _withTheme()_.
For example:

```jsx
import React from 'react';
import { withTheme } from 'dotnetify-elements';

const MyPageComponent = props => /*...*/
export default withTheme(MyPageComponent);
```

#### Built-In Themes

Light and dark themes are available.  You can create a new theme object by starting with one of these and override as needed.  You can access the current theme through the _Theme_ element's static property __Theme.currentTheme__.

[inset]

#### Theming Custom Element

Under the hood, the [styled component's ThemeProvider component](https://www.styled-components.com/docs/advanced#theming) is used to provide theme context throughout all elements.  This means that you can access to the theme context anytime you create a styled component inside your custom element: 

```jsx
import React from 'react';
import styled from 'styled-components';

const CustomContainer = styled.div`
   padding: 1rem;
   background: ${props => (props.theme.name === 'dark' ? 'black' : 'white')};
`;

const MyElement = props => <CustomContainer> /* ... */ </CustomContainer>;
```

#### Source

This element incorporates https://github.com/styled-components ([license: MIT](https://github.com/styled-components/styled-components/blob/master/LICENSE))
