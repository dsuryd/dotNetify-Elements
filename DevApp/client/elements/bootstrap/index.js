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
import { RadioToggle } from '../../elements/form/RadioToggle';
import { TextField, NumberField, PasswordField } from '../../elements/form/TextField';
import { TextAreaField } from '../../elements/form/TextAreaField';
import { Theme } from '../../elements/layout/Theme';
import { VMContext, ContextTypes } from '../../elements/VMContext';

import { Alert as _Alert } from './Alert';
import { Button as _Button } from './Button';
import { Card as _Card, CardHeader, CardBody } from './Card';
import { CheckboxInput, CheckboxLabel, CheckboxGroup as _CheckboxGroup } from './Checkbox';
import { Input, InputGroup } from './Input';
import { Select } from './Select';
import { RadioInput, RadioLabel, RadioContainer } from './Radio';
import { RadioToggleInput, RadioToggleLabel, RadioToggleGroup, RadioToggleContainer } from './RadioToggle';
import { TextArea } from './TextArea';

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

Object.assign(DateTimeField.componentTypes, {
   InputComponent: rw.DateTimePicker,
   InputGroupComponent: InputGroup
});

Object.assign(DropdownList.componentTypes, {
   InputComponent: Select,
   InputGroupComponent: InputGroup
});

Object.assign(MultiselectList.componentTypes, {
   InputComponent: rw.Multiselect,
   InputGroupComponent: InputGroup
});

Object.assign(RadioGroup.componentTypes, {
   RadioContainer: RadioContainer,
   RadioLabelComponent: RadioLabel,
   InputComponent: RadioInput
});

Object.assign(RadioToggle.componentTypes, {
   RadioContainer: RadioToggleContainer,
   RadioGroupContainer: RadioToggleGroup,
   RadioLabelComponent: RadioToggleLabel,
   InputComponent: RadioToggleInput
});

Object.assign(TextField.componentTypes, {
   InputComponent: Input,
   InputGroupComponent: InputGroup
});

Object.assign(TextAreaField.componentTypes, {
   InputComponent: TextArea
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
   RadioToggle,
   TextField, NumberField, PasswordField, TextAreaField,
   Theme,
   VMContext
};