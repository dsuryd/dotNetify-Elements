import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as utils from '../utils';

const Container = styled.div`
   display: flex;
   flex: ${props => props.flex};
   ${props => (props.middle ? 'align-items: center' : '')};
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
      childProps: PropTypes.object,
      gap: PropTypes.bool,
      noGap: PropTypes.bool,
      smallGap: PropTypes.bool,
      horizontal: PropTypes.bool,
      margin: PropTypes.string,
      noMargin: PropTypes.bool,
      smallMargin: PropTypes.bool,
      right: PropTypes.bool,
      middle: PropTypes.bool,
      flex: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
      css: PropTypes.string,
      height: PropTypes.string,
      width: PropTypes.string,
      onShow: PropTypes.func
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

   getPadding(idx, gap, horizontal) {
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
      const { childProps, gap, noGap, smallGap, horizontal, margin, noMargin, smallMargin, right, middle, height, width, flex, css, style } = this.props;

      const { Gap, Margin } = this.context.theme.Panel;
      const _gap = gap || (noGap ? '0' : smallGap ? Gap.small : Gap.large);
      const _margin = margin || (noMargin ? '0' : smallMargin ? Margin.small : Margin.large);
      const _horizontal = horizontal || right;

      let _flex = typeof flex == 'boolean' ? (flex ? '1' : null) : flex;
      _flex = _flex || (childProps && childProps.flex) || React.Children.toArray(this.children).some(child => child.props && child.props.flex) ? '1' : null;

      return (
         <Container margin={_margin} horizontal={_horizontal} right={right} middle={middle} width={width} height={height} flex={_flex} style={style} css={css}>
            {this.children.map((child, idx) => {
               const { flex, ..._childProps } = childProps || {};
               let childFlex = flex || (child.props && child.props.flex);
               childFlex = typeof childFlex == 'boolean' ? (childFlex ? '1' : null) : childFlex;

               // If child or its container has 'css' attribute, it's a derivate of Panel, don't wrap it.
               const hasCssPropType = x => x && x.propTypes && x.propTypes.css;
               const childContainer = child.type && child.type.componentTypes ? child.type.componentTypes.Container : null;
               if (hasCssPropType(child.type) || hasCssPropType(childContainer)) {
                  const padding = this.numChildren <= 1 ? 0 : this.getPadding(idx, _gap, _horizontal);
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
