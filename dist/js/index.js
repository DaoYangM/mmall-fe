(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./src/page/index/index.js":
/*!*********************************!*\
  !*** ./src/page/index/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _mm = __webpack_require__(/*! util/mm.js */ \"./src/util/mm.js\");\r\n\r\n_mm.request({\r\n    type: 'get',\r\n    url: '/products?keyword=1',\r\n    dataType: 'json',\r\n    error: function(msg) {\r\n        console.log(msg);\r\n    },\r\n    success: function(data, msg) {\r\n        console.log(data);\r\n    }\r\n});\n\n//# sourceURL=webpack:///./src/page/index/index.js?");

/***/ }),

/***/ "./src/util/mm.js":
/*!************************!*\
  !*** ./src/util/mm.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $ = __webpack_require__(/*! jquery */ \"jquery\");\r\n\r\nvar _mm = {\r\n    request: function(param) {\r\n        var _this = this;\r\n        $.ajax({\r\n            type: param.method || 'get',\r\n            url: param.url || '',\r\n            dataType: param.type || 'json',\r\n            data: param.data || '',\r\n            success: function (result) {\r\n                if(0 === result.status) {\r\n                    typeof praam.success === 'function' && param.success(result.data,  result.msg);\r\n\r\n                } else if (10 === res.status) {\r\n                    _this.doLogin();\r\n\r\n                } else if (1 === result.status) {\r\n                    typeof param.error === 'function' && param.error(result.msg);\r\n                }\r\n            },\r\n\r\n            error: function(error) {\r\n               typeof param.error === 'function' && param.error(error.statusText);\r\n            }\r\n        });\r\n    },\r\n\r\n    doLogin: function() {\r\n        window.location.href = './login.html?redirect='+ encodeURIComponent(window.location.href);\r\n    }\r\n}\r\n\r\nmodule.exports = _mm;\n\n//# sourceURL=webpack:///./src/util/mm.js?");

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./src/page/index/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/page/index/index.js */\"./src/page/index/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/page/index/index.js?");

/***/ }),

/***/ "jquery":
/*!********************************!*\
  !*** external "window.jQuery" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = window.jQuery;\n\n//# sourceURL=webpack:///external_%22window.jQuery%22?");

/***/ })

},[[1,"common"]]]);