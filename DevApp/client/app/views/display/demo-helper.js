import React from 'react';
import styled from 'styled-components';
import { Element } from 'dotnetify-elements';

const BadgeContainer = styled.div`
	padding: .1rem .5rem;
	margin-top: 2px;
	border-radius: .25rem;
	font-size: 75%;
	color: white;
	background: #fc5c7d;
`;

export class Badge extends Element {
	render() {
		return <BadgeContainer>{this.value}</BadgeContainer>;
	}
}

export const BigIcon = styled.i.attrs({
	className: 'material-icons'
})`
   width:60px; 
   font-size: 4rem;
   color: #1c8adb;
   background: transparent;
`;
