import React from 'react';
import marked from 'marked';
import sanitize from 'sanitize-html';

export const createEventEmitter = _ => {
   let subscribers = []
   return {
      emit(...args) {
         subscribers.forEach(subscriber => subscriber(...args));
      },

      subscribe(subscriber) {
         !subscribers.includes(subscriber) && subscribers.push(subscriber);
         return () => subscribers = subscribers.filter(x => x !== subscriber);
      }
   }
}

export function bool(arg1, arg2) {
   return typeof arg1 == "boolean" ? arg1 : !!arg2;
}

export function mapChildren(children, predicate, mapper) {
    return React.Children.map(children, child => {
        if (!child) return;
        
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