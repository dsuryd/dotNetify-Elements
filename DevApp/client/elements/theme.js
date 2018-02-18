const defaultTheme = {
    Main: ``,
    Nav: `
        background: #f8f8f8;
        border-right: 1px solid #e7e7e7;
    `,
    NavHeader: ``,
    Header: `
        background: #f8f8f8;
        border-bottom: 1px solid #e7e7e7;
    `,
    Footer: `
        background: #f8f8f8;
        border-top: 1px solid #e7e7e7;        
    `,
    Section: ``,
    Panel: {
        Container: ``,
        ChildContainer: ``
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
    FieldPanel: {
        Container: ``,
        LabelContainer: ``,
        InputContainer: ``,
        ValidationMessageContainer: `
            color: red;
        `
    },
    Label: {
        LabelContainer: ``,
        IconComponent: ``
    },
    Input: ``,
    InputValidationError: `
            border-color: #dc3545;
    `,
    Card: ``,
    CardHeader: ``,
    CardBody: ``,
    CheckboxInput: ``,
    CheckboxLabel: {
        Default: ``,
        Checked: ``
    },
    CheckboxGroup: ``,
    RadioInput: ``,
    RadioLabel: {
        Default: ``,
        Checked: ``
    },
    RadioGroup: ``,
    RadioToggleInput: ``,
    RadioToggleLabel: {
        Default: ``,
        Checked: ``
    },
    RadioToggleGroup: ``,
    Button: ``,
    TextArea: ``,
};

export default defaultTheme;