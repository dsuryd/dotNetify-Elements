export default class WebComponentHelper {
   constructor(host) {
      this.host = host;
      this.host.__eventHandlers = {};
   }

   convertAttributeToProp(componentPropTypes, attrName, attrValue) {
      const propName = Object.keys(componentPropTypes).find(key => key.toLowerCase() == attrName);

      // Convert attribute value type, which is always string, to the expected property type.
      let value = attrValue;
      if (attrValue === 'true' || attrValue === 'false') value = attrValue == 'true';
      else if (!isNaN(attrValue) && attrValue !== '') value = +attrValue;
      else if (/^{.*}/.exec(attrValue)) value = JSON.parse(attrValue);
      else if (/([A-z0-9$_]*)\(.*\)/.exec(attrValue)) value = this.parseFunctionString(attrValue);

      if (typeof value == 'function') this.host.__eventHandlers[attrName] = value;

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
               const eventName = e.toLowerCase();
               const eventHandler = this.host.__eventHandlers[eventName];
               let result = typeof eventHandler == 'function' ? eventHandler(args) : null;

               this.host.dispatchEvent(new CustomEvent(e, { ...args }));
               return result;
            }
         }),
         {}
      );
   }

   parseFunctionString(funcString) {
      return WebComponentHelper._parseFunctionString(funcString);
   }

   static _parseFunctionString(funcString) {
      if (!funcString) return null;
      return args => {
         // Parse the function name from the attribute value.
         const match = /([A-z0-9$_]*)\(?\)?/.exec(funcString);
         const fnName = match ? match[1] : funcString;
         if (fnName !== 'function' && typeof window[fnName] === 'function') return window[fnName](args);
         else return eval(`(${funcString})`)(args);
      };
   }
}
