import 'react-widgets/dist/css/react-widgets.css';
import styled from 'styled-components';
import rwDateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';

moment.locale('en');
momentLocalizer();

const StyledDateTimePicker = styled(rwDateTimePicker)`
> .rw-widget-picker {
   ${props => props.theme.Input}
   ${props => (props.valid === false ? props.theme.InputValidationError : '')};
   ${props => props.css};
}
`;

export const DateTimePicker = StyledDateTimePicker;
