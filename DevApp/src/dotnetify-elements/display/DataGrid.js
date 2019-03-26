import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Element from '../core/Element';
import * as utils from '../utils';
import lightTheme from '../theme-light';
import createWebComponent from '../utils/web-component';
import WebComponentHelper from './../utils/web-component-helper';

const Container = styled.div`
   display: flex;
   flex: ${utils.flexAuto};
   width: 100%;
   margin-bottom: 1px;
   .react-grid-Header {
      ${props => props.theme.DataGrid.Header};
   }
   .react-grid-HeaderCell {
      font-weight: 500;
      ${props => props.theme.DataGrid.HeaderCell};
   }
   .react-grid-Row {
      ${props => props.theme.DataGrid.Row};
   }
   .react-grid-Cell {
      ${props => !props.showCellOutline && '&:focus { outline: none }'};
      .drag-handle {
         display: none;
      }
      ${props => props.theme.DataGrid.Cell};
   }
   ${props => props.theme.DataGrid.Container};
   ${props => props.css};
`;

Container.defaultProps = { theme: lightTheme };

export class DataGrid extends Element {
   static propTypes = {
      // Identifies the associated view model property.
      id: PropTypes.string.isRequired,

      // Enables selection.
      enable: PropTypes.bool,

      // Sets custom height.
      height: PropTypes.string,

      // Sets custom row height.
      rowHeight: PropTypes.string,

      // Occurs when an item is selected.
      onSelect: PropTypes.func,

      // Occurs when a cell is edited.
      onEdit: PropTypes.func
   };

   static defaultProps = {
      rowHeight: '35px'
   };

   static componentTypes = {
      Container,
      DataGridComponent: undefined
   };

   constructor(props) {
      super(props);
      this.state = { height: this.props.height ? utils.toPixel(this.props.height) : null };
      this.redraw = true;
   }

   componentDidMount() {
      this.canSelect = [ 'Single', 'Multiple' ].includes(this.attrs.selectMode);
      this.isMultiselect = this.attrs.selectMode === 'Multiple';
      this.selectedKeyProperty = this.attrs.selectedKeyProperty;
      this.onEditProperty = this.attrs.onEditProperty;

      this.updateSelectedKey();

      this.handleResize = _ => {
         // If window is resized while this is hidden, force redraw when it's visible.
         if (this.elem && !this.elem.offsetParent) this.redraw = true;
         this.updateHeight();
      };

      window.addEventListener('resize', this.handleResize);
      setTimeout(_ => this.emitEvent('resize'), 100);
   }

   componentDidUpdate(props, state) {
      this.updateSelectedKey();

      if (this.redraw) {
         this.redraw = null;
         setTimeout(_ => this.emitEvent('resize'));
      }
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
   }

   deselect(keys) {
      const selectedKey = this.isMultiselect ? this.state.selectedKey.filter(key => !keys.includes(key)) : null;
      this.dispatchSelection(selectedKey);
      this.setState({ selectedKey: selectedKey });
      if (this.selectedKeyProperty) this.vmProperty.vmState[this.selectedKeyProperty] = selectedKey;
   }

   dispatchSelection(value) {
      this.selectedKeyProperty && this.dispatchProp(this.selectedKeyProperty, value);
      this.props.onSelect && this.props.onSelect(value);
   }

   emitEvent(eventType, element) {
      let event = document.createEvent('Event');
      event.initEvent(eventType, true, true);
      (element || window).dispatchEvent(event);
   }

