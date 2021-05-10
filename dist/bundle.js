(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AttachesTool"] = factory();
	else
		root["AttachesTool"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 846:
/***/ ((module) => {

!function(e,t){ true?module.exports=t():0}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";(function(e){var r=n(2),o=setTimeout;function i(){}function a(e){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],d(e,this)}function u(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,a._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void s(t.promise,e)}c(t.promise,r)}else(1===e._state?c:s)(t.promise,e._value)})):e._deferreds.push(t)}function c(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof a)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void d((r=n,o=t,function(){r.apply(o,arguments)}),e)}e._state=1,e._value=t,f(e)}catch(t){s(e,t)}var r,o}function s(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)u(e,e._deferreds[t]);e._deferreds=null}function l(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function d(e,t){var n=!1;try{e(function(e){n||(n=!0,c(t,e))},function(e){n||(n=!0,s(t,e))})}catch(e){if(n)return;n=!0,s(t,e)}}a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(i);return u(this,new l(e,t,n)),n},a.prototype.finally=r.a,a.all=function(e){return new a(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);var o=r.length;function i(e,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var u=a.then;if("function"==typeof u)return void u.call(a,function(t){i(e,t)},n)}r[e]=a,0==--o&&t(r)}catch(e){n(e)}}for(var a=0;a<r.length;a++)i(a,r[a])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,n){n(e)})},a.race=function(e){return new a(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},a._immediateFn="function"==typeof e&&function(t){e(t)}||function(e){o(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.a=a}).call(this,n(5).setImmediate)},function(e,t,n){"use strict";t.a=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n(4);var o,i,a,u,c,s,f,l=n(8),d=(i=function(e){return new Promise(function(t,n){e=u(e),(e=c(e)).beforeSend&&e.beforeSend();var r=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP");r.open(e.method,e.url),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),Object.keys(e.headers).forEach(function(t){var n=e.headers[t];r.setRequestHeader(t,n)});var o=e.ratio;r.upload.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),r=Math.ceil(n*o/100);e.progress(Math.min(r,100))},!1),r.addEventListener("progress",function(t){var n=Math.round(t.loaded/t.total*100),r=Math.ceil(n*(100-o)/100)+o;e.progress(Math.min(r,100))},!1),r.onreadystatechange=function(){if(4===r.readyState){var e=r.response;try{e=JSON.parse(e)}catch(e){}var o=l.parseHeaders(r.getAllResponseHeaders()),i={body:e,code:r.status,headers:o};f(r.status)?t(i):n(i)}},r.send(e.data)})},a=function(e){return e.method="POST",i(e)},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e.url&&"string"!=typeof e.url)throw new Error("Url must be a string");if(e.url=e.url||"",e.method&&"string"!=typeof e.method)throw new Error("`method` must be a string or null");if(e.method=e.method?e.method.toUpperCase():"GET",e.headers&&"object"!==r(e.headers))throw new Error("`headers` must be an object or null");if(e.headers=e.headers||{},e.type&&("string"!=typeof e.type||!Object.values(o).includes(e.type)))throw new Error("`type` must be taken from module's «contentType» library");if(e.progress&&"function"!=typeof e.progress)throw new Error("`progress` must be a function or null");if(e.progress=e.progress||function(e){},e.beforeSend=e.beforeSend||function(e){},e.ratio&&"number"!=typeof e.ratio)throw new Error("`ratio` must be a number");if(e.ratio<0||e.ratio>100)throw new Error("`ratio` must be in a 0-100 interval");if(e.ratio=e.ratio||90,e.accept&&"string"!=typeof e.accept)throw new Error("`accept` must be a string with a list of allowed mime-types");if(e.accept=e.accept||"*/*",e.multiple&&"boolean"!=typeof e.multiple)throw new Error("`multiple` must be a true or false");if(e.multiple=e.multiple||!1,e.fieldName&&"string"!=typeof e.fieldName)throw new Error("`fieldName` must be a string");return e.fieldName=e.fieldName||"files",e},c=function(e){switch(e.method){case"GET":var t=s(e.data,o.URLENCODED);delete e.data,e.url=/\?/.test(e.url)?e.url+"&"+t:e.url+"?"+t;break;case"POST":case"PUT":case"DELETE":case"UPDATE":var n=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).type||o.JSON}(e);(l.isFormData(e.data)||l.isFormElement(e.data))&&(n=o.FORM),e.data=s(e.data,n),n!==d.contentType.FORM&&(e.headers["content-type"]=n)}return e},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};switch(arguments.length>1?arguments[1]:void 0){case o.URLENCODED:return l.urlEncode(e);case o.JSON:return l.jsonEncode(e);case o.FORM:return l.formEncode(e);default:return e}},f=function(e){return e>=200&&e<300},{contentType:o={URLENCODED:"application/x-www-form-urlencoded; charset=utf-8",FORM:"multipart/form-data",JSON:"application/json; charset=utf-8"},request:i,get:function(e){return e.method="GET",i(e)},post:a,transport:function(e){return e=u(e),l.selectFiles(e).then(function(t){for(var n=new FormData,r=0;r<t.length;r++)n.append(e.fieldName,t[r],t[r].name);l.isObject(e.data)&&Object.keys(e.data).forEach(function(t){var r=e.data[t];n.append(t,r)});var o=e.beforeSend;return e.beforeSend=function(){return o(t)},e.data=n,a(e)})},selectFiles:function(e){return delete(e=u(e)).beforeSend,l.selectFiles(e)}});e.exports=d},function(e,t,n){"use strict";n.r(t);var r=n(1);window.Promise=window.Promise||r.a},function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(6),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var r,o,i,a,u,c=1,s={},f=!1,l=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?r=function(e){t.nextTick(function(){m(e)})}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){m(e.data)},r=function(e){i.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(o=l.documentElement,r=function(e){var t=l.createElement("script");t.onreadystatechange=function(){m(e),t.onreadystatechange=null,o.removeChild(t),t=null},o.appendChild(t)}):r=function(e){setTimeout(m,0,e)}:(a="setImmediate$"+Math.random()+"$",u=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(a)&&m(+t.data.slice(a.length))},e.addEventListener?e.addEventListener("message",u,!1):e.attachEvent("onmessage",u),r=function(t){e.postMessage(a+t,"*")}),d.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var o={callback:e,args:t};return s[c]=o,r(c),c++},d.clearImmediate=p}function p(e){delete s[e]}function m(e){if(f)setTimeout(m,0,e);else{var t=s[e];if(t){f=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{p(e),f=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(0),n(7))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,s=[],f=!1,l=-1;function d(){f&&c&&(f=!1,c.length?s=c.concat(s):l=-1,s.length&&p())}function p(){if(!f){var e=u(d);f=!0;for(var t=s.length;t;){for(c=s,s=[];++l<t;)c&&c[l].run();l=-1,t=s.length}c=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new m(e,t)),1!==s.length||f||u(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=n(9);e.exports=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,i;return t=e,i=[{key:"urlEncode",value:function(e){return o(e)}},{key:"jsonEncode",value:function(e){return JSON.stringify(e)}},{key:"formEncode",value:function(e){if(this.isFormData(e))return e;if(this.isFormElement(e))return new FormData(e);if(this.isObject(e)){var t=new FormData;return Object.keys(e).forEach(function(n){var r=e[n];t.append(n,r)}),t}throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement")}},{key:"isObject",value:function(e){return"[object Object]"===Object.prototype.toString.call(e)}},{key:"isFormData",value:function(e){return e instanceof FormData}},{key:"isFormElement",value:function(e){return e instanceof HTMLFormElement}},{key:"selectFiles",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(t,n){var r=document.createElement("INPUT");r.type="file",e.multiple&&r.setAttribute("multiple","multiple"),e.accept&&r.setAttribute("accept",e.accept),r.style.display="none",document.body.appendChild(r),r.addEventListener("change",function(e){var n=e.target.files;t(n),document.body.removeChild(r)},!1),r.click()})}},{key:"parseHeaders",value:function(e){var t=e.trim().split(/[\r\n]+/),n={};return t.forEach(function(e){var t=e.split(": "),r=t.shift(),o=t.join(": ");r&&(n[r]=o)}),n}}],(n=null)&&r(t.prototype,n),i&&r(t,i),e}()},function(e,t){var n=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,escape).replace(/%20/g,"+")},r=function(e,t,o,i){return t=t||null,o=o||"&",i=i||null,e?function(e){for(var t=new Array,n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t}(Object.keys(e).map(function(a){var u,c,s=a;if(i&&(s=i+"["+s+"]"),"object"==typeof e[a]&&null!==e[a])u=r(e[a],null,o,s);else{t&&(c=s,s=!isNaN(parseFloat(c))&&isFinite(c)?t+Number(s):s);var f=e[a];f=(f=0===(f=!1===(f=!0===f?"1":f)?"0":f)?"0":f)||"",u=n(s)+"="+n(f)}return u})).join(o).replace(/[!'()*]/g,""):""};e.exports=r}])});

/***/ }),

/***/ 387:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".cdx-attaches--with-file {\n    display: flex;\n    padding: 13px 20px;\n    border: 1px solid #e6e9eb;\n    border-radius: 3px;\n    background: #fff;\n  }\n\n    .cdx-attaches--with-file .cdx-attaches__file-info {\n      flex-grow: 8;\n      max-width: calc(100% - 80px);\n    }\n\n    .cdx-attaches--with-file .cdx-attaches__download-button {\n      display: flex;\n      align-items: center;\n    }\n\n    .cdx-attaches--with-file .cdx-attaches__download-button svg {\n        fill: #7b7e89;\n      }\n\n    .cdx-attaches--with-file .cdx-attaches__file-icon {\n      margin-right: 20px;\n      position: relative;\n    }\n\n    .cdx-attaches--with-file .cdx-attaches__file-icon::before {\n        position: absolute;\n        bottom: 7px;\n        left: 8.5px;\n        font-size: 8px;\n        font-weight: 900;\n        text-transform: uppercase;\n        background: #fff;\n        line-height: 150%;\n        content: attr(data-extension);\n      }\n\n    .cdx-attaches--with-file .cdx-attaches__file-icon svg {\n        fill: currentColor;\n      }\n\n    .cdx-attaches--with-file .cdx-attaches__size {\n      color: #7b7e89;\n    }\n\n    .cdx-attaches--with-file .cdx-attaches__size::after {\n        content: attr(data-size);\n        margin-left: 0.2em;\n      }\n\n    .cdx-attaches--with-file .cdx-attaches__title {\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      outline: none;\n      max-width: 90%;\n    }\n  .cdx-attaches--loading .cdx-attaches__title,\n    .cdx-attaches--loading .cdx-attaches__file-icon,\n    .cdx-attaches--loading .cdx-attaches__size,\n    .cdx-attaches--loading .cdx-attaches__download-button,\n    .cdx-attaches--loading .cdx-attaches__button {\n      opacity: 0;\n      font-size: 0;\n    }\n  .cdx-attaches__button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .cdx-attaches__button svg {\n      height: 14px;\n      margin-top: 0;\n      margin-right: 8px;\n    }\n  .cdx-attaches__button:hover {\n      color: #393f52;\n    }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 162:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17pt\" height=\"17pt\" viewBox=\"0 0 17 17\"><path d=\"M9.457 8.945V2.848A.959.959 0 0 0 8.5 1.89a.959.959 0 0 0-.957.957v6.097L4.488 5.891a.952.952 0 0 0-1.351 0 .952.952 0 0 0 0 1.351l4.687 4.688a.955.955 0 0 0 1.352 0l4.687-4.688a.952.952 0 0 0 0-1.351.952.952 0 0 0-1.351 0zM3.59 14.937h9.82a.953.953 0 0 0 .953-.957.952.952 0 0 0-.953-.953H3.59a.952.952 0 0 0-.953.953c0 .532.425.957.953.957zm0 0\" fill-rule=\"evenodd\"></path></svg>"

/***/ }),

/***/ 383:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"40\"><path d=\"M17 0l15 14V3v34a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h20-6zm0 2H3a1 1 0 0 0-1 1v34a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V14H17V2zm2 10h7.926L19 4.602V12z\"></path></svg>"

/***/ }),

/***/ 446:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"40\"><g fill=\"#A8ACB8\" fill-rule=\"evenodd\"><path fill-rule=\"nonzero\" d=\"M17 0l15 14V3v34a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h20-6zm0 2H3a1 1 0 0 0-1 1v34a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V14H17V2zm2 10h7.926L19 4.602V12z\"></path><path d=\"M7 22h18v2H7zm0 4h18v2H7zm0 4h18v2H7z\"></path></g></svg>"

/***/ }),

