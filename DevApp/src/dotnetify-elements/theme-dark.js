import lightTheme from './theme-light';

const displayTheme = {
   Alert: ``,
   DataGrid: {
      Container: `
         .react-grid-Main {
            outline: none;
         }
         .react-grid-Grid {
            border-color: black;
            * {
               border-color: black !important;
            }
         }
      `,
      HeaderCell: `
         background: #444;
      `,
      Cell: `
         background: #303030;
      `,
      Row: `
         &.row-selected .react-grid-Cell {
            background: #1a1a1a;
         }
         &:hover {
            .react-grid-Cell { 
               background: #1a1a1a; 
            }
         }
      `
   },
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
         .toc-h4,
         .toc-h5 {
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
      style: 'custom',
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
      style: 'custom',
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
      ${lightTheme.Main}
      a {
         color: #848c94;
         &:hover { 
            color: #c0c4c8;
            text-decoration: none;
         } 
         &:focus { 
            color: #c0c4c8; 
         }
      }     
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
         color: #848c94;
         &:hover { 
            color: #c0c4c8; 
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
      FooterContainer: `background: #444;`
   },
   Cell: {
      Container: `background: #303030;`,
      HeaderContainer: `background: #444;`,
      BodyContainer: ``
   },
   Collapsible: {
      Container: ``,
      HeaderContainer: ``
   },
   Field: {
      Container: ``,
      LabelContainer: `
         font-weight: 400;
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
      PlainTextComponent: `
         color: #fff; 
         font-weight: 400;
      `
   },
   Menu: {
      Container: ``,
      GroupContainer: `
         background: #303030;
         border-color: #444;
      `,
      ItemContainer: `
         &:hover > button {
            background-color: #1a1a1a;
         }      
         &.separator {
            border-bottom-color: #444;
         }        
         &.submenu::after {
            border-left-color: #444;
         }          
      `
   },
   Modal: {
      Container: `
         .modal-content { 
            background: transparent; 
         }
      `,
      HeaderContainer: `
         color: #fff;
         background: #303030; 
         border-bottom-color: #444;
      `,
      BodyContainer: `
      color: #fff;
      background: #303030;       
      `,
      FooterContainer: `
      color: #fff;
      background: #303030; 
      border-top-color: #444;      
      `
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
   ...lightTheme,
   ...displayTheme,
   ...formTheme,
   ...layoutTheme,
   ...navTheme,
   ...structureTheme,
   name: 'dark'
};

export default darkTheme;
