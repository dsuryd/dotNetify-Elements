import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContextTypes } from './VMContext';
import VMProperty from '../_internal/VMProperty';
import * as utils from '../utils';
import createWebComponent from '../utils/web-component';

const Container = styled.span`${props => props.css};`;

export default class Element extends React.Component {
   static contextTypes = ContextTypes;

   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Prevent element from being rendered.
      hidden: PropTypes.bool,

      // Occurs when the property value changes.
      onChange: PropTypes.func
   };

   get vm() {
      return this.vmProperty.vm;
   }

   get vmContext() {
      return this.context.vmContext || this.props.vmContext;
   }

   get value() {
      return this.vmProperty.value;
   }

   set value(value) {
      this.vmProperty.value = value;
   }

   get attrs() {
      return Object.assign({ fullId: this.vmProperty.fullId }, this.vmProperty.attrs, this.props);
   }

   get isVMProperty() {
      // Returns whether this component is associated with a back-end view model property.
      const state = this.vmContext && this.vmContext.getState();
      return state ? state.hasOwnProperty(this.props.id) : false;
   }

   get vmProperty() {
      if (this._vmProperty) return this._vmProperty;

      // Returns the object that provides data from the back-end view model.
      if (this.isVMProperty) {
         this._vmProperty = new VMProperty(this.vmContext, this.props.id);
         return this._vmProperty;
      }

      // Fallback is this component isn't associated with a back-end view model.
      const propId = this.props.id || Math.random().toString(36).substring(2);
      this._vmProperty = new VMProperty(
         {
            getState: id => (id === propId && this.props.hasOwnProperty('value') ? this.props.value : this.state && this.state[id]),
            setState: state => this.setState(state),
            getPropAttributes: _ => this.props.attrs || {},
            dispatchState: _ => {}
         },
         propId
      );
      return this._vmProperty;
   }

   componentDidMount() {
      this.props.onChange && this.props.onChange(this.vmProperty.value);
      if (this.props.template) this.createTemplate(this.props.template);
   }

   componentWillUpdate(props) {
      if (props.id) this._vmProperty = null;
   }

   createTemplate(templateId) {
      let templateElem = document.getElementById(templateId);
      if (templateElem) {
         templateElem = templateElem.cloneNode(true);
         let template = templateElem.innerHTML;
         this.setState({ content: template });
      }
   }

   dispatch(value) {
      return this.vmProperty.dispatch(value);
   }

   dispatchProp(propId, value) {
      return this.vmProperty.dispatchProp(propId, value);
   }

   resolveComponents(componentType) {
      return utils.resolveComponents(componentType, this.props);
   }

   render() {
      const { hidden, css } = this.attrs;
      const value = this.vmProperty.value;
      let elem = css && value ? <Container css={css}>{value}</Container> : value;
      if (this.state && this.state.content) elem = <span dangerouslySetInnerHTML={{ __html: this.state.content }} />;
      console.warn(this.vmProperty);
      return !hidden ? elem : null;
   }
}

createWebComponent(Element, 'd-element');
