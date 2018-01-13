import React from 'react';

export function mapChildren(children, predicate, mapper) {
    return React.Children.map(children, child => {
        if (child.type && predicate(child))
            return mapper(child);
        else if (child.props && child.props.children)
            return React.cloneElement(child, child.props, this.mapChildren(child.props.children, predicate, mapper));
        return child;
    });
}

export function mapStyle(props) {
    const { primary, secondary, success, danger, warning, info, light, dark, small, large, ...rest } = props;
    const color = primary ? "primary"
        : secondary ? "secondary"
            : success ? "success"
                : danger ? "danger"
                    : warning ? "warning"
                        : info ? "info"
                            : light ? "light"
                                : dark ? "dark" : null;
    const size = small ? "sm" : large ? "lg" : null;
    return Object.assign({}, { color: color, size: size }, rest);
}