   mapColumns(children, columns) {
      let [ gridColumns, rest ] = utils.filterChildren(
         children,
         child => child.type == GridColumn || child.type == 'd-grid-column'
      );

      // Map GridColumn attributes to React data grid column definition.
      let mapGridColumn = gridCol => {
         let { label, width, formatter, editor, columnChildren } = gridCol.props;
         let key = gridCol.key;
         if (gridCol.type == 'd-grid-column') {
            formatter = WebComponentHelper._parseFunctionString(formatter);
            key = gridCol.props.colkey;
         }

         let col = {
            formatter: formatter || (columnChildren ? React.Children.only(columnChildren) : null),
            getRowMetaData: row => {
               const key = this.attrs.rowKey ? row[this.attrs.rowKey] : null;
               return { key, row };
            },
            editor: editor
         };
         if (key) col.key = key;
         if (label) col.name = label;
         if (width) col.width = utils.toPixel(width);
         return col;
      };

      // For each column, find the GridColumn element with a matching name.  The element will provide information
      // to customize the column, such as width and the formatter to format the column text.
      let result = (columns || []).map(c => {
         c = utils.toCamelCase(c);
         let col = {
            key: c.key,
            name: c.label,
            editable: c.editable,
            resizable: c.resizable,
            sortable: c.sortable,
            width: c.width ? utils.toPixel(c.width) : null
         };

         const gridCol = gridColumns.find(
            x => (x.type == GridColumn && x.key === c.key) || (x.type == 'd-grid-column' && x.props.colkey === c.key)
         );
         if (gridCol) {
            Object.assign(col, mapGridColumn(gridCol));
            gridColumns = gridColumns.filter(x => x !== gridCol);
         }

         return col;
      });

      if (gridColumns.length > 0) {
         result = [ ...result, ...gridColumns.map(x => mapGridColumn(x)) ];
      }
      return result;
   }

   select(key) {
      const isChanged = this.isMultiselect ? !this.state.selectedKey.includes(key) : this.state.selectedKey != key;
      if (isChanged) {
         const selectedKey = this.isMultiselect ? [ key, ...this.state.selectedKey ] : key;
         this.dispatchSelection(selectedKey);
         this.setState({ selectedKey: selectedKey });
         if (this.selectedKeyProperty) this.vmProperty.vmState[this.selectedKeyProperty] = selectedKey;
      }
   }

   sort = (sortColumn, sortDirection) => {
      const comparer = (a, b) =>
         sortDirection == 'ASC'
            ? a[sortColumn] > b[sortColumn] ? 1 : -1
            : sortDirection == 'DESC' ? (a[sortColumn] < b[sortColumn] ? 1 : -1) : null;

      if (!this.unsortedValue) this.unsortedValue = [ ...this.value ];
      this.value = sortDirection !== 'NONE' ? this.value.sort(comparer) : [ ...this.unsortedValue ];
   };

   updateHeight = _ => {
      // Adjust the grid's height to the available space.
      if (this.elem && this.elem.offsetParent && this.elem.offsetHeight !== this.state.height) {
         this.setState({ height: this.elem.offsetHeight });

         // Hack to force refresh.
         if (this.gridDom && this.gridDom.getDataGridDOMNode) {
            var gridCanvas = this.gridDom.getDataGridDOMNode().querySelector('.react-grid-Canvas');
            gridCanvas.scrollTop = gridCanvas.scrollTop + 1;
         }
      }
   };

   updateSelectedKey() {
      if (this.selectedKeyProperty) {
         const selectedKey = this.vmProperty.vmState[this.selectedKeyProperty];
         if (!utils.deepEqual(selectedKey, this.state.selectedKey)) {
            this.setState({ selectedKey: selectedKey });
            this.props.onSelect && this.props.onSelect(selectedKey);
            this.vmProperty.vmState[this.selectedKeyProperty] = selectedKey;

            // Make sure the selected row is visible.
            const visibleKey = this.isMultiselect ? selectedKey.shift() : selectedKey;
            const rowIdx = this.value.findIndex(x => x[this.attrs.rowKey] === visibleKey);
            this.handleScrollToRow(rowIdx);
         }
      }
   }

   handleRowClick = (idx, row) => {
      if (row && this.canSelect && this.props.enable !== false) {
         const selectedKey = this.attrs.rowKey ? row[this.attrs.rowKey] : idx;
         this.select(selectedKey);
      }
   };

   handleRowsSelected = rows => {
      rows.map(row => this.handleRowClick(row.rowIdx, row.row));
   };

