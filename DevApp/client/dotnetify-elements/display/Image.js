import React from 'react';
import { PropTypes } from 'prop-types';
import Element from '../core/Element';
import * as utils from '../utils';

export class Image extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired
   };

   render() {
      const { fullId, ...props } = this.attrs;

      return this.value ? <img src={this.value} /> : null;
   }
}
