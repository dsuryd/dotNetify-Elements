import defaultTheme from './elements/theme';
import { Button } from './elements/form/Button';
import { Checkbox } from './elements/form/Checkbox';
import { CheckboxGroup } from './elements/form/CheckboxGroup';
import { Collapsible } from './elements/layout/Collapsible';
import { DropdownList } from './elements/form/DropdownList';
import { Form } from './elements/form/Form';
import { IconLabel } from './elements/layout/IconLabel';
import { Main, Header, Nav, Footer, Section } from './elements/layout/LayoutGrid';
import { NavHeader } from './elements/layout/NavHeader';
import { NavMenu, NavMenuTarget } from './elements/nav/NavMenu';
import { NavToggle } from './elements/nav/NavToggle';
import { Panel } from './elements/layout/Panel';
import { RadioGroup } from './elements/form/RadioGroup';
import { TextField, EmailField, PasswordField, TextAreaField } from './elements/form/TextField';
import { VMContext, ContextTypes } from './elements/VMContext';

import { Button as _Button, Collapse, FormGroup, Label, Input } from 'reactstrap';

Button.componentTypes.ButtonComponent = _Button;

Object.assign(Checkbox.componentTypes, {
    Container: FormGroup,
    LabelComponent: Label,
    InputComponent: Input
});

Object.assign(CheckboxGroup.componentTypes, {
    LabelComponent: Label,
    CheckboxContainer: FormGroup,
    CheckboxLabelComponent: Label,
    InputComponent: Input
});

Collapsible.componentTypes.CollapsePanel = Collapse;

Object.assign(DropdownList.componentTypes, {
    LabelComponent: Label,
    InputComponent: Input
});

Object.assign(RadioGroup.componentTypes, {
    LabelComponent: Label,
    RadioContainer: FormGroup,
    RadioLabelComponent: Label,
    InputComponent: Input
});

Object.assign(TextField.componentTypes, {
    LabelComponent: Label,
    InputComponent: Input
});

export {
    defaultTheme,
    Button,
    Checkbox,
    CheckboxGroup,
    Collapsible,
    ContextTypes,
    DropdownList,
    Form,
    IconLabel,
    Main, Header, Nav, Footer, Section,
    NavHeader,
    NavMenu,
    NavMenuTarget,
    NavToggle,
    Panel,
    RadioGroup,
    TextField, EmailField, PasswordField, TextAreaField,
    VMContext
};