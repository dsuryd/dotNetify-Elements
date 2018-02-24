import React from 'react';
import VMInput from './VMInput';
import VMProperty from './VMProperty';
import marked from 'marked';
import sanitize from 'sanitize-html';

export function getVMInput(component) {
    const isVMProp = component.context.vmContext && component.context.vmContext.getStates().hasOwnProperty(component.props.id);
    return isVMProp ? component._vmInput || (component._vmInput = new VMInput(component.context.vmContext, component.props.id)) :
        {
            props: { id: component.props.id, value: component.props.value, attrs: {} },
            dispatch: value => component.props.onChange ? component.props.onChange(value) : null
        };
}

export function getVMProperty(component) {
    return component._vmProperty || (component._vmProperty = new VMProperty(component.context.vmContext, component.props.id));
}

export function mapChildren(children, predicate, mapper) {
    return React.Children.map(children, child => {
        if (child.type && predicate(child))
            return mapper(child);
        else if (child.props && child.props.children)
            return React.cloneElement(child, child.props, this.mapChildren(child.props.children, predicate, mapper));
        return child;
    });
}

export function filterChildren(children, predicate) {
    let result = [];
    const rest = React.Children.map(children, child => {
        if (child.type && predicate(child)) {
            result.push(child);
            return null;
        }
        else return child;
    });
    return [result, rest];
}

export function markdown(text) {
    return <div dangerouslySetInnerHTML={{ __html: sanitize(marked(text)) }} />;
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

export function mergeProps(elem, ...newProps) {
    const propTypes = Object.keys(elem.type.propTypes || {});
    let props = newProps.reduce((aggregate, prop) => Object.assign(aggregate, prop), {});
    let validProps = Object.keys(props)
        .filter(key => propTypes.includes(key))
        .reduce((aggregate, key) => Object.assign(aggregate, { [key]: props[key] }), {});
    return Object.assign({}, validProps, elem.props);
}

export function resolveComponents(type, props) {
    return Object.keys(type.componentTypes).map(key => props[toCamelCase(key)] || type.componentTypes[key]);
}

export function toCamelCase(obj) {
    if (typeof obj == "string")
        return obj.substr(0, 1).toLowerCase() + obj.substr(1);
    else if (typeof obj === "object") {
        let newObj = {};
        for (let key of Object.keys(obj))
            newObj[toCamelCase(key)] = obj[key];
        return newObj;
    }
    return obj;
}

export function toPixel(unit) {
    if (typeof unit == "string" && unit.endsWith("px"))
        return parseInt(unit);
    // Assume unit is rem.
    const fontSize = window.getComputedStyle(document.body, null)["font-size"];
    return fontSize.endsWith("px") ? parseInt(unit) * parseInt(fontSize) : parseInt(unit);
}