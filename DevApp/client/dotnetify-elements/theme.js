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
         a {
            color: #337ab7;
            &:hover { 
               color: #0056b3;
               text-decoration: none;
            } 
            &:focus { 
               color: #337ab7; 
               > * { background: #e7e7e7; } 
            }
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
   Main: ``,
   Header: `
      background: #f8f8f8;
      border-bottom: 1px solid #e7e7e7;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
      z-index: 999;
   `,
   Footer: `
      background: #f8f8f8;
      border-top: 1px solid #e7e7e7;        
      z-index: 997;
   `,
   Nav: `
        background: #f8f8f8;
        border-right: 1px solid #e7e7e7;
        z-index: 998;
    `,
   NavHeader: ``,
   Section: `
        background: #f4f4f4;
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
         border-bottom: 1px solid #e7e7e7;
         color: #868e96; 
         &:hover { background: #f0f0f0; }
         > a {
               color: #337ab7;
               &:hover { 
                  color: #0056b3;
                  text-decoration: none;
               } 
               &:focus { 
                  color: #337ab7; 
                  > * { background: #e7e7e7; } 
               }
         }
      `,
      GroupContainer: `
         border-bottom: 1px solid #e7e7e7;
         color: #337ab7;
         &:hover { 
               color: #0056b3; 
               background: #f0f0f0;
         }
      `
   }
};

const structureTheme = {
   Card: {
      Container: ``,
      ImageContainer: ``,
      HeaderContainer: ``,
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
      PlainTextContainer: `font-weight: 500;`
   },
   Tab: {
      Container: ``,
      TabItemContainer: ``,
      TabItem: `
         > a {
            color: #337ab7;
         }`
   }
};

const defaultTheme = {
   ...displayTheme,
   ...formTheme,
   ...layoutTheme,
   ...navTheme,
   ...structureTheme
};

export default defaultTheme;
