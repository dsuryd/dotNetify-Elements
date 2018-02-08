import React from 'react';
import { PropTypes } from 'prop-types';
import { ContextTypes } from '../VMContext';
import * as utils from '../utils';

export class DataGrid extends React.Component {

   static contextTypes = ContextTypes;

   static propTypes = {
   }

   static componentTypes = {
      DataGridComponent: undefined
   }

   constructor(props) {
      super(props);
   }

   get vmInput() {
      return utils.getVMInput(this);
   }

   render() {
      const [_DataGrid] = utils.resolveComponents(DataGrid, this.props);
      const { ...props } = utils.mapStyle(this.props);
      const { id, value, attrs } = this.vmInput.props;

      const { columns } = attrs;
      const rowGetter = idx => value[idx];

      return (
         <_DataGrid id={id}
            columns={columns.map(col => utils.toCamelCase(col))}
            rowGetter={rowGetter}
            rowsCount={value.length}
            minHeight={500}
            {...props}
         />
      );
   }
}  
