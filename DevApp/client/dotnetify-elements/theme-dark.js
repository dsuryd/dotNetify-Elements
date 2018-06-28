import defaultTheme from './theme-light';

const displayTheme = {
   Alert: ``,
   DataGrid: `
      .react-grid-HeaderCell {
         font-weight: 500;
      }
   `,
   Label: {
      Container: ``,
      IconContainer: ``,
      IconComponent: ``
   },
   Markdown: ``,
   MarkdownTOC: {
      Selected: `
         font-weight: 600;
         border-bottom: 1px dashed #ddd;
      `,
      Container: `
         .toc-h1, 
         .toc-h2 {
            font-size: 1.1rem;
         }
         .toc-h3, 
         .toc-h4 {
            font-size: .9rem;
         } 
      `
   }
};

const formTheme = {
   Button: `
      margin-left: 3px;
   `,
   Checkbox: {
      GroupContainer: ``,
      Container: {
         Default: ``,
         Checked: ``
      },
      Label: ``,
      Input: ``
   },
   Input: ``,
   InputValidationError: `
        border-color: red;
    `,
   Radio: {
      GroupContainer: ``,
      Container: {
         Default: ``,
         Checked: ``
      },
      Label: ``,
      Input: ``
   },
   RadioToggle: {
      GroupContainer: ``,
      Label: {
         Default: ``,
         Checked: ``
      },
      Input: ``
   },
   TextArea: ``
};

const layoutTheme = {
   Main: `
      ${defaultTheme.Main}
   `,
   Header: `
      background: #303030;
      border-bottom: 1px solid #111;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
      z-index: 999;
   `,
   Footer: `
      background: #303030;
      border-top: 1px solid #111;        
      z-index: 997;
   `,
   Nav: `
        background: #222;
        border-right: 1px solid #111;
        z-index: 998;
    `,
   Section: `
        color: #fff;
        background: #222;
    `,
   Panel: {
      Container: ``,
      ChildContainer: ``,
      Gap: {
         small: '.5rem',
         large: '1rem'
      },
      Margin: {
         small: '1em',
         large: '1.5rem'
      }
   }
};

const navTheme = {
   NavMenu: {
      SelectedRoute: `
         > a > div > div {
            padding-left: .5rem;
            border-left: 2px solid tomato;
            font-weight: 600;
         }
      `,
      RouteContainer: `
         border-bottom: 1px solid #444;
         color: #868e96; 
         &:hover {
            background: #1a1a1a; 
         }
      `,
      GroupContainer: `
         border-bottom: 1px solid #444;
         color: #337ab7;
         &:hover { 
            color: #0056b3; 
            background: #1a1a1a;
         }
      `
   }
};

const structureTheme = {
   Card: {
      Container: `background: #303030;`,
      ImageContainer: ``,
      HeaderContainer: `background: #444;`,
      BodyContainer: ``,
      FooterContainer: ``
   },
   Cell: {
      Container: ``,
      HeaderContainer: ``,
      BodyContainer: ``
   },
   Collapsible: {
      Container: ``,
      HeaderContainer: ``
   },
   Field: {
      Container: ``,
      LabelContainer: `
         font-weight: 500;
      `,
      InputContainer: `
         input, select, textarea {
            font-weight: 500;
            ::-webkit-input-placeholder {
               font-weight: 400;
            }
         },`,
      ValidationMessageContainer: `
            color: red;
        `,
      PlainTextContainer: ``,
      PlainTextComponent: `font-weight: 500;`
   },
   Tab: {
      Container: `
         ul {
            border-bottom-color: #444;
         }
         a.nav-link.active {
            color: #fff;
            background: #222;
            border-color: #444;
         }
      `,
      TabItemContainer: ``,
      TabItem: ``
   }
};

const darkTheme = {
   ...defaultTheme,
   ...displayTheme,
   ...formTheme,
   ...layoutTheme,
   ...navTheme,
   ...structureTheme,
   name: 'dark'
};

export default darkTheme;
