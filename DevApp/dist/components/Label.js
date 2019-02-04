!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react"),require("prop-types"),require("styled-components"),require("prismjs"),require("marked"),require("dotnetify"),require("text-mask-core")):"function"==typeof define&&define.amd?define(["react","prop-types","styled-components","prismjs","marked","dotnetify","text-mask-core"],e):"object"==typeof exports?exports.Label=e(require("react"),require("prop-types"),require("styled-components"),require("prismjs"),require("marked"),require("dotnetify"),require("text-mask-core")):t.Label=e(t.react,t["prop-types"],t["styled-components"],t.prismjs,t.marked,t.dotnetify,t["text-mask-core"])}(window,function(t,e,n,r,o,i,a){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=67)}([function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.flexAuto=e.createEventEmitter=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.deepEqual=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},e.filterChildren=function(t,e){var n=[],r=o.default.Children.map(t,function(t){return t&&t.type&&e(t)?(n.push(t),null):t});return[n,r]},e.ifBoolElse=function(t,e){return"boolean"==typeof t?t:!!e},e.isIE11=s,e.mapChildren=function(t,e,n){var r=this;return o.default.Children.map(t,function(t){if(t)return t.type&&e(t)?n(t):t.props&&t.props.children?o.default.cloneElement(t,t.props,r.mapChildren(t.props.children,e,n)):t})},e.markdown=function(t){return o.default.createElement("div",{dangerouslySetInnerHTML:{__html:(0,i.default)(t,{highlight:function(t,e){var n=e&&"html"!==e?e:"markup";return a.default.languages[n]||(n="markup"),"<span class='prism-code'>"+a.default.highlight(t,a.default.languages[n])+"</span>"}})}})},e.mergeProps=function(t){for(var e=Object.keys(t.type.propTypes||{}),n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];var i=r.reduce(function(t,e){return Object.assign(t,e)},{}),a=Object.keys(i).filter(function(t){return"style"===t||"css"===t||e.includes(t)}).reduce(function(t,e){return Object.assign(t,function(t,e,n){e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n;return t}({},e,i[e]))},{});return Object.assign({},a,t.props)},e.resolveComponents=function(t,e){return Object.keys(t.componentTypes).map(function(n){return e[l(n)]||t.componentTypes[n]})},e.toCamelCase=l,e.toggleNavDrawer=function(t){var e=document.getElementsByTagName("nav");e.length>0&&(!1===t?e[0].classList.remove("open"):e[0].classList.toggle("open"))},e.toPixel=function(t){if(!t)return null;if("string"==typeof t&&t.endsWith("px"))return parseInt(t);var e=window.getComputedStyle(document.body,null)["font-size"];return e.endsWith("px")?parseInt(t)*parseInt(e):parseInt(t)};var o=u(n(0)),i=u(n(12)),a=u(n(11));function u(t){return t&&t.__esModule?t:{default:t}}n(10),n(9),n(8);e.createEventEmitter=function(t){var e=[];return{emit:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];e.forEach(function(t){return t.apply(void 0,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(n))})},subscribe:function(t){return!e.includes(t)&&e.push(t),function(){return e=e.filter(function(e){return e!==t})}}}};e.flexAuto=s()?"1 1 auto":"1";function s(){return window.navigator.userAgent.indexOf("Trident/")>0}function l(t){if("string"==typeof t)return t.substr(0,1).toLowerCase()+t.substr(1);if("object"===(void 0===t?"undefined":r(t))){var e={},n=!0,o=!1,i=void 0;try{for(var a,u=Object.keys(t)[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var s=a.value;e[l(s)]=t[s]}}catch(t){o=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return e}return t}},function(t,e){t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0);(r=i)&&r.__esModule;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.vmContext=e,this.propId=n}return o(t,[{key:"dispatch",value:function(t,e){this.vmContext.dispatchState(a({},this.propId,t),e)}},{key:"dispatchProp",value:function(t,e){void 0!==this.vmContext.getState(t)&&this.vmContext.setState(a({},t,e)),this.vmContext.dispatchState(a({},t,e))}},{key:"vm",get:function(){return this.vmContext.vm}},{key:"vmState",get:function(){return this.vmContext.getState()}},{key:"fullId",get:function(){return this.vmContext.vmId+"."+this.propId}},{key:"attrs",get:function(){return this.vmContext.getPropAttributes(this.propId)}},{key:"value",get:function(){return this.vmContext.getState(this.propId)},set:function(t){this.vmContext.setState(a({},this.propId,t))}}]),t}();e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VMContext=e.ContextTypes=void 0;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=l(n(0)),a=n(1),u=l(n(14)),s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(2));function l(t){return t&&t.__esModule?t:{default:t}}var c=e.ContextTypes={vmContext:a.PropTypes.object,theme:a.PropTypes.object},p=e.VMContext=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.onceHandlers=[],n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.default.Component),o(e,[{key:"componentDidMount",value:function(){this.vmId&&(this.removeOrphan(this.vmId),this.vm=this.connect(this.vmId))}},{key:"componentWillUnmount",value:function(){this.vm.$destroy(),this.onceHandlers=[]}},{key:"connect",value:function(t){var e=this,n=r({setState:function(t){e.setState(t),e.notifyStateChange(t)}},this.props.options);return u.default.react.connect(t,this,n)}},{key:"getChildContext",value:function(){var t=this;return r({},this.context,{vmContext:{vmId:this.vmId,vm:this.vm,getState:function(e){return e?t.state&&t.state.hasOwnProperty(e)?t.state[e]:void 0:t.state},setState:function(e){return t.setState(e)},dispatchState:function(e){return t.vm.$dispatch(e)},getPropAttributes:function(e){return s.toCamelCase(t.state&&t.state[e+"__attr"]||{})},getPropValidations:function(e){return(t.state&&t.state[e+"__validation"]||[]).map(function(t){return s.toCamelCase(t)})},once:function(e,n){return new Promise(function(r){return t.onceHandlers.push({propId:e,handler:function(t){return r(t)},value:n})})}}})}},{key:"notifyStateChange",value:function(t){if(this.onceHandlers.length>0){var e=this.onceHandlers.filter(function(e){return!e.propId||t.hasOwnProperty(e.propId)&&t[e.propId]!==e.value});this.onceHandlers=this.onceHandlers.filter(function(t){return!e.includes(t)}),e.forEach(function(e){return e.handler(t[e.propId])})}this.props.onStateChange&&this.props.onStateChange(t)}},{key:"render",value:function(){var t=this.props,e=t.children,n=t.placeholder;return this.state?e:n||null}},{key:"removeOrphan",value:function(t){u.default.react.getViewModels().filter(function(e){return e.$vmId===t}).forEach(function(t){return t.$destroy()})}},{key:"vmId",get:function(){return this.context&&this.context.vmContext?this.context.vmContext.vmId+"."+this.props.vm:this.props.vm}}]),e}();p.contextTypes=c,p.childContextTypes=c,p.propTypes={vm:a.PropTypes.string,options:a.PropTypes.object,onStateChange:a.PropTypes.func}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=(i(n(0)),i(n(4)));function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.handleValidated=null,r.validations=r.vmContext.getPropValidations(n)||[],r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),r(e,[{key:"addValidation",value:function(t){var e;(e=this.validations).push.apply(e,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(t))}},{key:"clear",value:function(){this.handleValidated&&this.handleValidated({valid:!0,messages:[]})}},{key:"getValidator",value:function(t){if("function"==typeof t.validate)return t.validate;var e="validate"+t.type,n=Object.getPrototypeOf(this);return n.hasOwnProperty(e)?n[e].bind(this,t):function(){return!0}}},{key:"onValidated",value:function(t){"function"==typeof t&&(this.handleValidated=t)}},{key:"validate",value:function(t){var e=this;return new Promise(function(n){t=void 0===t?e.value||null:t,Promise.all(e.validations.map(function(n){return e.runValidator(n,t)})).then(function(t){var r=t.map(function(t){return!1===t.isValid?t.message:null}).filter(function(t){return t}),o={inputId:e.propId,valid:0==r.length,messages:r};e.handleValidated&&e.handleValidated(o),n(o)})})}},{key:"runValidator",value:function(t,e){var n=this.getValidator(t)(e);return n instanceof Promise?n:new Promise(function(e){return e({isValid:n,message:t.message})})}},{key:"validatePattern",value:function(t,e){return!e||new RegExp(t.pattern).test(e)}},{key:"validateRange",value:function(t,e){var n=parseFloat(e),r=!("number"==typeof t.min&&n<t.min),o=!("number"==typeof t.max&&n>t.max);return r&&o}},{key:"validateRequired",value:function(t,e){return!(void 0===e||null==e||"string"==typeof e&&0==e.trim().length)}},{key:"validateServer",value:function(t,e){var n=this.propId+"__validation_"+t.id;this.vmContext.setState(a({},n,null));var r=this.vmContext.once(n,null);return this.vmContext.dispatchState(a({},this.propId,e),!0),r.then(function(e){return{isValid:e,message:t.message}})}},{key:"isRequired",get:function(){return this.validations.filter(function(t){return t.type&&"required"===t.type.toLowerCase()}).length>0}}]),e}();e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.InputElement=void 0;var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=p(n(0)),i=n(1),a=n(5),u=n(13),s=p(n(4)),l=p(n(17)),c=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(2));function p(t){return t&&t.__esModule?t:{default:t}}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function h(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var y=function(t){function e(){return f(this,e),d(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return h(e,o.default.Component),r(e,[{key:"componentDidMount",value:function(){this.props.onChange&&this.props.onChange(this.vmProperty.value)}},{key:"componentWillUpdate",value:function(t){t.id&&(this._vmProperty=null)}},{key:"dispatch",value:function(t){return this.vmProperty.dispatch(t)}},{key:"dispatchProp",value:function(t,e){return this.vmProperty.dispatchProp(t,e)}},{key:"resolveComponents",value:function(t){return c.resolveComponents(t,this.props)}},{key:"render",value:function(){return this.props.hidden?null:this.vmProperty.value}},{key:"vm",get:function(){return this.vmProperty.vm}},{key:"vmContext",get:function(){return this.vmProperty.vmContext}},{key:"value",get:function(){return this.vmProperty.value},set:function(t){this.vmProperty.value=t}},{key:"attrs",get:function(){return Object.assign({fullId:this.vmProperty.fullId},this.vmProperty.attrs,this.props)}},{key:"isVMProperty",get:function(){var t=this.context.vmContext&&this.context.vmContext.getState();return!!t&&t.hasOwnProperty(this.props.id)}},{key:"vmProperty",get:function(){return this.isVMProperty?(this._vmProperty=this._vmProperty||new s.default(this.context.vmContext,this.props.id),this._vmProperty):{fullId:this.props.id,value:this.props.value,attrs:this.props.attrs||{}}}}]),e}();y.contextTypes=a.ContextTypes,y.propTypes={id:i.PropTypes.string.isRequired,hidden:i.PropTypes.bool,onChange:i.PropTypes.func},e.default=y,(e.InputElement=function(t){function e(){return f(this,e),d(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return h(e,y),r(e,[{key:"dispatch",value:function(t,e){return this.vmProperty.dispatch(t,e)}},{key:"vmProperty",get:function(){var t=this;if(this.isVMProperty)return this._vmInput=this._vmInput||new l.default(this.context.vmContext,this.props.id),this._vmInput;var e=this.props.value;return{fullId:this.props.id,value:e,attrs:this.props.attrs||{},dispatch:function(e){return t.props.onChange?t.props.onChange(e):null},onValidated:function(e){return t.props.onValidated?t.props.onValidated(e):null},initMask:function(e){return t.props.initMask?t.props.initMask():null}}}},{key:"changed",get:function(){return this._changed},set:function(t){t&&!this._changed&&this.context.formContext&&this.context.formContext.setChanged(t),this._changed=t}}]),e}()).contextTypes=u.FormContextTypes},function(t,e){Prism.languages.json={property:/"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,string:{pattern:/"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,greedy:!0},number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,punctuation:/[{}[\]);,]/,operator:/:/g,boolean:/\b(?:true|false)\b/i,null:/\bnull\b/i},Prism.languages.jsonp=Prism.languages.json},function(t,e){!function(t){var e=t.util.clone(t.languages.javascript);t.languages.jsx=t.languages.extend("markup",e),t.languages.jsx.tag.pattern=/<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i,t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/i,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i,t.languages.insertBefore("inside","attr-name",{spread:{pattern:/\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,inside:{punctuation:/\.{3}|[{}.]/,"attr-value":/\w+/}}},t.languages.jsx.tag),t.languages.insertBefore("inside","attr-value",{script:{pattern:/=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,inside:{"script-punctuation":{pattern:/^=(?={)/,alias:"punctuation"},rest:t.languages.jsx},alias:"language-javascript"}},t.languages.jsx.tag);var n=function(t){return t?"string"==typeof t?t:"string"==typeof t.content?t.content:t.content.map(n).join(""):""},r=function(e){for(var o=[],i=0;i<e.length;i++){var a=e[i],u=!1;if("string"!=typeof a&&("tag"===a.type&&a.content[0]&&"tag"===a.content[0].type?"</"===a.content[0].content[0].content?o.length>0&&o[o.length-1].tagName===n(a.content[0].content[1])&&o.pop():"/>"===a.content[a.content.length-1].content||o.push({tagName:n(a.content[0].content[1]),openedBraces:0}):o.length>0&&"punctuation"===a.type&&"{"===a.content?o[o.length-1].openedBraces++:o.length>0&&o[o.length-1].openedBraces>0&&"punctuation"===a.type&&"}"===a.content?o[o.length-1].openedBraces--:u=!0),(u||"string"==typeof a)&&o.length>0&&0===o[o.length-1].openedBraces){var s=n(a);i<e.length-1&&("string"==typeof e[i+1]||"plain-text"===e[i+1].type)&&(s+=n(e[i+1]),e.splice(i+1,1)),i>0&&("string"==typeof e[i-1]||"plain-text"===e[i-1].type)&&(s=n(e[i-1])+s,e.splice(i-1,1),i--),e[i]=new t.Token("plain-text",s,null,s)}a.content&&"string"!=typeof a.content&&r(a.content)}};t.hooks.add("after-tokenize",function(t){"jsx"!==t.language&&"tsx"!==t.language||r(t.tokens)})}(Prism)},function(t,e){Prism.languages.csharp=Prism.languages.extend("clike",{keyword:/\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,string:[{pattern:/@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,greedy:!0},{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,greedy:!0}],"class-name":[{pattern:/\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,inside:{punctuation:/\./}},{pattern:/(\[)[A-Z]\w*(?:\.\w+)*\b/,lookbehind:!0,inside:{punctuation:/\./}},{pattern:/(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,lookbehind:!0,inside:{punctuation:/\./}},{pattern:/((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,lookbehind:!0,inside:{punctuation:/\./}}],number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i}),Prism.languages.insertBefore("csharp","class-name",{"generic-method":{pattern:/\w+\s*<[^>\r\n]+?>\s*(?=\()/,inside:{function:/^\w+/,"class-name":{pattern:/\b[A-Z]\w*(?:\.\w+)*\b/,inside:{punctuation:/\./}},keyword:Prism.languages.csharp.keyword,punctuation:/[<>(),.:]/}},preprocessor:{pattern:/(^\s*)#.*/m,lookbehind:!0,alias:"property",inside:{directive:{pattern:/(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,lookbehind:!0,alias:"keyword"}}}}),Prism.languages.dotnet=Prism.languages.csharp},function(t,e){t.exports=r},function(t,e){t.exports=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Form=e.FormContextTypes=void 0;var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=l(n(0)),a=n(1),u=l(n(6)),s=n(5);function l(t){return t&&t.__esModule?t:{default:t}}function c(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=e.FormContextTypes=o({formContext:a.PropTypes.object},s.ContextTypes),d=e.Form=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.state={changed:!1,plainText:!!n.props.plainText},n.validators=[],n.inputs=[],n.subForms=[],n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.default.Component),r(e,[{key:"plainText",get:function(){return this.context.formContext?this.context.formContext.plainText:this.props.plainText}},{key:"enteringEditMode",get:function(){var t=this._plainText&&!this.plainText;return this._plainText=this.plainText,t}}]),r(e,[{key:"componentDidMount",value:function(){this.resetForm(),this.context.formContext&&this.context.formContext.subForms.push(this)}},{key:"componentWillUpdate",value:function(t){"boolean"==typeof t.plainText&&t.plainText!==this.state.plainText&&this.setState({plainText:t.plainText})}},{key:"componentDidUpdate",value:function(){this.enteringEditMode&&this.resetForm(),this.preEditState=this.preEditState||this.getPreEditState()}},{key:"changed",value:function(t){this.state.changed||(this.setState({changed:!0}),this.props.onChanged&&this.props.onChanged(t)),this.context.formContext&&!this.context.formContext.changed&&this.context.formContext.setChanged(t)}},{key:"dispatchState",value:function(t,e){!0===e?this.context.vmContext.dispatchState(t):this.setState({changed:!0,data:Object.assign({},this.state.data,t)}),this.changed(t)}},{key:"getChildContext",value:function(){var t=this,e=this.context,n=e.vmContext,r=e.formContext,i=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(e,["vmContext","formContext"]);return r=r||{subForms:this.subForms,changed:this.state.changed,plainText:this.state.plainText,setChanged:function(e){return t.changed(e)},setPlainText:function(e){return t.setState({plainText:e})},submit:function(e){return t.handleSubmit(e)},cancel:function(e){return t.handleCancel()}},o({},i,{formContext:r,vmContext:Object.assign({},n,{dispatchState:function(e,n){return t.dispatchState(e,n)},getValidator:function(e){return t.getValidator(e)},getPropAttributes:function(e){return t.getPropAttributes(n,e)}})})}},{key:"getPreEditState",value:function(){var t=this;return Object.entries(this.vmContextState).filter(function(e){return t.inputs.some(function(t){return t.propId===e[0]})}).reduce(function(t,e){return Object.assign(t,p({},e[0],e[1]))},{})}},{key:"getPropAttributes",value:function(t,e){return Object.assign({plainText:this.plainText},t.getPropAttributes(e))}},{key:"getValidator",value:function(t){var e=new u.default(t.vmContext,t.propId);return this.validators.push(e),this.inputs.push(t),e}},{key:"setInputFocus",value:function(t){var e=this.inputs.filter(function(e){return e.propId===t}).shift();e&&e.dom&&e.dom.focus()}},{key:"handleSubmit",value:function(t){var e=this;return this.subForms.length>0?this.handleSubmitSubForms(t):this.submitOnValidated(t).then(function(t){return t.valid||(e.props.onSubmitError&&e.props.onSubmitError(t),e.setInputFocus(t.failedIds[0])),t}).then(function(t){return t.valid})}},{key:"handleSubmitSubForms",value:function(t){var e=this,n={},r=function(t,e){return Object.assign(n,t?p({},t,e):e)};return Promise.all(this.subForms.map(function(t){return t.submitOnValidated(t.props.id,r)})).then(function(t){return t.reduce(function(t,e){return{failedForms:e.failedIds.length>0?[].concat(c(t.failedForms),[{formId:e.formId,failedIds:e.failedIds}]):t.failedForms,valid:t.valid&&e.valid,messages:[].concat(c(t.messages),c(e.messages))}},{valid:!0,messages:[],failedForms:[]})}).then(function(t){if(!t.valid){e.props.onSubmitError&&e.props.onSubmitError(t);var n=e.subForms.filter(function(e){return e.props.id===t.failedForms[0].formId}).shift();n&&n.setInputFocus(t.failedForms[0].failedIds[0])}return t}).then(function(r){return r.valid&&e.submit(t,n),r.valid})}},{key:"handleCancel",value:function(){this.subForms.forEach(function(t){return t.cancel()}),this.cancel()}},{key:"cancel",value:function(){this.context.vmContext.setState(this.preEditState),this.setState({changed:!1,data:null}),this.validators.forEach(function(t){return t.clear()})}},{key:"render",value:function(){return this.context.formContext?this.props.children:i.default.createElement("form",{style:{width:"inherit"},onSubmit:function(t){return t.preventDefault()}},this.props.children)}},{key:"resetForm",value:function(){this.preEditState=null,this.vmContextState=this.context.vmContext&&this.context.vmContext.getState(),this._plainText=this.plainText,this.setState({changed:!1,data:null})}},{key:"submitOnValidated",value:function(t,e){var n=this,r=this.state.data,o=!!r;return o||this.validators.some(function(t){return t.isRequired})?this.validate().then(function(i){return i.valid&&o&&(e?e(t,r):n.submit(t,r)),i}):Promise.resolve({formId:this.props.id,valid:!0,messages:[],failedIds:[]})}},{key:"submit",value:function(t,e){var n=Object.assign({},this.preEditState,e);this.props.onSubmit&&!1===this.props.onSubmit(n)||this.context.vmContext.dispatchState(t?p({},t,n):e),this.resetForm()}},{key:"validate",value:function(){var t=this;return Promise.all(this.validators.map(function(t){return t.validate()})).then(function(e){return e.reduce(function(e,n){return{formId:t.props.id,valid:e.valid&&n.valid,messages:[].concat(c(e.messages),c(n.messages)),failedIds:n.valid?e.failedIds:[].concat(c(e.failedIds),[n.inputId])}},{valid:!0,messages:[],failedIds:[]})})}}]),e}();d.contextTypes=f,d.childContextTypes=f,d.propTypes={id:a.PropTypes.string,plainText:a.PropTypes.bool,onSubmit:a.PropTypes.func,onSubmitError:a.PropTypes.func,onChanged:a.PropTypes.func}},function(t,e){t.exports=i},function(t,e,n){t.exports=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(2)},,function(t,e){"use strict";function n(t){return t.split(i).map(function(t){return f.test(t)?f:t})}Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(){function t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=t.length;if(t===i||t[0]===y[0]&&1===e)return y.split(i).concat([f]).concat(m.split(i));if(t===O&&P)return y.split(i).concat(["0",O,f]).concat(m.split(i));var o=t[0]===s&&E;o&&(t=t.toString().substr(1));var a=t.lastIndexOf(O),u=-1!==a,h=void 0,v=void 0,g=void 0;if(t.slice(-1*L)===m&&(t=t.slice(0,-1*L)),u&&(P||T)?(h=t.slice(t.slice(0,q)===y?q:0,a),v=n((v=t.slice(a+1,e)).replace(c,i))):h=t.slice(0,q)===y?t.slice(q):t,F&&(void 0===F?"undefined":r(F))===p){var x="."===_?"[.]":""+_,w=(h.match(new RegExp(x,"g"))||[]).length;h=h.slice(0,F+w*R)}return h=h.replace(c,i),V||(h=h.replace(/^0+(0$|[^0])/,"$1")),h=b?function(t,e){return t.replace(/\B(?=(\d{3})+(?!\d))/g,e)}(h,_):h,g=n(h),(u&&P||!0===T)&&(t[a-1]!==O&&g.push(d),g.push(O,d),v&&((void 0===j?"undefined":r(j))===p&&(v=v.slice(0,j)),g=g.concat(v)),!0===T&&t[a-1]===O&&g.push(f)),q>0&&(g=y.split(i).concat(g)),o&&(g.length===q&&g.push(f),g=[l].concat(g)),m.length>0&&(g=g.concat(m.split(i))),g}var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},h=e.prefix,y=void 0===h?o:h,v=e.suffix,m=void 0===v?i:v,g=e.includeThousandsSeparator,b=void 0===g||g,x=e.thousandsSeparatorSymbol,_=void 0===x?a:x,w=e.allowDecimal,P=void 0!==w&&w,k=e.decimalSymbol,O=void 0===k?u:k,C=e.decimalLimit,j=void 0===C?2:C,S=e.requireDecimal,T=void 0!==S&&S,I=e.allowNegative,E=void 0!==I&&I,M=e.allowLeadingZeroes,V=void 0!==M&&M,A=e.integerLimit,F=void 0===A?null:A,q=y&&y.length||0,L=m&&m.length||0,R=_&&_.length||0;return t.instanceOf="createNumberMask",t};var o="$",i="",a=",",u=".",s="-",l=/-/,c=/\D+/g,p="number",f=/\d/,d="[]"}])},function(t,e){t.exports=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=(l(n(0)),l(n(4))),i=l(n(6)),a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(2)),u=n(16),s=l(n(15));function l(t){return t&&t.__esModule?t:{default:t}}var c=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.validator=r.vmContext.getValidator?r.vmContext.getValidator(r):new i.default(t,n),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),r(e,[{key:"addValidation",value:function(t){t=Array.isArray(t)?t:[t],this.validator.addValidation(t)}},{key:"dispatch",value:function(t,e){void 0!==t&&(t="number"==typeof this.value?parseFloat(t):t,this.value=t);var n=void 0!==t?t:this.value;n=this._unmask?this._unmask(n):n,this.validator.validate(n),this.vmContext.dispatchState(function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}({},this.propId,n),e)}},{key:"initMask",value:function(){if(this._inputElement&&this.attrs.mask){var t={9:/[0-9]/,U:/[A-Z]/,A:/[a-zA-Z]/,"*":/[0-9a-zA-Z]/},e=a.toCamelCase(this.attrs.mask),n=e.type,r=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(e,["type"]);if("NumberMask"===n){if(r.includeThousandsSeparator){var o=new RegExp(r.thousandsSeparatorSymbol,"g");this._unmask=function(t){return"string"==typeof t?t.replace(o,""):t}}r=(0,s.default)(r)}else r=r.mask.split("").map(function(e){return t.hasOwnProperty(e)?t[e]:e});this._textMask=(0,u.createTextMaskInputElement)({inputElement:this._inputElement,mask:r}),this._textMask.update(this.value||"")}}},{key:"onValidated",value:function(t){this.validator.onValidated(t)}},{key:"domValue",get:function(){return this._textMask&&this._textMask.update(),this._inputElement.value}},{key:"dom",get:function(){return this._inputElement},set:function(t){this._inputElement=t}},{key:"isRequired",get:function(){return this.validator.isRequired}}]),e}();e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Label=void 0;var r=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=c(n(0)),a=n(1),u=c(n(3)),s=c(n(7)),l=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(2));function c(t){return t&&t.__esModule?t:{default:t}}var p=u.default.div.withConfig({displayName:"Label__LabelContainer"})(["display:flex;align-items:center;flex-direction:",";justify-content:",";width:",";",";",";",";",";"],function(t){return t.right?"row-reverse":"row"},function(t){return t.apart?"space-between":"flex-start"},function(t){return t.apart?"100%":"unset"},function(t){return t.bold&&"font-weight: 500"},function(t){return t.italic&&"font-style: italic"},function(t){return t.theme.Label.Container},function(t){return t.css}),f=u.default.span.withConfig({displayName:"Label__IconContainer"})(["margin:",";",";"],function(t){return t.noMargin?"0":t.right?"0 0 0 .5rem ":"0 .5rem 0 0"},function(t){return t.theme.Label.IconContainer}),d=u.default.i.attrs({className:function(t){return t.className}}).withConfig({displayName:"Label__Icon"})(["","    "],function(t){return t.theme.Label.IconComponent}),h=e.Label=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,s.default),o(e,[{key:"render",value:function(){var t=l.resolveComponents(e,this.props),n=r(t,3),o=n[0],a=n[1],u=n[2],s=this.attrs,c=s.right,p=s.apart,f=s.icon,d=s.rightIcon,h=s.bold,y=s.italic,v=s.style,m=s.css,g=s.children,b="string"==typeof f?i.default.createElement(u,{name:f}):f,x="string"==typeof d?i.default.createElement(u,{name:d}):d,_=!(!this.value&&!g);return i.default.createElement(o,{right:c,apart:p,bold:h,italic:y,style:v,css:m},b&&i.default.createElement(a,{right:c,noMargin:!_},b),this.value,g,x&&i.default.createElement(a,{right:!c},x))}}]),e}();h.propTypes={id:a.PropTypes.string,apart:a.PropTypes.bool,bold:a.PropTypes.bool,icon:a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.object]),italic:a.PropTypes.bool,right:a.PropTypes.bool,rightIcon:a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.object])},h.componentTypes={LabelContainer:p,IconContainer:f,IconComponent:function(t){var e=t.name,n="";if(t.name.startsWith("material-icons")){var r=t.name.split(" ");e=r[0],n=r[1]}return i.default.createElement(d,{className:e},n)}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Label=void 0;var r=n(18);e.Label=r.Label}])});