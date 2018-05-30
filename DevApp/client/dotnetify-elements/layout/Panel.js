import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: ${props => props.flex};
   ${props => (props.middle ? 'align-items: center' : '')};
   flex-wrap: ${props => (props.flexWrap ? 'wrap' : 'nowrap')};
   justify-content: ${props => (props.right ? 'flex-end' : 'flex-start')};
   flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
   margin: ${props => props.margin};
   height: ${props => props.height || (props.flex ? 'auto' : 'fit-content')};
   width: ${props => props.width || (props.right ? 'auto' : 'inherit')};
   overflow: ${props => (props.flex ? 'auto' : 'unset')};
   ${props => props.css};
   ${props => props.theme.Panel.Container};
`;

const ChildContainer = styled.div`
   ${props => (props.flex ? 'display: flex; align-items: stretch' : '')};
   flex: ${props => props.flex};
   padding: ${props => props.padding};
   ${props => props.theme.Panel.ChildContainer};
`;

export class Panel extends React.Component {
   static contextTypes = {
      theme: PropTypes.object
   };

   static propTypes = {
      // Properties to apply to all child components.
      childProps: PropTypes.object,

      // Sets the container component's css styles.
      css: PropTypes.string,

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

      // Displays child components horizontally from the right.
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

   get children() {
      return React.Children.toArray(this.props.children).filter(x => x);
   }

   get numChildren() {
      return React.Children.count(this.children);
   }

   constructor(props) {
      super(props);
      this.state = { showChildren: new Array(this.numChildren).fill(true) };
   }

   getPadding(idx, gap, horizontal, wrap) {
      if (wrap) {
         let padding = `0 ${gap} 0 0`;
         return padding;
      }
      let padding = horizontal ? `0 0 0 ${gap}` : `${gap} 0 0 0`;
      return idx > 0 ? padding : 0;
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
      const { childProps, gap, noGap, smallGap, horizontal, margin, noMargin, smallMargin, right, middle, height, width, wrap, flex, css, style } = this.props;

      const { Gap, Margin } = this.context.theme.Panel;
      const _gap = gap || (noGap ? '0' : smallGap ? Gap.small : Gap.large);
      const _margin = margin || (noMargin ? '0' : smallMargin ? Margin.small : Margin.large);
      const _horizontal = horizontal || right || wrap;

      let _flex = typeof flex == 'boolean' ? (flex ? '1' : null) : flex;
      _flex = _flex || (childProps && childProps.flex) || React.Children.toArray(this.children).some(child => child.props && child.props.flex) ? '1' : null;

      return (
         <Container
            margin={_margin}
            horizontal={_horizontal}
            right={right}
            middle={middle}
            width={width}
            height={height}
            flexWrap={wrap}
            flex={_flex}
            style={style}
            css={css}
         >
            {this.children.map((child, idx) => {
               const { flex, ..._childProps } = childProps || {};
               let childFlex = flex || (child.props && child.props.flex);
               childFlex = typeof childFlex == 'boolean' ? (childFlex ? '1' : null) : childFlex;

               // If child or its container has 'css' attribute, it's a derivate of Panel, don't wrap it.
               const hasCssPropType = x => x && x.propTypes && x.propTypes.css;
               const childContainer = child.type && child.type.componentTypes ? child.type.componentTypes.Container : null;
               if (hasCssPropType(child.type) || hasCssPropType(childContainer)) {
                  const padding = this.numChildren <= 1 ? 0 : this.getPadding(idx, _gap, _horizontal, wrap);
                  const style = { ...this.getStyle(idx), padding: padding };
                  return React.cloneElement(child, utils.mergeProps(child, childProps, { style: style, onShow: show => this.handleShow(idx, show) }));
               }

               return (
                  <ChildContainer
                     key={idx}
                     style={this.getStyle(idx)}
                     flex={childFlex}
                     padding={this.numChildren <= 1 ? 0 : this.getPadding(idx, _gap, _horizontal)}
                  >
                     {child.props ? React.cloneElement(child, utils.mergeProps(child, _childProps, { onShow: show => this.handleShow(idx, show) })) : child}
                  </ChildContainer>
               );
            })}
         </Container>
      );
   }
}