/***/ 240:
/***/ ((module) => {

module.exports = "<svg width=\"12\" height=\"14\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.109 2.08H2.942a.862.862 0 0 0-.862.862v8.116c0 .476.386.862.862.862h5.529a.862.862 0 0 0 .862-.862V7.695H4.11V2.08zm1.905.497v3.29h3.312l-3.312-3.29zM2.942 0h2.74c.326.02.566.076.719.165.153.09.484.413.992.973l3.21 3.346c.347.413.557.683.631.811.111.193.179.446.179.579v5.184A2.942 2.942 0 0 1 8.471 14H2.942A2.942 2.942 0 0 1 0 11.058V2.942A2.942 2.942 0 0 1 2.942 0z\" fill-rule=\"nonzero\"></path></svg>"

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ AttachesTool)
});

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/index.css
var cjs_ruleSet_1_rules_1_use_2_src = __webpack_require__(387);
;// CONCATENATED MODULE: ./src/index.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(cjs_ruleSet_1_rules_1_use_2_src/* default */.Z, options);



/* harmony default export */ const src = (cjs_ruleSet_1_rules_1_use_2_src/* default.locals */.Z.locals || {});
// EXTERNAL MODULE: ./node_modules/@codexteam/ajax/dist/main.js
var main = __webpack_require__(846);
var main_default = /*#__PURE__*/__webpack_require__.n(main);
;// CONCATENATED MODULE: ./src/uploader.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Module for file uploading.
 */

