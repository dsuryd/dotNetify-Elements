const chartAreaColors = [
   'rgba(255, 99, 132, 0.8)',
   'rgba(54, 162, 235, 0.8)',
   'rgba(255, 206, 86, 0.8)',
   'rgba(75, 192, 192, 0.8)',
   'rgba(153, 102, 255, 0.8)',
   'rgba(255, 159, 64, 0.8)'
];

const displayTheme = {
   Alert: ``,
   BarChart: {
      AreaColor: [...chartAreaColors, ...chartAreaColors]
   },
   DataGrid: {
      Container: ``,
      Header: ``,
      HeaderCell: ``,
      Row: ``,
      Cell: ``
   },
   Label: {
      Container: ``,
      IconContainer: ``,
      IconComponent: ``
   },
   LineChart: {
      AreaColor: 'rgba(217, 237, 245, 0.2)',
      LineColor: '#9acfea',
      LineWidth: 2
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
   },
   PieChart: {
      AreaColor: [...chartAreaColors, ...chartAreaColors]
   }
};

const formTheme = {
   Button: ``,
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
      a {
         color: #337ab7;
         &:hover { 
            color: #0056b3;
            text-decoration: none;
         } 
         &:focus { 
            color: #337ab7; 
         }
      }     
   `,
   Header: `
      background: #f8f8f8;
      border-bottom: 1px solid #e7e7e7;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.2);

   `,
   Footer: `
      background: #f8f8f8;
      border-top: 1px solid #e7e7e7;  
   `,
   Nav: `
        background: #f4f4f4;
        border-right: 1px solid #e7e7e7;
    `,
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
   NavDrawerButton: `
      color: #999;
   `,
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
         background: #f4f4f4;
         &:hover { background: #f0f0f0; }
      `,
      GroupContainer: `
         background: #f8f8f8;
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
         }
      `,
      ValidationMessageContainer: `
         color: red;
      `,
      PlainTextContainer: ``,
      PlainTextComponent: `font-weight: 500;`
   },
   Menu: {
      Container: ``,
      GroupContainer: `
         background: #f8f8f8;
         border-color: #ccc;
      `,
      ItemContainer: `
         &:hover > button {
            background-color: #f0f0f0;
         }      
         &.separator {
            border-bottom-color: #ccc;
         }        
         &.submenu::after {
            border-left-color: #337ab7;
         }          
      `
   },
   Modal: {
      Container: ``,
      HeaderContainer: ``,
      BodyContainer: ``,
      FooterContainer: ``
   },
   Tab: {
      Container: ``,
      BodyContainer: ``,
      TabItemContainer: ``,
      TabItem: `
         color: #337ab7;
         &:hover { 
            color: #0056b3;
         }
      `
   }
};

const lightTheme = {
   name: 'light',
   ...displayTheme,
   ...formTheme,
   ...layoutTheme,
   ...navTheme,
   ...structureTheme
};

export default lightTheme;
