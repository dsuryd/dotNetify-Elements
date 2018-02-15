import defaultTheme from '../../elements/theme';
import { Alert } from '../../elements/display/Alert';
import { Button } from '../../elements/form/Button';
import { Card } from '../../elements/layout/Card';
import { Checkbox } from '../../elements/form/Checkbox';
import { CheckboxGroup } from '../../elements/form/CheckboxGroup';
import { Collapsible } from '../../elements/layout/Collapsible';
import { DataGrid } from '../../elements/display/DataGrid';
import { DateField, TimeField, DateTimeField } from '../../elements/form/DateTimeField';
import { DotNetifyLogo } from '../../elements/display/DotNetifyLogo';
import { DropdownList } from '../../elements/form/DropdownList';
import { MultiselectList } from '../../elements/form/MultiselectList';
import { FieldPanel } from '../../elements/layout/FieldPanel';
import { Form } from '../../elements/form/Form';
import { Frame } from '../../elements/layout/Frame';
import { Label } from '../../elements/display/Label';
import { Main, Header, Nav, Footer, Section } from '../../elements/layout/LayoutGrid';
import { NavHeader } from '../../elements/layout/NavHeader';
import { NavMenu, NavMenuTarget } from '../../elements/nav/NavMenu';
import { NavToggle } from '../../elements/nav/NavToggle';
import { Panel } from '../../elements/layout/Panel';
import { RadioGroup } from '../../elements/form/RadioGroup';
import { TextField, NumberField, PasswordField, TextAreaField } from '../../elements/form/TextField';
import { Theme } from '../../elements/layout/Theme';
import { VMContext, ContextTypes } from '../../elements/VMContext';

import { Alert as _Alert } from './Alert';
import { Button as _Button } from './Button';
import { Input, CheckboxInput, CheckboxLabel, CheckboxGroup as _CheckboxGroup, RadioInput, RadioLabel, RadioGroup as _RadioGroup, SelectInput } from './Forms';
import { Card as _Card, CardHeader, CardBody } from './Card';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-widgets/dist/css/react-widgets.css';
import './override.css';
import moment from 'moment';
import * as rs from 'reactstrap';
import * as rw from 'react-widgets';
import ReactDataGrid from 'react-data-grid';
import momentLocalizer from 'react-widgets-moment';

moment.locale('en');
momentLocalizer();

Alert.componentTypes.AlertComponent = _Alert;
Button.componentTypes.ButtonComponent = _Button;
Collapsible.componentTypes.CollapsePanel = rs.Collapse;
DataGrid.componentTypes.DataGridComponent = ReactDataGrid;
DateTimeField.componentTypes.InputComponent = rw.DateTimePicker;
DropdownList.componentTypes.InputComponent = SelectInput;
MultiselectList.componentTypes.InputComponent = rw.Multiselect;
TextField.componentTypes.InputComponent = Input;

Object.assign(Card.componentTypes, {
   Container: _Card,
   HeaderContainer: CardHeader,
   BodyContainer: CardBody
});

Object.assign(Checkbox.componentTypes, {
   Container: _CheckboxGroup,
   LabelComponent: CheckboxLabel,
   InputComponent: CheckboxInput
});

Object.assign(CheckboxGroup.componentTypes, {
   CheckboxContainer: _CheckboxGroup,
   CheckboxLabelComponent: CheckboxLabel,
   InputComponent: CheckboxInput
});

Object.assign(RadioGroup.componentTypes, {
   RadioContainer: _RadioGroup,
   RadioLabelComponent: RadioLabel,
   InputComponent: RadioInput
});

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