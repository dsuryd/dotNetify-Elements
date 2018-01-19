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
    const { color, size, primary, secondary, success, danger, warning, info, light, dark, small, large, ...rest } = props;
    const _color = primary ? "primary"
        : secondary ? "secondary"
            : success ? "success"
                : danger ? "danger"
                    : warning ? "warning"
                        : info ? "info"
                            : light ? "light"
                                : dark ? "dark" : color;
    const _size = small ? "sm" : large ? "lg" : size;
    return Object.assign({}, { color: _color, size: _size }, rest);
}

export function resolveComponents(type, props) {
    return Object.keys(type.componentTypes).map(key => props[toCamelCase(key)] || type.componentTypes[key]);
}

function toCamelCase(key) {
    return key.substr(0, 1).toLowerCase() + key.substr(1);
}