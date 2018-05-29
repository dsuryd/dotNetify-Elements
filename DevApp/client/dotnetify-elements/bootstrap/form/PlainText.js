import React from 'react';
import styled from 'styled-components';

export const PlainText = styled.p.attrs({
   className: 'form-control-plaintext'
})`
   min-height: 2.4rem;
   ${props => props.theme.Field.PlainTextContainer}
`;
