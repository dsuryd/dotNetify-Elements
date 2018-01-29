import defaultTheme from './elements/theme';
import { Button } from './elements/form/Button';
import { Checkbox } from './elements/form/Checkbox';
import { CheckboxGroup } from './elements/form/CheckboxGroup';
import { Collapsible } from './elements/layout/Collapsible';
import { DropdownList } from './elements/form/DropdownList';
import { FieldPanel } from './elements/layout/FieldPanel';
import { Form } from './elements/form/Form';
import { Label } from './elements/layout/Label';
import { Main, Header, Nav, Footer, Section, Theme } from './elements/layout/LayoutGrid';
import { NavHeader } from './elements/layout/NavHeader';
import { NavMenu, NavMenuTarget } from './elements/nav/NavMenu';
import { NavToggle } from './elements/nav/NavToggle';
import { Panel } from './elements/layout/Panel';
import { RadioGroup } from './elements/form/RadioGroup';
import { TextField, EmailField, PasswordField, TextAreaField } from './elements/form/TextField';
import { VMContext, ContextTypes } from './elements/VMContext';

import { Button as _Button, Collapse, FormGroup, Label as _Label, Input } from 'reactstrap';

Button.componentTypes.ButtonComponent = _Button;

Object.assign(Checkbox.componentTypes, {
    Container: FormGroup,
    LabelComponent: _Label,
    InputComponent: Input
});

Object.assign(CheckboxGroup.componentTypes, {
    CheckboxContainer: FormGroup,
    CheckboxLabelComponent: _Label,
    InputComponent: Input
});

Collapsible.componentTypes.CollapsePanel = Collapse;
DropdownList.componentTypes.InputComponent = Input;

Object.assign(RadioGroup.componentTypes, {
    RadioContainer: FormGroup,
    RadioLabelComponent: _Label,
    InputComponent: Input
});

Object.assign(TextField.componentTypes, {
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
    FieldPanel,
    Form,
    Label,
    Main, Header, Nav, Footer, Section, Theme,
    NavHeader,
    NavMenu,
    NavMenuTarget,
    NavToggle,
    Panel,
    RadioGroup,
    TextField, EmailField, PasswordField, TextAreaField,
    VMContext
};