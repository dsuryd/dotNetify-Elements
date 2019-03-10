export default class WebComponentHelper {
   constructor(host) {
      this.host = host;
   }

   convertAttributeToProp(componentPropTypes, attrName, attrValue) {
      const propName = Object.keys(componentPropTypes).find(key => key.toLowerCase() == attrName);

      // Convert attribute value type, which is always string, to the expected property type.
      let value = attrValue;
      if (attrValue === 'true' || attrValue === 'false') value = attrValue == 'true';
      else if (!isNaN(attrValue) && attrValue !== '') value = +attrValue;
      else if (/{.*}/.exec(attrValue)) value = JSON.parse(attrValue);
      else if (/([A-z0-9$_]*)\(.*\)/.exec(attrValue)) value = parseFunctionString(attrValue);

      return {
         name: propName ? propName : attrName,
         value: value
      };
   }

   getProps(attributes, componentPropTypes) {
      componentPropTypes = componentPropTypes || {};
      return [ ...attributes ]
         .map(attr => this.convertAttributeToProp(componentPropTypes, attr.name, attr.value))
         .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
   }

   getEvents(componentPropTypes) {
      // Look for attributes with camel-case names that start with 'on'.
      return Object.keys(componentPropTypes).filter(key => /on([A-Z].*)/.exec(key)).reduce(
         (events, e) => ({
            ...events,
            [e]: args => {
               if (typeof this[e] == 'function') this[e](args);
               this.host.dispatchEvent(new CustomEvent(e, { ...args }));
            }
         }),
         {}
      );
   }

   parseFunctionString(funcString) {
      if (!funcString) return null;
      return args => {
         // Parse the function name from the attribute value.
         const match = /([A-z0-9$_]*)\(?\)?/.exec(funcString);
         const fnName = match ? match[1] : funcString;
         if (typeof window[fnName] === 'function') window[fnName](args);
         else eval(funcString.replace('$event', `'${JSON.stringify(args)}'`));
      };
   }
}
