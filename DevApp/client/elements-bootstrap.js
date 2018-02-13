import defaultTheme from './elements/theme';
import { Alert } from './elements/display/Alert';
import { Button } from './elements/form/Button';
import { Card } from './elements/layout/Card';
import { Checkbox } from './elements/form/Checkbox';
import { CheckboxGroup } from './elements/form/CheckboxGroup';
import { Collapsible } from './elements/layout/Collapsible';
import { DataGrid } from './elements/display/DataGrid';
import { DateField, TimeField, DateTimeField } from './elements/form/DateTimeField';
import { DotNetifyLogo } from './elements/display/DotNetifyLogo';
import { DropdownList } from './elements/form/DropdownList';
import { MultiselectList } from './elements/form/MultiselectList';
import { FieldPanel } from './elements/layout/FieldPanel';
import { Form } from './elements/form/Form';
import { Frame } from './elements/layout/Frame';
import { Label } from './elements/display/Label';
import { Main, Header, Nav, Footer, Section } from './elements/layout/LayoutGrid';
import { NavHeader } from './elements/layout/NavHeader';
import { NavMenu, NavMenuTarget } from './elements/nav/NavMenu';
import { NavToggle } from './elements/nav/NavToggle';
import { Panel } from './elements/layout/Panel';
import { RadioGroup } from './elements/form/RadioGroup';
import { TextField, NumberField, PasswordField, TextAreaField } from './elements/form/TextField';
import { Theme } from './elements/layout/Theme';
import { VMContext, ContextTypes } from './elements/VMContext';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-widgets/dist/css/react-widgets.css';
import './elements/bootstrapOverride.css';
import moment from 'moment';
import * as rs from 'reactstrap';
import * as rw from 'react-widgets';
import ReactDataGrid from 'react-data-grid';
import momentLocalizer from 'react-widgets-moment';

moment.locale('en');
momentLocalizer();

Alert.componentTypes.AlertComponent = rs.Alert;
Button.componentTypes.ButtonComponent = rs.Button;

Object.assign(Card.componentTypes, {
    Container: rs.Card,
    HeaderContainer: rs.CardHeader,
    BodyContainer: rs.CardBody
});

Object.assign(Checkbox.componentTypes, {
    Container: rs.FormGroup,
    LabelComponent: rs.Label,
    InputComponent: rs.Input
});

Object.assign(CheckboxGroup.componentTypes, {
    CheckboxContainer: rs.FormGroup,
    CheckboxLabelComponent: rs.Label,
    InputComponent: rs.Input
});

Collapsible.componentTypes.CollapsePanel = rs.Collapse;
DataGrid.componentTypes.DataGridComponent = ReactDataGrid;
DateTimeField.componentTypes.InputComponent = rw.DateTimePicker;
DropdownList.componentTypes.InputComponent = rs.Input;
MultiselectList.componentTypes.InputComponent = rw.Multiselect;

Object.assign(RadioGroup.componentTypes, {
    RadioContainer: rs.FormGroup,
    RadioLabelComponent: rs.Label,
    InputComponent: rs.Input
});

TextField.componentTypes.InputComponent = rs.Input;

export {
    defaultTheme,
    Alert,
    Button,
    Card,
    Checkbox,
    CheckboxGroup,
    Collapsible,
    ContextTypes,
    DataGrid,
    DateField, TimeField, DateTimeField,
    DotNetifyLogo,
    DropdownList,
    FieldPanel,
    Form,
    Label,
    Main, Header, Nav, Footer, Section,
    MultiselectList,
    NavHeader,
    NavMenu,
    NavMenuTarget,
    NavToggle,
    Panel, Frame,
    RadioGroup,
    TextField, NumberField, PasswordField, TextAreaField,
    Theme,
    VMContext
};