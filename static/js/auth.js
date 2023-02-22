/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/auth/index.js":
/*!***************************!*\
  !*** ./src/auth/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("window.addEventListener('load', function() { \n    __webpack_require__(/*! ./login */ /*! ./login.js */ \"./src/auth/login.js\")\n    __webpack_require__(/*! ./signup */ /*! ./signup.js */ \"./src/auth/signup.js\")\n    __webpack_require__(/*! ./logout */ /*! ./logout.js */ \"./src/auth/logout.js\")\n})\n\n//# sourceURL=webpack://webpack/./src/auth/index.js?");

/***/ }),

/***/ "./src/auth/login.js":
/*!***************************!*\
  !*** ./src/auth/login.js ***!
  \***************************/
/***/ (() => {

eval("$('#login').submit(function(event) {\n    const form = $(event.target)\n    const successElement = form.find('.success-message')\n    const failElement = form.find('.fail-message')\n\n    successElement.text('')\n    failElement.text('')\n\n    try {\n        const url = form.attr('action')\n        const method = form.attr('method')\n\n        const data = {}\n        form.serializeArray().map(function(x){data[x.name] = x.value;}); \n\n        $.ajax({\n            type: method,\n            url,\n            data,\n            success: function(res) {\n                if (res.success) {\n                    successElement.text(res.message)\n                    let addCartForm = document.getElementById('add-cart')\n                    if (addCartForm) {\n                        const modalLogin = $('#modal-login')\n                        modalLogin.modal('hide')\n                        $(addCartForm).trigger('submit', [true, res.csrf_token])\n                    } else {\n                        window.location.reload()\n                    }\n                } else {\n                    failElement.text(res.message)\n                }\n            }\n        });\n    } catch (error) {\n        failElement.text('Something went wrong... Please try again later')\n    }\n    \n    return false;\n}); \n\n//# sourceURL=webpack://webpack/./src/auth/login.js?");

/***/ }),

/***/ "./src/auth/logout.js":
/*!****************************!*\
  !*** ./src/auth/logout.js ***!
  \****************************/
/***/ (() => {

eval("$('[id=\"logout\"]').click(function(event) {\n    const target = $(event.target)\n    console.log('target :>> ', target);\n    const href = target.data('target')\n\n    $.ajax({\n        type: 'GET',\n        url: href,\n    }).then(() => {\n        window.location.reload()\n    })\n    return false\n})  \n\n//# sourceURL=webpack://webpack/./src/auth/logout.js?");

/***/ }),

/***/ "./src/auth/signup.js":
/*!****************************!*\
  !*** ./src/auth/signup.js ***!
  \****************************/
/***/ (() => {

eval("$('#signup').submit(function(event) {\n    const form = $(event.target)\n    const successElement = form.find('.success-message')\n    const failElement = form.find('.fail-message')\n\n    successElement.html('')\n    failElement.html('')\n\n    try {\n        const url = form.attr('action')\n        const method = form.attr('method')\n\n        const data = {}\n        form.serializeArray().map(function(x){data[x.name] = x.value;}); \n\n        $.ajax({\n            type: method,\n            url,\n            data,\n            success: function(res) {\n                if (res.success) {\n                    successElement.html(res.message)\n                    // $('#modal-signup').modal('hide')\n                    // $('#modal-login').modal('show')\n                } else {\n                    failElement.html(res.message)\n                }\n            }\n        });\n    } catch (error) {\n        failElement.html('Something went wrong... Please try again later')\n    }\n    \n    return false;\n}); \n\n//# sourceURL=webpack://webpack/./src/auth/signup.js?");

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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/auth/index.js");
/******/ 	
/******/ })()
;