   handleRowsDeselected = rows => {
      const deselectedKeys = rows.map(row => (this.attrs.rowKey ? row.row[this.attrs.rowKey] : row.rowIdx));
      this.deselect(deselectedKeys);
   };

   handleRowsUpdated = ({ fromRow, toRow, updated }) => {
      const key = Object.keys(updated)[0];
      const value = updated[key];
      if (this.value[fromRow][key] === value) return;

      let isValid = true;
      const id = this.attrs.rowKey ? this.value[fromRow][this.attrs.rowKey] : fromRow;
      const keyValue = { Id: id, Key: key, Value: value };
      if (this.props.onEdit) isValid = this.props.onEdit(keyValue) !== false;

      if (isValid) {
         this.value[fromRow] = { ...this.value[fromRow], ...updated };
         this.onEditProperty && this.dispatchProp(this.onEditProperty, keyValue);
      }
   };

   handleScrollToRow(idx) {
      if (this.gridDom && this.gridDom.getDataGridDOMNode) {
         var top = this.gridDom.getRowOffsetHeight() * idx;
         var gridCanvas = this.gridDom.getDataGridDOMNode().querySelector('.react-grid-Canvas');
         if (
            top < gridCanvas.scrollTop ||
            top > gridCanvas.scrollTop + this.state.height - 2 * utils.toPixel(this.attrs.rowHeight)
         ) {
            gridCanvas.scrollTop = top;

            // Hack to fix row data not getting updated when programmatically selected.
            setTimeout(_ => {
               var row = this.gridDom.getDataGridDOMNode().querySelector('.react-grid-Cell.row-selected');
               this.emitEvent('click', row);
            });
         }
      } else setTimeout(_ => this.handleScrollToRow(idx));
   }

   handleSelectBy = _ => {
      return this.attrs.rowKey
         ? {
              keys: {
                 rowKey: this.attrs.rowKey,
                 values: this.isMultiselect ? this.state.selectedKey : [ this.state.selectedKey ]
              }
           }
         : { indexes: this.isMultiselect ? this.state.selectedKey : [ this.state.selectedKey ] };
   };

   render() {
      const [ Container, _DataGrid ] = utils.resolveComponents(DataGrid, this.props);
      const { fullId, rowKey, columns, rows, height, rowHeight, style, css, children, ...props } = this.attrs;

      const rowsCount = this.value && this.value.length;
      const rowGetter = idx => this.value[idx];
      let minHeight = rows ? (rows + 1) * utils.toPixel(rowHeight) + 2 : this.state.height;
      if (minHeight === null) minHeight = (rowsCount + 1) * utils.toPixel(rowHeight) + 2;

      const editEnabled = this.props.enable !== false && columns.some(c => c.Editable);

      return (
         <Container style={style} css={css} showCellOutline={editEnabled} innerRef={elem => (this.elem = elem)}>
            <_DataGrid
               id={fullId}
               columns={this.mapColumns(children, columns)}
               rowGetter={rowGetter}
               rowsCount={rowsCount}
               rowHeight={utils.toPixel(rowHeight)}
               minHeight={minHeight}
               height={minHeight}
               enableCellSelect={editEnabled}
               onRowClick={this.handleRowClick}
               onGridSort={this.sort}
               onGridRowsUpdated={this.handleRowsUpdated}
               rowSelection={{
                  showCheckbox: !!this.isMultiselect,
                  onRowsSelected: this.handleRowsSelected,
                  onRowsDeselected: this.handleRowsDeselected,
                  selectBy: this.handleSelectBy()
               }}
               ref={elem => (this.gridDom = elem)}
               {...props}
            />
         </Container>
      );
   }
}

export class GridColumn extends React.Component {
   static propTypes = {
      // Content formatter.
      formatter: PropTypes.func,

      // Content editor.
      editor: PropTypes.func,

      // Sets custom width.
      width: PropTypes.string
   };

   render() {
      return this.props.children;
   }
}

createWebComponent(DataGrid, 'd-data-grid');
createWebComponent(GridColumn, 'd-grid-column');
