import 'react-widgets/dist/css/react-widgets.css';
import styled from 'styled-components';
import rwMultiSelect from 'react-widgets/lib/Multiselect';

const StyledMultiSelect = styled(rwMultiSelect)`
> .rw-widget-input {
   ${props => props.theme.Input}
   ${props => (props.valid === false ? props.theme.InputValidationError : '')};
}
`;

export const Multiselect = StyledMultiSelect;
