import styled from 'styled-components';

export const RadioInput = styled.input.attrs({
   className: props => (props.theme.Radio.style ? 'custom-control-input' : 'form-check-input')
})`
   ${props => props.theme.Radio.Input}
`;

export const RadioLabel = styled.label.attrs({
   className: props => (props.theme.Radio.style ? 'custom-control-label' : 'form-check-label')
})`
   ${props => props.theme.Radio.Label}
`;

export const RadioContainer = styled.div.attrs({
   className: props => (props.theme.Radio.style ? 'custom-control custom-radio' : 'form-check')
})`
   ${props => (props.checked ? props.theme.Radio.Container.Checked : props.theme.Radio.Container.Default)}
`;
