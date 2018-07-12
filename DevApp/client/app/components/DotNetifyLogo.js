import React from 'react';
import styled from 'styled-components';
import { Label, Panel } from 'dotnetify-elements';
import logo from './logo.png';

const Logo = styled.img`
	font-size: x-large;
	display: flex;
	align-items: center;
	padding-left: 1rem;
	width: 200px;
`;

export const LicenseNotice = styled.div`
	margin-top: auto;
	margin-left: auto;
	padding: 5px 8px;
	font-size: .8rem;
	color: #999;
	a {
		color: #337ab7;
		&:hover {
			color: #0056b3;
			text-decoration: none;
		}
		&:focus {
			color: #337ab7;
			> * {
				background: #e7e7e7;
			}
		}
	}
`;

const GitHubIcon = _ => (
	<span>
		<svg style={{ width: '24px', height: '24px', fill: 'gray' }} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
		</svg>
	</span>
);

const LightThemeIcon = _ => (
	<span>
		<svg style={{ width: '24px', height: '24px', fill: 'gray' }} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
		</svg>
	</span>
);

const DarkThemeIcon = _ => (
	<span>
		<svg style={{ width: '24px', height: '24px', fill: 'gray' }} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<path d="m9,21c0,0.55 0.45,1 1,1l4,0c0.55,0 1,-0.45 1,-1l0,-1l-6,0l0,1zm3,-19c-3.86,0 -7,3.14 -7,7c0,2.38 1.19,4.47 3,5.74l0,2.26c0,0.55 0.45,1 1,1l6,0c0.55,0 1,-0.45 1,-1l0,-2.26c1.81,-1.27 3,-3.36 3,-5.74c0,-3.86 -3.14,-7 -7,-7z" />
		</svg>
	</span>
);

const themeIconCss = `
   cursor: pointer;
   @media (max-width: 320px) {
      display: none;
    }   
`;

export const GitHubLink = _ => (
	<Panel padding="1rem 1rem .5rem 1rem; &:hover { background: #efefef; }">
		<a href="https://github.com/dsuryd/dotNetify-Elements">
			<Label icon={<GitHubIcon />} css="cursor: pointer">
				GitHub
			</Label>
		</a>
	</Panel>
);

export const ThemeToggle = props => (
	<a onClick={props.onClick}>
		<Label icon={props.name === 'light' ? <LightThemeIcon /> : <DarkThemeIcon />} css={themeIconCss} />
	</a>
);

const NavHeader = styled.div`
	height: 55px;
	display: flex;
	align-items: center;
`;

const DotNetifyLogo = _ => (
	<NavHeader>
		<Logo src={logo} />
	</NavHeader>
);

export default DotNetifyLogo;