var Uploader = /*#__PURE__*/function () {
  /**
   * @param {Object} config
   * @param {function} onUpload - callback for successful file upload
   * @param {function} onError - callback for uploading errors
   */
  function Uploader(_ref) {
    var config = _ref.config,
        onUpload = _ref.onUpload,
        onError = _ref.onError;

    _classCallCheck(this, Uploader);

    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }
  /**
   * Handle clicks on the upload file button
   * @fires ajax.transport()
   * @param {function} onPreview - callback fired when preview is ready
   */


  _createClass(Uploader, [{
    key: "uploadSelectedFile",
    value: function uploadSelectedFile(_ref2) {
      var _this = this;

      var onPreview = _ref2.onPreview;
      main_default().transport({
        url: this.config.endpoint,
        accept: this.config.types,
        beforeSend: function beforeSend() {
          return onPreview();
        },
        fieldName: this.config.field
      }).then(function (response) {
        _this.onUpload(response);
      })["catch"](function (error) {
        var message = error && error.message ? error.message : _this.config.errorMessage;

        _this.onError(message);
      });
    }
  }]);

  return Uploader;
}();


;// CONCATENATED MODULE: ./src/custom-uploader.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function custom_uploader_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function custom_uploader_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function custom_uploader_createClass(Constructor, protoProps, staticProps) { if (protoProps) custom_uploader_defineProperties(Constructor.prototype, protoProps); if (staticProps) custom_uploader_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Module for file uploading with custom upload handler
 */

