import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';
import createWebComponent from '../web-components/PanelComponent';

const Container = styled.div`
   display: flex;
   flex: ${utils.flexAuto};
   ${props => props.flex && `flex: ${props.flex}`};
   flex-wrap: ${props => (props.flexWrap ? 'wrap' : 'nowrap')};
   justify-content: ${props => (props.apart ? 'space-between' : props.bottom ? 'flex-end' : props.center ? 'center' : 'flex-start')};
   flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
   margin: ${props => props.margin};
   padding: ${props => props.padding};
   height: ${props => props.height || (props.flex ? 'auto' : 'fit-content')};
   width: ${props => props.width || (props.right ? 'auto' : 'inherit')};
   overflow: ${props => (props.flex ? 'auto' : 'unset')};
   ${props => props.middle && 'align-items: center'};
   ${props => props.right && (props.horizontal ? 'justify-content: flex-end' : 'align-items: flex-end')};
   ${props => props.css};
   ${props => props.theme.Panel.Container};
`;

const ChildContainer = styled.div`
   ${props => props.flex && 'display: flex; align-items: stretch'};
   flex: ${props => props.flex};
   margin: ${props => props.margin};
   padding: ${props => props.padding};
   ${props => props.theme.Panel.ChildContainer};
`;

Container.defaultProps = { theme: utils.getDefaultTheme() };
ChildContainer.defaultProps = { theme: utils.getDefaultTheme() };

export class Panel extends React.Component {
   static contextTypes = {
      theme: PropTypes.object
   };

   static propTypes = {
      // Displays child components horizontally and apart from each other.
      apart: PropTypes.bool,

      // Aligns child components to the bottom.
      bottom: PropTypes.bool,

      // Centers the child components horizontally.
      center: PropTypes.bool,

      // Properties to apply to all child components.
      childProps: PropTypes.object,

      // Sets css flex property; if true, same as 'flex: 1'.
      flex: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),

      // Sets custom gap between child components.
      gap: PropTypes.string,

      // Sets custom height.
      height: PropTypes.string,

      // Displays child components horizontally.
      horizontal: PropTypes.bool,

      // Sets custom panel's margin.
      margin: PropTypes.string,

      // Centers the child components on the cross-axis.
      middle: PropTypes.bool,

      // Removes the gap between child components.
      noGap: PropTypes.bool,

      // Removes the panel's margin.
      noMargin: PropTypes.bool,

      // Sets custom padding.
      padding: PropTypes.string,

      // Aligns child components to the right.
      right: PropTypes.bool,

      // Sets small gap between child components according to the theme.
      smallGap: PropTypes.bool,

      // Sets small panel's margin according to the theme.
      smallMargin: PropTypes.bool,

      // Sets custom width.
      width: PropTypes.string,

      // Wraps the child components to multi-lines if they overflow.
      wrap: PropTypes.bool
   };

   static defaultProps = {
      noMargin: true
   };

   static componentTypes = {
      Container,
      ChildContainer
   };

   static _isPanel = true;

   get children() {
      let children = React.Children.toArray(this.props.children);
      if (children.length == 1 && children[0].type == React.Fragment) {
         children = React.Children.toArray(children[0].props.children);
      }

      return children.filter(x => x).filter(x => x.props && x.props.show !== false);
   }

   get numChildren() {
      return React.Children.count(this.children);
   }

   constructor(props) {
      super(props);
      this.state = { showChildren: new Array(this.numChildren).fill(true) };
   }

   getMargin(idx, gap, horizontal, wrap) {
      if (wrap) return `calc(${gap}/2)`;

      let margin = horizontal ? `0 0 0 ${gap}` : `${gap} 0 0 0`;
      return idx > 0 ? margin : 0;
   }

   getStyle = idx => {
      const showChild = this.state.showChildren[idx] !== false;
      return !showChild ? { display: 'none' } : null;
   };

   handleShow = (idx, show) => {
      setTimeout(() => {
         let showChildren = this.state.showChildren;
         if (showChildren[idx] !== show) {
            showChildren[idx] = show;
            this.setState({ showChildren });
         }
      }, 1);
   };

   render() {
      const [ Container, ChildContainer ] = utils.resolveComponents(Panel, this.props);
      const {
         childProps,
         apart,
         gap,
         noGap,
         smallGap,
         horizontal,
         padding,
         margin,
         noMargin,
         smallMargin,
         center,
         right,
         middle,
         bottom,
         height,
         width,
         wrap,
         flex,
         css,
         style
      } = this.props;

      const hasCell = this.children.some(x => x.type && (x.type._typeName === 'Cell' || x.type === 'd-cell'));

      const theme = this.context.theme || utils.getDefaultTheme();
      const Gap = theme.Panel.Gap;
      const Margin = theme.Panel.Margin;

      const _gap = gap || (noGap || hasCell ? '0rem' : smallGap ? Gap.small : Gap.large);
      let _margin = margin || (noMargin ? '0rem' : smallMargin ? Margin.small : Margin.large);
      let _width = width;

      // If wrap is enabled, use negative margin on the outer container to counter the full margin
      // on the child items. Must increase the width too.
      if (wrap && this.numChildren > 1) {
         _margin = `calc(${_margin} + ${_gap}/2 * -1)`;
         _width = `calc(100% + ${_gap})`;
      }

      const _horizontal = (horizontal && !bottom) || wrap || apart;

      const flexAuto = utils.flexAuto;
      let _flex = typeof flex == 'boolean' ? (flex ? flexAuto : '0') : flex;
      if (!_flex) _flex = (childProps && childProps.flex) || this.children.some(child => child.props && child.props.flex) ? flexAuto : null;

      return (
         <Container
            margin={_margin}
            padding={padding}
            horizontal={_horizontal}
            apart={apart}
            center={center}
            right={right}
            middle={middle}
            bottom={bottom}
            width={_width}
            height={height}
            flexWrap={wrap}
            flex={_flex}
            style={style}
            css={css}
         >
            {this.children.map((child, idx) => {
               const { flex, ..._childProps } = childProps || {};
               let childFlex = flex || (child.props && child.props.flex);
               childFlex = typeof childFlex == 'boolean' ? (childFlex ? flexAuto : null) : childFlex;

               // If child or its container is a derivative of Panel, don't wrap it.
               const isPanel = x => x && (x._isPanel || x == 'd-panel');
               const childContainer = child.type && child.type.componentTypes ? child.type.componentTypes.Container : null;
               if (isPanel(child.type) || isPanel(childContainer)) {
                  let style = this.getStyle(idx);
                  const margin = this.numChildren <= 1 ? null : this.getMargin(idx, _gap, _horizontal, wrap);
                  if (margin) style = { ...style, margin: margin };

                  let mergedChildProps = utils.mergeProps(child, childProps, {
                     style: style,
                     flex: childFlex,
                     onShow: show => this.handleShow(idx, show)
                  });

                  if (child.type == 'd-panel') {
                     mergedChildProps._margin = margin;
                  }

                  return React.cloneElement(child, mergedChildProps);
               }

               return (
                  <ChildContainer
                     key={idx}
                     style={this.getStyle(idx)}
                     flex={childFlex}
                     margin={this.numChildren <= 1 ? 0 : this.getMargin(idx, _gap, _horizontal, wrap)}
                  >
                     {child.props ? (
                        React.cloneElement(child, utils.mergeProps(child, _childProps, { onShow: show => this.handleShow(idx, show) }))
                     ) : (
                        child
                     )}
                  </ChildContainer>
               );
            })}
         </Container>
      );
   }
}

let panelComponent = createWebComponent(Panel, 'd-panel');
