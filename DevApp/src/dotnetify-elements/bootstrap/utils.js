import { getDefaultTheme } from '../utils';

export { getDefaultTheme };

export function mapStyleToClass(props, prefix) {
   const {
      color,
      size,
      primary,
      secondary,
      success,
      danger,
      warning,
      info,
      light,
      dark,
      positive,
      negative,
      small,
      large,
      ...rest
   } = props;
   const _color = primary
      ? 'primary'
      : secondary
        ? 'secondary'
        : success || positive
          ? 'success'
          : danger || negative ? 'danger' : warning ? 'warning' : info ? 'info' : light ? 'light' : dark ? 'dark' : 'primary';
   const _size = small ? 'sm' : large ? 'lg' : size;
   return [ _color ? prefix + _color : '', _size ? prefix + _size : '' ].join(' ');
}
