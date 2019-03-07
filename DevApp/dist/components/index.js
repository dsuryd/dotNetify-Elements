!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("React"),require("dotnetify")):"function"==typeof define&&define.amd?define(["React","dotnetify"],e):"object"==typeof exports?exports.index=e(require("React"),require("dotnetify")):t.index=e(t.React,t.dotnetify)}(window,function(t,e){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=223)}({0:function(e,n){e.exports=t},1:function(t,e,n){t.exports=n(11)()},10:function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},11:function(t,e,n){"use strict";var r=n(9),o=n(8),i=n(10);t.exports=function(){function t(t,e,n,r,a,u){u!==i&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e};return n.checkPropTypes=r,n.PropTypes=n,n}},12:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Form=e.FormContextTypes=void 0;var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=l(n(0)),a=n(1),u=l(n(6)),s=n(5);function l(t){return t&&t.__esModule?t:{default:t}}function c(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p=e.FormContextTypes=o({formContext:a.PropTypes.object},s.ContextTypes),d=e.Form=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.state={changed:!1,plainText:!!n.props.plainText},n.validators=[],n.inputs=[],n.subForms=[],n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.default.Component),r(e,[{key:"plainText",get:function(){return this.context.formContext?this.context.formContext.plainText:this.props.plainText}},{key:"enteringEditMode",get:function(){var t=this._plainText&&!this.plainText;return this._plainText=this.plainText,t}}]),r(e,[{key:"componentDidMount",value:function(){this.resetForm(),this.context.formContext&&this.context.formContext.subForms.push(this)}},{key:"componentWillUpdate",value:function(t){"boolean"==typeof t.plainText&&t.plainText!==this.state.plainText&&this.setState({plainText:t.plainText})}},{key:"componentDidUpdate",value:function(){this.enteringEditMode&&this.resetForm(),this.preEditState=this.preEditState||this.getPreEditState()}},{key:"changed",value:function(t){this.state.changed||(this.setState({changed:!0}),this.props.onChanged&&this.props.onChanged(t)),this.context.formContext&&!this.context.formContext.changed&&this.context.formContext.setChanged(t)}},{key:"dispatchState",value:function(t,e){!0===e?this.context.vmContext.dispatchState(t):this.setState({changed:!0,data:Object.assign({},this.state.data,t)}),this.changed(t)}},{key:"getChildContext",value:function(){var t=this,e=this.context,n=e.vmContext,r=e.formContext,i=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(e,["vmContext","formContext"]);return r=r||{subForms:this.subForms,changed:this.state.changed,plainText:this.state.plainText,setChanged:function(e){return t.changed(e)},setPlainText:function(e){return t.setState({plainText:e})},submit:function(e){return t.handleSubmit(e)},cancel:function(e){return t.handleCancel()}},o({},i,{formContext:r,vmContext:Object.assign({},n,{dispatchState:function(e,n){return t.dispatchState(e,n)},getValidator:function(e){return t.getValidator(e)},getPropAttributes:function(e){return t.getPropAttributes(n,e)}})})}},{key:"getPreEditState",value:function(){var t=this;return Object.entries(this.vmContextState).filter(function(e){return t.inputs.some(function(t){return t.propId===e[0]})}).reduce(function(t,e){return Object.assign(t,f({},e[0],e[1]))},{})}},{key:"getPropAttributes",value:function(t,e){return Object.assign({plainText:this.plainText},t.getPropAttributes(e))}},{key:"getValidator",value:function(t){var e=new u.default(t.vmContext,t.propId);return this.validators.push(e),this.inputs.push(t),e}},{key:"setInputFocus",value:function(t){var e=this.inputs.filter(function(e){return e.propId===t}).shift();e&&e.dom&&e.dom.focus()}},{key:"handleSubmit",value:function(t){var e=this;return this.subForms.length>0?this.handleSubmitSubForms(t):this.submitOnValidated(t).then(function(t){return t.valid||(e.props.onSubmitError&&e.props.onSubmitError(t),e.setInputFocus(t.failedIds[0])),t}).then(function(t){return t.valid})}},{key:"handleSubmitSubForms",value:function(t){var e=this,n={},r=function(t,e){return Object.assign(n,t?f({},t,e):e)};return Promise.all(this.subForms.map(function(t){return t.submitOnValidated(t.props.id,r)})).then(function(t){return t.reduce(function(t,e){return{failedForms:e.failedIds.length>0?[].concat(c(t.failedForms),[{formId:e.formId,failedIds:e.failedIds}]):t.failedForms,valid:t.valid&&e.valid,messages:[].concat(c(t.messages),c(e.messages))}},{valid:!0,messages:[],failedForms:[]})}).then(function(t){if(!t.valid){e.props.onSubmitError&&e.props.onSubmitError(t);var n=e.subForms.filter(function(e){return e.props.id===t.failedForms[0].formId}).shift();n&&n.setInputFocus(t.failedForms[0].failedIds[0])}return t}).then(function(r){return r.valid&&e.submit(t,n),r.valid})}},{key:"handleCancel",value:function(){this.subForms.forEach(function(t){return t.cancel()}),this.cancel()}},{key:"cancel",value:function(){this.context.vmContext.setState(this.preEditState),this.setState({changed:!1,data:null}),this.validators.forEach(function(t){return t.clear()})}},{key:"render",value:function(){return this.context.formContext?this.props.children:i.default.createElement("form",{style:{width:"inherit"},onSubmit:function(t){return t.preventDefault()}},this.props.children)}},{key:"resetForm",value:function(){this.preEditState=null,this.vmContextState=this.context.vmContext&&this.context.vmContext.getState(),this._plainText=this.plainText,this.setState({changed:!1,data:null})}},{key:"submitOnValidated",value:function(t,e){var n=this,r=this.state.data,o=!!r;return o||this.validators.some(function(t){return t.isRequired})?this.validate().then(function(i){return i.valid&&o&&(e?e(t,r):n.submit(t,r)),i}):Promise.resolve({formId:this.props.id,valid:!0,messages:[],failedIds:[]})}},{key:"submit",value:function(t,e){var n=Object.assign({},this.preEditState,e);this.props.onSubmit&&!1===this.props.onSubmit(n)||this.context.vmContext.dispatchState(t?f({},t,n):e),this.resetForm()}},{key:"validate",value:function(){var t=this;return Promise.all(this.validators.map(function(t){return t.validate()})).then(function(e){return e.reduce(function(e,n){return{formId:t.props.id,valid:e.valid&&n.valid,messages:[].concat(c(e.messages),c(n.messages)),failedIds:n.valid?e.failedIds:[].concat(c(e.failedIds),[n.inputId])}},{valid:!0,messages:[],failedIds:[]})})}}]),e}();d.contextTypes=p,d.childContextTypes=p,d.propTypes={id:a.PropTypes.string,plainText:a.PropTypes.bool,onSubmit:a.PropTypes.func,onSubmitError:a.PropTypes.func,onChanged:a.PropTypes.func}},13:function(t,n){t.exports=e},14:function(t,e,n){t.exports=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(2)},,function(t,e){"use strict";function n(t){return t.split(i).map(function(t){return p.test(t)?p:t})}Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(){function t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=t.length;if(t===i||t[0]===v[0]&&1===e)return v.split(i).concat([p]).concat(m.split(i));if(t===k&&O)return v.split(i).concat(["0",k,p]).concat(m.split(i));var o=t[0]===s&&M;o&&(t=t.toString().substr(1));var a=t.lastIndexOf(k),u=-1!==a,h=void 0,y=void 0,b=void 0;if(t.slice(-1*N)===m&&(t=t.slice(0,-1*N)),u&&(O||j)?(h=t.slice(t.slice(0,R)===v?R:0,a),y=n((y=t.slice(a+1,e)).replace(c,i))):h=t.slice(0,R)===v?t.slice(R):t,F&&(void 0===F?"undefined":r(F))===f){var x="."===C?"[.]":""+C,P=(h.match(new RegExp(x,"g"))||[]).length;h=h.slice(0,F+P*q)}return h=h.replace(c,i),V||(h=h.replace(/^0+(0$|[^0])/,"$1")),h=g?function(t,e){return t.replace(/\B(?=(\d{3})+(?!\d))/g,e)}(h,C):h,b=n(h),(u&&O||!0===j)&&(t[a-1]!==k&&b.push(d),b.push(k,d),y&&((void 0===S?"undefined":r(S))===f&&(y=y.slice(0,S)),b=b.concat(y)),!0===j&&t[a-1]===k&&b.push(p)),R>0&&(b=v.split(i).concat(b)),o&&(b.length===R&&b.push(p),b=[l].concat(b)),m.length>0&&(b=b.concat(m.split(i))),b}var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},h=e.prefix,v=void 0===h?o:h,y=e.suffix,m=void 0===y?i:y,b=e.includeThousandsSeparator,g=void 0===b||b,x=e.thousandsSeparatorSymbol,C=void 0===x?a:x,P=e.allowDecimal,O=void 0!==P&&P,_=e.decimalSymbol,k=void 0===_?u:_,T=e.decimalLimit,S=void 0===T?2:T,w=e.requireDecimal,j=void 0!==w&&w,E=e.allowNegative,M=void 0!==E&&E,I=e.allowLeadingZeroes,V=void 0!==I&&I,A=e.integerLimit,F=void 0===A?null:A,R=v&&v.length||0,N=m&&m.length||0,q=C&&C.length||0;return t.instanceOf="createNumberMask",t};var o="$",i="",a=",",u=".",s="-",l=/-/,c=/\D+/g,f="number",p=/\d/,d="[]"}])},15:function(t,e,n){t.exports=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(3);Object.defineProperty(e,"conformToMask",{enumerable:!0,get:function(){return r(o).default}});var i=n(2);Object.defineProperty(e,"adjustCaretPosition",{enumerable:!0,get:function(){return r(i).default}});var a=n(5);Object.defineProperty(e,"createTextMaskInputElement",{enumerable:!0,get:function(){return r(a).default}})},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.placeholderChar="_",e.strFunction="function"},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=t.previousConformedValue,o=void 0===e?r:e,i=t.previousPlaceholder,a=void 0===i?r:i,u=t.currentCaretPosition,s=void 0===u?0:u,l=t.conformedValue,c=t.rawValue,f=t.placeholderChar,p=t.placeholder,d=t.indexesOfPipedChars,h=void 0===d?n:d,v=t.caretTrapIndexes,y=void 0===v?n:v;if(0===s||!c.length)return 0;var m=c.length,b=o.length,g=p.length,x=l.length,C=m-b,P=C>0;if(C>1&&!P&&0!==b)return s;var O=0,_=void 0,k=void 0;if(!P||o!==l&&l!==p){var T=l.toLowerCase(),S=c.toLowerCase(),w=S.substr(0,s).split(r),j=w.filter(function(t){return-1!==T.indexOf(t)});k=j[j.length-1];var E=a.substr(0,j.length).split(r).filter(function(t){return t!==f}).length,M=p.substr(0,j.length).split(r).filter(function(t){return t!==f}).length,I=M!==E,V=void 0!==a[j.length-1]&&void 0!==p[j.length-2]&&a[j.length-1]!==f&&a[j.length-1]!==p[j.length-1]&&a[j.length-1]===p[j.length-2];!P&&(I||V)&&E>0&&p.indexOf(k)>-1&&void 0!==c[s]&&(_=!0,k=c[s]);for(var A=h.map(function(t){return T[t]}),F=A.filter(function(t){return t===k}).length,R=j.filter(function(t){return t===k}).length,N=p.substr(0,p.indexOf(f)).split(r).filter(function(t,e){return t===k&&c[e]!==t}).length,q=N+R+F+(_?1:0),D=0,L=0;L<x;L++){var W=T[L];if(O=L+1,W===k&&D++,D>=q)break}}else O=s-C;if(P){for(var H=O,U=O;U<=g;U++)if(p[U]===f&&(H=U),p[U]===f||-1!==y.indexOf(U)||U===g)return H}else if(_){for(var $=O-1;$>=0;$--)if(l[$]===k||-1!==y.indexOf($)||0===$)return $}else for(var J=O;J>=0;J--)if(p[J-1]===f||-1!==y.indexOf(J)||0===J)return J};var n=[],r=""},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,o.isArray)(e)){if((void 0===e?"undefined":r(e))!==i.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");e=e(t,n),e=(0,o.processCaretTraps)(e).maskWithoutCaretTraps}var s=n.guide,l=void 0===s||s,c=n.previousConformedValue,f=void 0===c?u:c,p=n.placeholderChar,d=void 0===p?i.placeholderChar:p,h=n.placeholder,v=void 0===h?(0,o.convertMaskToPlaceholder)(e,d):h,y=n.currentCaretPosition,m=n.keepCharPositions,b=!1===l&&void 0!==f,g=t.length,x=f.length,C=v.length,P=e.length,O=g-x,_=O>0,k=y+(_?-O:0),T=k+Math.abs(O);if(!0===m&&!_){for(var S=u,w=k;w<T;w++)v[w]===d&&(S+=d);t=t.slice(0,k)+S+t.slice(k,g)}for(var j=t.split(u).map(function(t,e){return{char:t,isNew:e>=k&&e<T}}),E=g-1;E>=0;E--){var M=j[E].char;if(M!==d){var I=E>=k&&x===P;M===v[I?E-O:E]&&j.splice(E,1)}}var V=u,A=!1;t:for(var F=0;F<C;F++){var R=v[F];if(R===d){if(j.length>0)for(;j.length>0;){var N=j.shift(),q=N.char,D=N.isNew;if(q===d&&!0!==b){V+=d;continue t}if(e[F].test(q)){if(!0===m&&!1!==D&&f!==u&&!1!==l&&_){for(var L=j.length,W=null,H=0;H<L;H++){var U=j[H];if(U.char!==d&&!1===U.isNew)break;if(U.char===d){W=H;break}}null!==W?(V+=q,j.splice(W,1)):F--}else V+=q;continue t}A=!0}!1===b&&(V+=v.substr(F,C));break}V+=R}if(b&&!1===_){for(var $=null,J=0;J<V.length;J++)v[J]===d&&($=J);V=null!==$?V.substr(0,$+1):u}return{conformedValue:V,meta:{someCharsRejected:A}}};var o=n(4),i=n(1),a=[],u=""},function(t,e,n){"use strict";function r(t){return Array.isArray&&Array.isArray(t)||t instanceof Array}Object.defineProperty(e,"__esModule",{value:!0}),e.convertMaskToPlaceholder=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.placeholderChar;if(!r(t))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(-1!==t.indexOf(e))throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\nThe placeholder character that was received is: "+JSON.stringify(e)+"\n\nThe mask that was received is: "+JSON.stringify(t));return t.map(function(t){return t instanceof RegExp?e:t}).join("")},e.isArray=r,e.isString=function(t){return"string"==typeof t||t instanceof String},e.isNumber=function(t){return"number"==typeof t&&void 0===t.length&&!isNaN(t)},e.processCaretTraps=function(t){for(var e=[],n=void 0;-1!==(n=t.indexOf(a));)e.push(n),t.splice(n,1);return{maskWithoutCaretTraps:t,indexes:e}};var o=n(1),i=[],a="[]"},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){document.activeElement===t&&(y?m(function(){return t.setSelectionRange(e,e,h)},0):t.setSelectionRange(e,e,h))}Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(t){var e={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:e,update:function(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,u=r.inputElement,l=r.mask,h=r.guide,y=r.pipe,m=r.placeholderChar,b=void 0===m?p.placeholderChar:m,g=r.keepCharPositions,x=void 0!==g&&g,C=r.showMask,P=void 0!==C&&C;if(void 0===n&&(n=u.value),n!==e.previousConformedValue){(void 0===l?"undefined":a(l))===v&&void 0!==l.pipe&&void 0!==l.mask&&(y=l.pipe,l=l.mask);var O=void 0,_=void 0;if(l instanceof Array&&(O=(0,f.convertMaskToPlaceholder)(l,b)),!1!==l){var k=function(t){if((0,f.isString)(t))return t;if((0,f.isNumber)(t))return String(t);if(void 0===t||null===t)return d;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(t))}(n),T=u.selectionEnd,S=e.previousConformedValue,w=e.previousPlaceholder,j=void 0;if((void 0===l?"undefined":a(l))===p.strFunction){if(!1===(_=l(k,{currentCaretPosition:T,previousConformedValue:S,placeholderChar:b})))return;var E=(0,f.processCaretTraps)(_),M=E.maskWithoutCaretTraps,I=E.indexes;_=M,j=I,O=(0,f.convertMaskToPlaceholder)(_,b)}else _=l;var V={previousConformedValue:S,guide:h,placeholderChar:b,pipe:y,placeholder:O,currentCaretPosition:T,keepCharPositions:x},A=(0,c.default)(k,_,V),F=A.conformedValue,R=(void 0===y?"undefined":a(y))===p.strFunction,N={};R&&(!1===(N=y(F,i({rawValue:k},V)))?N={value:S,rejected:!0}:(0,f.isString)(N)&&(N={value:N}));var q=R?N.value:F,D=(0,s.default)({previousConformedValue:S,previousPlaceholder:w,conformedValue:q,placeholder:O,rawValue:k,currentCaretPosition:T,placeholderChar:b,indexesOfPipedChars:N.indexesOfPipedChars,caretTrapIndexes:j}),L=q===O&&0===D,W=P?O:d,H=L?W:q;e.previousConformedValue=H,e.previousPlaceholder=O,u.value!==H&&(u.value=H,o(u,D))}}}}};var u=n(2),s=r(u),l=n(3),c=r(l),f=n(4),p=n(1),d="",h="none",v="object",y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),m="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])},16:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=(l(n(0)),l(n(4))),i=l(n(6)),a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(2)),u=n(15),s=l(n(14));function l(t){return t&&t.__esModule?t:{default:t}}var c=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.validator=r.vmContext.getValidator?r.vmContext.getValidator(r):new i.default(t,n),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),r(e,[{key:"addValidation",value:function(t){t=Array.isArray(t)?t:[t],this.validator.addValidation(t)}},{key:"dispatch",value:function(t,e){void 0!==t&&(t="number"==typeof this.value?parseFloat(t):t,this.value=t);var n=void 0!==t?t:this.value;n=this._unmask?this._unmask(n):n,this.validator.validate(n),this.vmContext.dispatchState(function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}({},this.propId,n),e)}},{key:"initMask",value:function(){if(this._inputElement&&this.attrs.mask){var t={9:/[0-9]/,U:/[A-Z]/,A:/[a-zA-Z]/,"*":/[0-9a-zA-Z]/},e=a.toCamelCase(this.attrs.mask),n=e.type,r=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(e,["type"]);if("NumberMask"===n){if(r.includeThousandsSeparator){var o=new RegExp(r.thousandsSeparatorSymbol,"g");this._unmask=function(t){return"string"==typeof t?t.replace(o,""):t}}r=(0,s.default)(r)}else r=r.mask.split("").map(function(e){return t.hasOwnProperty(e)?t[e]:e});this._textMask=(0,u.createTextMaskInputElement)({inputElement:this._inputElement,mask:r}),this._textMask.update(this.value||"")}}},{key:"onValidated",value:function(t){this.validator.onValidated(t)}},{key:"domValue",get:function(){return this._textMask&&this._textMask.update(),this._inputElement.value}},{key:"dom",get:function(){return this._inputElement},set:function(t){this._inputElement=t}},{key:"isRequired",get:function(){return this.validator.isRequired}}]),e}();e.default=c},2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.flexAuto=e.createEventEmitter=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.deepEqual=function(t,e){return JSON.stringify(t)===JSON.stringify(e)},e.filterChildren=function(t,e){var n=[],r=a.default.Children.map(t,function(t){return t&&t.type&&e(t)?(n.push(t),null):t});return[n,r]},e.ifBoolElse=function(t,e){return"boolean"==typeof t?t:!!e},e.isIE11=u,e.mapChildren=function(t,e,n){var r=this;return a.default.Children.map(t,function(t){if(t)return t.type&&e(t)?n(t):t.props&&t.props.children?a.default.cloneElement(t,t.props,r.mapChildren(t.props.children,e,n)):t})},e.mergeProps=function(t){for(var e=Object.keys(t.type.propTypes||{}),n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];var i=r.reduce(function(t,e){return Object.assign(t,e)},{}),a=Object.keys(i).filter(function(t){return"style"===t||"css"===t||e.includes(t)}).reduce(function(t,e){return Object.assign(t,function(t,e,n){e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n;return t}({},e,i[e]))},{});return Object.assign({},a,t.props)},e.resolveComponents=function(t,e){return Object.keys(t.componentTypes).map(function(n){return e[s(n)]||t.componentTypes[n]})},e.toCamelCase=s,e.toggleNavDrawer=function(t){var e=document.getElementsByTagName("nav");e.length>0&&(!1===t?e[0].classList.remove("open"):e[0].classList.toggle("open"))},e.toPixel=function(t){if(!t)return null;if("string"==typeof t&&t.endsWith("px"))return parseInt(t);var e=window.getComputedStyle(document.body,null)["font-size"];return e.endsWith("px")?parseInt(t)*parseInt(e):parseInt(t)};var o,i=n(0),a=(o=i)&&o.__esModule?o:{default:o};e.createEventEmitter=function(t){var e=[];return{emit:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];e.forEach(function(t){return t.apply(void 0,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(n))})},subscribe:function(t){return!e.includes(t)&&e.push(t),function(){return e=e.filter(function(e){return e!==t})}}}};e.flexAuto=u()?"1 1 auto":"1";function u(){return window.navigator.userAgent.indexOf("Trident/")>0}function s(t){if("string"==typeof t)return t.substr(0,1).toLowerCase()+t.substr(1);if("object"===(void 0===t?"undefined":r(t))){var e={},n=!0,o=!1,i=void 0;try{for(var a,u=Object.keys(t)[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var l=a.value;e[s(l)]=t[l]}}catch(t){o=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return e}return t}},222:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VMContext=e.Element=e.ContextTypes=void 0;var r,o=n(7),i=(r=o)&&r.__esModule?r:{default:r},a=n(5);e.ContextTypes=a.ContextTypes,e.Element=i.default,e.VMContext=a.VMContext},223:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ContextTypes=e.VMContext=e.Element=void 0;var r=n(222);e.Element=r.Element,e.VMContext=r.VMContext,e.ContextTypes=r.ContextTypes},4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0);(r=i)&&r.__esModule;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.vmContext=e,this.propId=n}return o(t,[{key:"dispatch",value:function(t,e){this.vmContext.dispatchState(a({},this.propId,t),e)}},{key:"dispatchProp",value:function(t,e){void 0!==this.vmContext.getState(t)&&this.vmContext.setState(a({},t,e)),this.vmContext.dispatchState(a({},t,e))}},{key:"vm",get:function(){return this.vmContext.vm}},{key:"vmState",get:function(){return this.vmContext.getState()}},{key:"fullId",get:function(){return this.vmContext.vmId+"."+this.propId}},{key:"attrs",get:function(){return this.vmContext.getPropAttributes(this.propId)}},{key:"value",get:function(){return this.vmContext.getState(this.propId)},set:function(t){this.vmContext.setState(a({},this.propId,t))}}]),t}();e.default=u},5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VMContext=e.ContextTypes=void 0;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=l(n(0)),a=n(1),u=l(n(13)),s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(2));function l(t){return t&&t.__esModule?t:{default:t}}var c=e.ContextTypes={vmContext:a.PropTypes.object,theme:a.PropTypes.object},f=e.VMContext=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.onceHandlers=[],n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.default.Component),o(e,[{key:"componentDidMount",value:function(){this.vmId&&(this.removeOrphan(this.vmId),this.vm=this.connect(this.vmId))}},{key:"componentWillUnmount",value:function(){this.vm.$destroy(),this.onceHandlers=[]}},{key:"connect",value:function(t){var e=this,n=r({setState:function(t){e.setState(t),e.notifyStateChange(t)}},this.props.options);return u.default.react.connect(t,this,n)}},{key:"getChildContext",value:function(){var t=this;return r({},this.context,{vmContext:{vmId:this.vmId,vm:this.vm,getState:function(e){return e?t.state&&t.state.hasOwnProperty(e)?t.state[e]:void 0:t.state},setState:function(e){return t.setState(e)},dispatchState:function(e){return t.vm.$dispatch(e)},getPropAttributes:function(e){return s.toCamelCase(t.state&&t.state[e+"__attr"]||{})},getPropValidations:function(e){return(t.state&&t.state[e+"__validation"]||[]).map(function(t){return s.toCamelCase(t)})},once:function(e,n){return new Promise(function(r){return t.onceHandlers.push({propId:e,handler:function(t){return r(t)},value:n})})}}})}},{key:"notifyStateChange",value:function(t){if(this.onceHandlers.length>0){var e=this.onceHandlers.filter(function(e){return!e.propId||t.hasOwnProperty(e.propId)&&t[e.propId]!==e.value});this.onceHandlers=this.onceHandlers.filter(function(t){return!e.includes(t)}),e.forEach(function(e){return e.handler(t[e.propId])})}this.props.onStateChange&&this.props.onStateChange(t)}},{key:"render",value:function(){var t=this.props,e=t.children,n=t.placeholder;return this.state?e:n||null}},{key:"removeOrphan",value:function(t){u.default.react.getViewModels().filter(function(e){return e.$vmId===t}).forEach(function(t){return t.$destroy()})}},{key:"vmId",get:function(){return this.context&&this.context.vmContext?this.context.vmContext.vmId+"."+this.props.vm:this.props.vm}}]),e}();f.contextTypes=c,f.childContextTypes=c,f.propTypes={vm:a.PropTypes.string,options:a.PropTypes.object,onStateChange:a.PropTypes.func}},6:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=(i(n(0)),i(n(4)));function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.handleValidated=null,r.validations=r.vmContext.getPropValidations(n)||[],r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),r(e,[{key:"addValidation",value:function(t){var e;(e=this.validations).push.apply(e,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(t))}},{key:"clear",value:function(){this.handleValidated&&this.handleValidated({valid:!0,messages:[]})}},{key:"getValidator",value:function(t){if("function"==typeof t.validate)return t.validate;var e="validate"+t.type,n=Object.getPrototypeOf(this);return n.hasOwnProperty(e)?n[e].bind(this,t):function(){return!0}}},{key:"onValidated",value:function(t){"function"==typeof t&&(this.handleValidated=t)}},{key:"validate",value:function(t){var e=this;return new Promise(function(n){t=void 0===t?e.value||null:t,Promise.all(e.validations.map(function(n){return e.runValidator(n,t)})).then(function(t){var r=t.map(function(t){return!1===t.isValid?t.message:null}).filter(function(t){return t}),o={inputId:e.propId,valid:0==r.length,messages:r};e.handleValidated&&e.handleValidated(o),n(o)})})}},{key:"runValidator",value:function(t,e){var n=this.getValidator(t)(e);return n instanceof Promise?n:new Promise(function(e){return e({isValid:n,message:t.message})})}},{key:"validatePattern",value:function(t,e){return!e||new RegExp(t.pattern).test(e)}},{key:"validateRange",value:function(t,e){var n=parseFloat(e),r=!("number"==typeof t.min&&n<t.min),o=!("number"==typeof t.max&&n>t.max);return r&&o}},{key:"validateRequired",value:function(t,e){return!(void 0===e||null==e||"string"==typeof e&&0==e.trim().length)}},{key:"validateServer",value:function(t,e){var n=this.propId+"__validation_"+t.id;this.vmContext.setState(a({},n,null));var r=this.vmContext.once(n,null);return this.vmContext.dispatchState(a({},this.propId,e),!0),r.then(function(e){return{isValid:e,message:t.message}})}},{key:"isRequired",get:function(){return this.validations.filter(function(t){return t.type&&"required"===t.type.toLowerCase()}).length>0}}]),e}();e.default=u},7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.InputElement=void 0;var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=f(n(0)),i=n(1),a=n(5),u=n(12),s=f(n(4)),l=f(n(16)),c=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(2));function f(t){return t&&t.__esModule?t:{default:t}}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function h(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var v=function(t){function e(){return p(this,e),d(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return h(e,o.default.Component),r(e,[{key:"componentDidMount",value:function(){this.props.onChange&&this.props.onChange(this.vmProperty.value)}},{key:"componentWillUpdate",value:function(t){t.id&&(this._vmProperty=null)}},{key:"dispatch",value:function(t){return this.vmProperty.dispatch(t)}},{key:"dispatchProp",value:function(t,e){return this.vmProperty.dispatchProp(t,e)}},{key:"resolveComponents",value:function(t){return c.resolveComponents(t,this.props)}},{key:"render",value:function(){return this.props.hidden?null:this.vmProperty.value}},{key:"vm",get:function(){return this.vmProperty.vm}},{key:"vmContext",get:function(){return this.vmProperty.vmContext}},{key:"value",get:function(){return this.vmProperty.value},set:function(t){this.vmProperty.value=t}},{key:"attrs",get:function(){return Object.assign({fullId:this.vmProperty.fullId},this.vmProperty.attrs,this.props)}},{key:"isVMProperty",get:function(){var t=this.context.vmContext&&this.context.vmContext.getState();return!!t&&t.hasOwnProperty(this.props.id)}},{key:"vmProperty",get:function(){return this.isVMProperty?(this._vmProperty=this._vmProperty||new s.default(this.context.vmContext,this.props.id),this._vmProperty):{fullId:this.props.id,value:this.props.value,attrs:this.props.attrs||{}}}}]),e}();v.contextTypes=a.ContextTypes,v.propTypes={id:i.PropTypes.string.isRequired,hidden:i.PropTypes.bool,onChange:i.PropTypes.func},e.default=v,(e.InputElement=function(t){function e(){return p(this,e),d(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return h(e,v),r(e,[{key:"dispatch",value:function(t,e){return this.vmProperty.dispatch(t,e)}},{key:"vmProperty",get:function(){var t=this;if(this.isVMProperty)return this._vmInput=this._vmInput||new l.default(this.context.vmContext,this.props.id),this._vmInput;var e=this.props.value;return{fullId:this.props.id,value:e,attrs:this.props.attrs||{},dispatch:function(e){return t.props.onChange?t.props.onChange(e):null},onValidated:function(e){return t.props.onValidated?t.props.onValidated(e):null},initMask:function(e){return t.props.initMask?t.props.initMask():null}}}},{key:"changed",get:function(){return this._changed},set:function(t){t&&!this._changed&&this.context.formContext&&this.context.formContext.setChanged(t),this._changed=t}}]),e}()).contextTypes=u.FormContextTypes},8:function(t,e,n){"use strict";var r=function(t){};t.exports=function(t,e,n,o,i,a,u,s){if(r(e),!t){var l;if(void 0===e)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,o,i,a,u,s],f=0;(l=new Error(e.replace(/%s/g,function(){return c[f++]}))).name="Invariant Violation"}throw l.framesToPop=1,l}}},9:function(t,e,n){"use strict";function r(t){return function(){return t}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(t){return t},t.exports=o}})});