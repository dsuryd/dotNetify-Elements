## Layout Grid

A set of elements to provide common application layout; intended for the root App component.

[inset]

```jsx
import { Footer, Header, Main, Nav, Section} from 'dotnetify-elements';
import { demoTheme } from './demo-helper';

const LayoutGridDemo = _ => (
   <Main theme={demoTheme}>
      <Header>
         /* Header content */
      </Header>
      <Nav>
         /* Nav menu */
      </Nav>
      <Section>
         /* Section content */
      </Section>
      <Footer>
         /* Footer content */
      </Footer>
   </Main>
);
```
#### Elements

- Main - top level container that spans the entire render area.
- Nav - fixed left-side navigation bar.
- Header - fixed top bar. 
- Footer - fixed bottom bar.
- Section - content area.

#### Customization

These elements are made of [styled components](https://www.styled-components.com/) which can use normal CSS syntax.  There are two ways you can customize them:

1. Theming

Set the _theme_ attribute on the _Main_ element with a CSS theme object to customize all elements.  For example, the _LayoutGridDemo_ above uses this theme:

```jsx
import { lightTheme } from 'dotnetify-elements';

const demoTheme = {
   ...lightTheme,
   Main: `border: 2px dashed tomato`,
   Header: `background: #666`,
   Nav: `background: #eee; width: 100px;`,
   Section: `background: #ddd`,
   Footer: `background: #fff`
};
```

2. Styled Component's Extend API

Create a new component by extending the styles of the desired element:

```jsx
const MyNav = Nav.extend`
   background: #eee; 
   width: 100px;
`;
```