var CustomUploader = /*#__PURE__*/function () {
  /**
   * @param {Object} config
   * @param {function} onUpload - callback for successful file upload
   * @param {function} onError - callback for uploading errors
   */
  function CustomUploader(_ref) {
    var config = _ref.config,
        onUpload = _ref.onUpload,
        onError = _ref.onError;

    custom_uploader_classCallCheck(this, CustomUploader);

    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
    this.uploadByFile = config.uploader.uploadByFile;
  }
  /**
   * Handle clicks on the upload file button
   * @param {function} onPreview - callback fired when preview is ready
   */


  custom_uploader_createClass(CustomUploader, [{
    key: "uploadSelectedFile",
    value: function () {
      var _uploadSelectedFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var _this = this;

        var onPreview, files;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onPreview = _ref2.onPreview;
                _context.next = 3;
                return main_default().selectFiles({
                  accept: this.config.accept,
                  multiple: false
                });

              case 3:
                files = _context.sent;
                onPreview();

                if (files.length) {
                  _context.next = 8;
                  break;
                }

                this.onError('No files selected');
                return _context.abrupt("return");

              case 8:
                this.uploadByFile(files[0]).then(function (response) {
                  return _this.onUpload({
                    body: response
                  });
                })["catch"](function (response) {
                  return _this.onUpload({
                    body: response
                  });
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function uploadSelectedFile(_x) {
        return _uploadSelectedFile.apply(this, arguments);
      }

      return uploadSelectedFile;
    }()
  }]);

  return CustomUploader;
}();


// EXTERNAL MODULE: ./src/svg/toolbox.svg
var toolbox = __webpack_require__(240);
var toolbox_default = /*#__PURE__*/__webpack_require__.n(toolbox);
// EXTERNAL MODULE: ./src/svg/standard.svg
var standard = __webpack_require__(446);
var standard_default = /*#__PURE__*/__webpack_require__.n(standard);
// EXTERNAL MODULE: ./src/svg/custom.svg
var custom = __webpack_require__(383);
var custom_default = /*#__PURE__*/__webpack_require__.n(custom);
// EXTERNAL MODULE: ./src/svg/arrow-download.svg
var arrow_download = __webpack_require__(162);
var arrow_download_default = /*#__PURE__*/__webpack_require__.n(arrow_download);
;// CONCATENATED MODULE: ./src/index.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }








var LOADER_TIMEOUT = 500;
/**
 * @typedef {object} AttachesToolData
 * @description Attaches Tool's output data format
 * @property {AttachesFileData} file - object containing information about the file
 * @property {string} title - file's title
 */

/**
 * @typedef {object} AttachesFileData
 * @description Attaches Tool's file format
 * @property {string} [url] - file's upload url
 * @property {string} [size] - file's size
 * @property {string} [extension] - file's extension
 * @property {string} [name] - file's name
 */

/**
 * @typedef {object} FileData
 * @description Attaches Tool's response from backend
 * @property {string} url - file's url
 * @property {string} name - file's name with extension
 * @property {string} extension - file's extension
 */

/**
 * @typedef {object} UploadResponseFormat
 * @description This format expected from backend on file upload
 * @property {number} success  - 1 for successful uploading, 0 for failure
 * @property {FileData} file - backend response with uploaded file data.
 */

/**
 * @typedef {object} CustomUploaderConfig
 * @description Config object to provide custom upload functionality
 * @property {function(File)} uploadByFile api to upload a File object
 */

/**
 * @typedef {object} AttachesToolConfig
 * @description Config supported by Tool
 * @property {string} endpoint - file upload url
 * @property {string} field - field name for uploaded file
 * @property {string} types - available mime-types
 * @property {string} placeholder
 * @property {string} errorMessage
 * @property {CustomUploaderConfig} uploader
 */

/**
 * @class AttachesTool
 * @classdesc AttachesTool for Editor.js 2.0
 *
 * @property {API} api - Editor.js API
 * @property {AttachesToolData} data
 * @property {AttachesToolConfig} config
 */

var AttachesTool = /*#__PURE__*/function () {
  /**
   * @param {AttachesToolData} data
   * @param {Object} config
   * @param {API} api
   */
  function AttachesTool(_ref) {
    var _this = this;

    var data = _ref.data,
        config = _ref.config,
        api = _ref.api;

    src_classCallCheck(this, AttachesTool);

    this.api = api;
    this.nodes = {
      wrapper: null,
      button: null,
      title: null
    };
    this._data = {
      file: {},
      title: ''
    };
    this.config = {
      endpoint: config.endpoint || '',
      uploader: config.uploader || null,
      field: config.field || 'file',
      types: config.types || '*',
      buttonText: config.buttonText || 'Select file to upload',
      errorMessage: config.errorMessage || 'File upload failed'
    };
    this.data = data;
    /**
     * Module for files uploading
     */

    var uploaderConfig = {
      config: this.config,
      onUpload: function onUpload(response) {
        return _this.onUpload(response);
      },
      onError: function onError(error) {
        return _this.uploadingFailed(error);
      }
    };
    this.uploader = this.config.uploader ? new CustomUploader(uploaderConfig) : new Uploader(uploaderConfig);
    this.enableFileUpload = this.enableFileUpload.bind(this);
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   */


  src_createClass(AttachesTool, [{
    key: "CSS",
    get:
    /**
     * Tool's CSS classes
     */
    function get() {
      return {
        baseClass: this.api.styles.block,
        apiButton: this.api.styles.button,
        loader: this.api.styles.loader,

        /**
         * Tool's classes
         */
        wrapper: 'cdx-attaches',
        wrapperWithFile: 'cdx-attaches--with-file',
        wrapperLoading: 'cdx-attaches--loading',
        button: 'cdx-attaches__button',
        title: 'cdx-attaches__title',
        size: 'cdx-attaches__size',
        downloadButton: 'cdx-attaches__download-button',
        fileInfo: 'cdx-attaches__file-info',
        fileIcon: 'cdx-attaches__file-icon'
      };
    }
    /**
     * Possible files' extension colors
     */

  }, {
    key: "EXTENSIONS",
    get: function get() {
      return {
        doc: '#3e74da',
        docx: '#3e74da',
        odt: '#3e74da',
        pdf: '#d47373',
        rtf: '#656ecd',
        tex: '#5a5a5b',
        txt: '#5a5a5b',
        pptx: '#e07066',
        ppt: '#e07066',
        mp3: '#eab456',
        mp4: '#f676a6',
        xls: '#3f9e64',
        html: '#2988f0',
        htm: '#2988f0',
        png: '#f676a6',
        jpg: '#f67676',
        jpeg: '#f67676',
        gif: '#f6af76',
        zip: '#4f566f',
        rar: '#4f566f',
        exe: '#e26f6f',
        svg: '#bf5252',
        key: '#e07066',
        sketch: '#df821c',
        ai: '#df821c',
        psd: '#388ae5',
        dmg: '#e26f6f',
        json: '#2988f0',
        csv: '#3f9e64'
      };
    }
    /**
     * Return Block data
     * @param {HTMLElement} toolsContent
     * @return {AttachesToolData}
     */

  }, {
    key: "save",
    value: function save(toolsContent) {
      /**
       * If file was uploaded
       */
      if (this.pluginHasData()) {
        var title = toolsContent.querySelector(".".concat(this.CSS.title)).innerHTML;
        Object.assign(this.data, {
          title: title
        });
      }

      return this.data;
    }
    /**
     * Renders Block content
     * @return {HTMLDivElement}
     */

  }, {
    key: "render",
    value: function render() {
      var holder = this.make('div', this.CSS.baseClass);
      this.nodes.wrapper = this.make('div', this.CSS.wrapper);

      if (this.pluginHasData()) {
        this.showFileData();
      } else {
        this.prepareUploadButton();
      }

      holder.appendChild(this.nodes.wrapper);
      return holder;
    }
    /**
     * Prepares button for file uploading
     */

  }, {
    key: "prepareUploadButton",
    value: function prepareUploadButton() {
      this.nodes.button = this.make('div', [this.CSS.apiButton, this.CSS.button]);
      this.nodes.button.innerHTML = "".concat((toolbox_default()), " ").concat(this.config.buttonText);
      this.nodes.button.addEventListener('click', this.enableFileUpload);
      this.nodes.wrapper.appendChild(this.nodes.button);
    }
    /**
     * Fires after clicks on the Toolbox AttachesTool Icon
     * Initiates click on the Select File button
     * @public
     */

  }, {
    key: "appendCallback",
    value: function appendCallback() {
      this.nodes.button.click();
    }
    /**
     * Checks if any of Tool's fields have data
     * @return {boolean}
     */

  }, {
    key: "pluginHasData",
    value: function pluginHasData() {
      return this.data.title !== '' || Object.values(this.data.file).some(function (item) {
        return item !== undefined;
      });
    }
    /**
     * Allow to upload files on button click
     */

  }, {
    key: "enableFileUpload",
    value: function enableFileUpload() {
      var _this2 = this;

      this.uploader.uploadSelectedFile({
        onPreview: function onPreview() {
          _this2.nodes.wrapper.classList.add(_this2.CSS.wrapperLoading, _this2.CSS.loader);
        }
      });
    }
    /**
     * File uploading callback
     * @param {UploadResponseFormat} response
     */

  }, {
    key: "onUpload",
    value: function onUpload(response) {
      var body = response.body;

      if (body.success && body.file) {
        var _body$file = body.file,
            url = _body$file.url,
            name = _body$file.name,
            size = _body$file.size;
        this.data = {
          file: {
            url: url,
            extension: name.split('.').pop(),
            name: name,
            size: size
          },
          title: name
        };
        this.nodes.button.remove();
        this.showFileData();
        this.moveCaretToEnd(this.nodes.title);
        this.nodes.title.focus();
        this.removeLoader();
      } else {
        this.uploadingFailed(this.config.errorMessage);
      }
    }
    /**
     * Handles uploaded file's extension and appends corresponding icon
     */

  }, {
    key: "appendFileIcon",
    value: function appendFileIcon() {
      var extension = this.data.file.extension || '';
      var extensionColor = this.EXTENSIONS[extension];
      var fileIcon = this.make('div', this.CSS.fileIcon, {
        innerHTML: extensionColor ? (custom_default()) : (standard_default())
      });

      if (extensionColor) {
        fileIcon.style.color = extensionColor;
        fileIcon.setAttribute('data-extension', extension);
      }

      this.nodes.wrapper.appendChild(fileIcon);
    }
    /**
     * Removes tool's loader
     */

  }, {
    key: "removeLoader",
    value: function removeLoader() {
      var _this3 = this;

      setTimeout(function () {
        return _this3.nodes.wrapper.classList.remove(_this3.CSS.wrapperLoading, _this3.CSS.loader);
      }, LOADER_TIMEOUT);
    }
    /**
     * If upload is successful, show info about the file
     */

  }, {
    key: "showFileData",
    value: function showFileData() {
      this.nodes.wrapper.classList.add(this.CSS.wrapperWithFile);
      var _this$data = this.data,
          _this$data$file = _this$data.file,
          size = _this$data$file.size,
          url = _this$data$file.url,
          title = _this$data.title;
      this.appendFileIcon();
      var fileInfo = this.make('div', this.CSS.fileInfo);

      if (title) {
        this.nodes.title = this.make('div', this.CSS.title, {
          contentEditable: true
        });
        this.nodes.title.textContent = title;
        fileInfo.appendChild(this.nodes.title);
      }

      if (size) {
        var sizePrefix;
        var formattedSize;
        var fileSize = this.make('div', this.CSS.size);

        if (Math.log10(+size) >= 6) {
          sizePrefix = 'MiB';
          formattedSize = size / Math.pow(2, 20);
        } else {
          sizePrefix = 'KiB';
          formattedSize = size / Math.pow(2, 10);
        }

        fileSize.textContent = formattedSize.toFixed(1);
        fileSize.setAttribute('data-size', sizePrefix);
        fileInfo.appendChild(fileSize);
      }

      this.nodes.wrapper.appendChild(fileInfo);
      var downloadIcon = this.make('a', this.CSS.downloadButton, {
        innerHTML: (arrow_download_default()),
        href: url,
        target: '_blank',
        rel: 'nofollow noindex noreferrer'
      });
      this.nodes.wrapper.appendChild(downloadIcon);
    }
    /**
     * If file uploading failed, remove loader and show notification
     * @param {string} errorMessage -  error message
     */

  }, {
    key: "uploadingFailed",
    value: function uploadingFailed(errorMessage) {
      this.api.notifier.show({
        message: errorMessage,
        style: 'error'
      });
      this.removeLoader();
    }
    /**
     * Return Attaches Tool's data
     * @return {AttachesToolData}
     */

  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
    /**
     * Stores all Tool's data
     * @param {AttachesToolData} data
     */
    ,
    set: function set(_ref2) {
      var file = _ref2.file,
          title = _ref2.title;
      this._data = Object.assign({}, {
        file: {
          url: file && file.url || this._data.file.url,
          name: file && file.name || this._data.file.name,
          extension: file && file.extension || this._data.file.extension,
          size: file && file.size || this._data.file.size
        },
        title: title || this._data.title
      });
    }
    /**
     * Moves caret to the end of contentEditable element
     * @param {HTMLElement} element - contentEditable element
     */

  }, {
    key: "moveCaretToEnd",
    value: function moveCaretToEnd(element) {
      var range = document.createRange();
      var selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    /**
     * Helper method for elements creation
     * @param tagName
     * @param classNames
     * @param attributes
     * @return {HTMLElement}
     */

  }, {
    key: "make",
    value: function make(tagName) {
      var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var el = document.createElement(tagName);

      if (Array.isArray(classNames)) {
        var _el$classList;

        (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classNames));
      } else if (classNames) {
        el.classList.add(classNames);
      }

      for (var attrName in attributes) {
        el[attrName] = attributes[attrName];
      }

      return el;
    }
  }], [{
    key: "toolbox",
    get: function get() {
      return {
        icon: (toolbox_default()),
        title: 'Attaches'
      };
    }
  }]);

  return AttachesTool;
}();


})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});