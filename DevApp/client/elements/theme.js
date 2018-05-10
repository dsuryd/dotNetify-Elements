const defaultTheme = {
   Main: ``,
   Nav: `
        background: #f8f8f8;
        border-right: 1px solid #e7e7e7;
        z-index: 998;
    `,
   NavHeader: ``,
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
   },
   NavMenu: {
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
   },
   Collapsible: {
      Container: ``,
      HeaderContainer: ``
   },
   Field: {
      Container: ``,
      LabelContainer: ``,
      InputContainer: ``,
      ValidationMessageContainer: `
            color: red;
        `,
      PlainTextContainer: `font-weight: bold;`
   },
   Label: {
      Container: ``,
      IconComponent: ``
   },
   Input: ``,
   InputValidationError: `
        border-color: #dc3545;
    `,
   Card: {
      Container: ``,
      HeaderContainer: ``,
      BodyContainer: ``,
      FooterContainer: ``
   },
   Cell: {
      Container: ``,
      HeaderContainer: ``,
      BodyContainer: ``
   },
   Checkbox: {
      GroupContainer: ``,
      Container: {
         Default: ``,
         Checked: ``
      },
      Label: ``,
      Input: ``
   },
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
   Button: ``,
   TextArea: ``,
   DataGrid: {
      Container: ``
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

export default defaultTheme;
