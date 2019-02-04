import 'react-widgets/dist/css/react-widgets.css';
import styled from 'styled-components';
import * as rw from 'react-widgets';

const StyledMultiSelect = styled(rw.Multiselect)`
> .rw-widget-input {
   ${props => props.theme.Input}
   ${props => (props.valid === false ? props.theme.InputValidationError : '')};
}
`;

export const Multiselect = StyledMultiSelect;
