import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Element from '../core/Element';
import * as utils from '../utils';

const LabelContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: ${props => (props.right ? 'row-reverse' : 'row')};
	justify-content: ${props => (props.apart ? 'space-between' : 'flex-start')};
	width: ${props => (props.apart ? '100%' : 'unset')};
	${props => props.bold && 'font-weight: 500'};
	${props => props.italic && 'font-style: italic'};
	${props => props.theme.Label.Container};
	${props => props.css};
`;

const IconContainer = styled.span`
	margin: ${props => (props.noMargin ? '0' : props.right ? '0 0 0 .5rem ' : '0 .5rem 0 0')};
	${props => props.theme.Label.IconContainer};
`;

const Icon = styled.i.attrs({
	className: props => props.className
})`
    ${props => props.theme.Label.IconComponent}    
`;

const IconComponent = props => {
	let className = props.name;
	let ligature = '';
	if (props.name.startsWith('material-icons')) {
		const subNames = props.name.split(' ');
		className = subNames[0];
		ligature = subNames[1];
	}
	return <Icon className={className}>{ligature}</Icon>;
};

export class Label extends Element {
	static propTypes = {
		// Identifies the associated view model property.
		id: PropTypes.string,

		// Displays the text and icon apart from each other.
		apart: PropTypes.bool,

		// Bold text.
		bold: PropTypes.bool,

		// Icon to the left.
		icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

		// Italic text.
		italic: PropTypes.bool,

		// Displays the text and icon from the right.
		right: PropTypes.bool,

		// Icon to the right.
		rightIcon: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
	};

	static componentTypes = {
		LabelContainer,
		IconContainer,
		IconComponent
	};

	render() {
		const [ LabelContainer, IconContainer, Icon ] = utils.resolveComponents(Label, this.props);
		const { right, apart, icon, rightIcon, bold, italic, style, css, children } = this.attrs;
		const _icon = typeof icon === 'string' ? <Icon name={icon} /> : icon;
		const _rightIcon = typeof rightIcon === 'string' ? <Icon name={rightIcon} /> : rightIcon;
		const hasLabel = !!(this.value || children);

		return (
			<LabelContainer right={right} apart={apart} bold={bold} italic={italic} style={style} css={css}>
				{_icon && (
					<IconContainer right={right} noMargin={!hasLabel}>
						{_icon}
					</IconContainer>
				)}
				{this.value}
				{children}
				{_rightIcon && <IconContainer right={!right}>{_rightIcon}</IconContainer>}
			</LabelContainer>
		);
	}
}
