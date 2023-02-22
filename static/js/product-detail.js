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

/***/ "./src/cart/cart.js":
/*!**************************!*\
  !*** ./src/cart/cart.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cart\": () => (/* binding */ Cart)\n/* harmony export */ });\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ \"./src/cart/constant.js\");\n/* harmony import */ var _voucher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../voucher */ \"./src/voucher/index.js\");\n\n\n\nclass Cart {\n    static async render() {\n        let grandTotal = 0\n        const data = await (0,_voucher__WEBPACK_IMPORTED_MODULE_1__.getVouchers)(\"cart\");\n        const vouchers = data.reduce(function (prev, voucher) {\n            prev.push(new _voucher__WEBPACK_IMPORTED_MODULE_1__.CartVoucher(voucher));\n            return prev;\n        }, []);\n\n        vouchers.forEach((voucher) => {\n            if (voucher.isValid()) {\n                voucher.doDiscount();\n            }\n        });\n\n        console.log(\"vouchers :>> \", vouchers);\n\n        const subTotal = Cart.getSubtotal();\n        const logoNotSetup = Cart.getLogoNotSetup();\n        \n        $(\".setup_logo__items__container\").html('')\n        Object.values(logoNotSetup).forEach((src) => {\n            Cart._renderSetupLogoItem(\n                src,\n                Fee.logo_fee.before,\n                Fee.logo_fee.after\n            );\n            grandTotal += Fee.logo_fee.after\n        });\n\n        grandTotal += subTotal\n        grandTotal += Fee.delivery_fee.after\n\n        Cart._renderValue($(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.CART_GRANDTOTAL), grandTotal)\n        Cart._renderValue($(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.CART_SUBTOTAL), subTotal);\n        Cart._renderValue(\n            $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.CART_DELIVERY),\n            Fee.delivery_fee.before,\n            Fee.delivery_fee.after\n        );\n    }\n\n    static getCheckedItems() {\n        const checkedItems = $('.cart-item').toArray().reduce(function(prev, curr) {\n            if ($(curr).find('input[name=\"cart_id\"]').is(\":checked\")) {\n                prev.push(curr)\n            }\n            return prev\n        }, [])\n\n        return checkedItems\n    }\n\n    static getSubtotal() {\n        const checkedItems = Cart.getCheckedItems()\n\n        let result = 0\n        checkedItems.forEach(cartItem => {\n            const cartItemTotal = $(cartItem).find(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.CART_ITEM__TOTAL)\n                result += parseFloat($(cartItemTotal).data(\"price\"));\n        })\n        return result\n    }\n\n    static getLogoNotSetup() {\n        const checkedItems = Cart.getCheckedItems()\n\n        const result = {}\n        checkedItems.forEach(cartItem => {\n            const logosNotSetup = $(cartItem).find(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.DATA_LOGO_NOT_SETUP)\n            logosNotSetup.toArray().forEach(logo => {\n                result[$(logo).data(\"id\")] = $(logo).data(\"src\");\n            })\n        })\n        return result\n    }\n\n    static _renderValue($element, value, valueAfter) {\n        const divValue = $element.find(\"div.value\");\n        divValue.html('')\n\n        const spanValue = jQuery('<span class=\"value\"></span>').appendTo(divValue);\n        value = parseFloat(value);\n\n        if (valueAfter !== undefined) {\n            valueAfter = parseFloat(valueAfter);\n            if (valueAfter !== value) {\n                const del = document.createElement(\"del\");\n                del.className = \"mr-2\";\n                del.textContent = toMoneyString(value);\n                spanValue.before(del);\n                spanValue.text(toMoneyString(valueAfter));\n            } else {\n                spanValue.text(toMoneyString(value));\n            }\n        } else {\n            spanValue.text(toMoneyString(value));\n        }\n    }\n\n\n\n    static _renderSetupLogoItem(image, value, valueAfter) {\n        const setupLogoItemsContainer = document.querySelector(\n            \".setup_logo__items__container\"\n        );\n\n        const container = document.createElement(\"div\");\n        const img = document.createElement(\"img\");\n        const span = document.createElement(\"span\");\n        const spanWrapper = document.createElement(\"div\");\n\n        spanWrapper.appendChild(span);\n        container.appendChild(img);\n        container.appendChild(spanWrapper);\n\n        container.className = \"pair-container\";\n        spanWrapper.className = \"value\";\n        img.src = `/media/${image}`;\n        img.style.width = \"64px\";\n        img.onerror = function () {\n            this.parentNode.style = \"color:red\";\n            this.parentNode.textContent = \"Image not found\";\n        };\n        span.className = \"value\";\n\n        value = parseFloat(value);\n        if (valueAfter !== undefined) {\n            valueAfter = parseFloat(valueAfter);\n            if (valueAfter !== value) {\n                const del = document.createElement(\"del\");\n                del.className = \"mr-2\";\n                del.textContent = toMoneyString(value);\n                spanWrapper.appendChild(del);\n                span.textContent = toMoneyString(valueAfter);\n            } else {\n                span.textContent = toMoneyString(value);\n            }\n        } else {\n            span.textContent = (Math.round(value * 100) / 100).toFixed(2);\n        }\n\n        setupLogoItemsContainer.appendChild(container);\n    }\n}\n\n\n//# sourceURL=webpack://webpack/./src/cart/cart.js?");

/***/ }),

/***/ "./src/cart/constant.js":
/*!******************************!*\
  !*** ./src/cart/constant.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selector\": () => (/* binding */ selector)\n/* harmony export */ });\nconst selector = {\n    DATA_LOGO_NOT_SETUP: '.logo-not-setup',\n\n    CART_ITEM__TOTAL: '.cart-item__total',\n\n    CART_SUBTOTAL: '#cart_total__subtotal',\n    CART_TAX: '#cart_total__tax',\n    CART_SETUP_LOGO: '#cart_total__setup_logo',\n    CART_DELIVERY: '#cart_total__delivery',\n    CART_GRANDTOTAL: '#cart_total__grand_total',\n}\n\n//# sourceURL=webpack://webpack/./src/cart/constant.js?");

/***/ }),

/***/ "./src/common/constant.js":
/*!********************************!*\
  !*** ./src/common/constant.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CURRENCY_SYMBOL\": () => (/* binding */ CURRENCY_SYMBOL),\n/* harmony export */   \"SELECTOR\": () => (/* binding */ SELECTOR),\n/* harmony export */   \"__\": () => (/* binding */ __)\n/* harmony export */ });\nconst CURRENCY_SYMBOL = '£'\n\nconst SELECTOR = {\n    MAIN_MODAL: '#main-modal',\n    MAIN_MODAL_BODY: '#main-modal__body',\n    MAIN_MODAL_TITLE: '#main-modal__title',\n    MAIN_MODAL_FOOTER: '#main-modal__footer',\n}\n\n\nconst __ = {\n    ZERO_PRICE: '0',\n\n    VOUCHER: {\n        FOR_FIELD__EACH_ITEM: 'each_item',\n        FOR_FIELD__DELIVERY_FEE: 'Delivery_Fee',\n        FOR_FIELD__LOGO_TEXT_FEE: 'Logo_text_Fee'\n    }\n}\n\n//# sourceURL=webpack://webpack/./src/common/constant.js?");

/***/ }),

/***/ "./src/common/modal.js":
/*!*****************************!*\
  !*** ./src/common/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showModal\": () => (/* binding */ showModal)\n/* harmony export */ });\nconst { SELECTOR } = __webpack_require__(/*! ./constant */ \"./src/common/constant.js\")\nconst { STRING } = __webpack_require__(/*! ./string */ \"./src/common/string.js\")\n\n\nconst showModal = function(body='', title=STRING.Form_not_valid_title, buttons=[],onHidden = () => {}) {\n    $(SELECTOR.MAIN_MODAL_TITLE).html('')\n    $(SELECTOR.MAIN_MODAL_BODY).html('')\n    $(SELECTOR.MAIN_MODAL_FOOTER).html('')\n\n    $(SELECTOR.MAIN_MODAL_TITLE).append(title || '')\n    $(SELECTOR.MAIN_MODAL_BODY).append(body || '')\n\n    if (buttons.length === 0) {\n        const buttonClose = jQuery('<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\"> Close </button>')\n        buttons.push(buttonClose)\n    }\n    buttons.forEach(button => {\n        $(SELECTOR.MAIN_MODAL_FOOTER).append(button)\n    })\n\n    $(SELECTOR.MAIN_MODAL).on('hidden.bs.modal', onHidden);\n    $(SELECTOR.MAIN_MODAL).modal('show')\n}\n\n//# sourceURL=webpack://webpack/./src/common/modal.js?");

/***/ }),

/***/ "./src/common/string.js":
/*!******************************!*\
  !*** ./src/common/string.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"STRING\": () => (/* binding */ STRING)\n/* harmony export */ });\nconst STRING = {\n    Form_not_valid_title: 'Invalid form',\n    Require_choose_main_logo: 'Please choose a logo!',\n    Require_main_text_value: 'Please specify a valid text!',\n    Require_choose_additional_logo: 'Please choose an additional logo!',\n    Require_additional_text_value: 'Please specify an additional text!',\n    Require_additional_positions: 'Please choose at least 1 positions!',\n    Require_name_value: 'Please specify a valid name',\n    Require_name_positions: 'Please at least 1 positions for additional name!'\n}\n\n//# sourceURL=webpack://webpack/./src/common/string.js?");

/***/ }),

/***/ "./src/product-detail/cart-item.js":
/*!*****************************************!*\
  !*** ./src/product-detail/cart-item.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CartItem\": () => (/* binding */ CartItem)\n/* harmony export */ });\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ \"./src/product-detail/constant.js\");\n\n\nclass CartItem {\n    // Size\n    static getSizeId() { return $('#size').val() }\n    static setSizeValue(value) { $('#size').val(value) }\n\n    // Color\n    static getColorId() { return $('input[name=\"color_id\"]:checked').val() }\n    static setColorValue (value) {\n        const colorInput = $(`input[name=\"color_id\"][value=\"${value}\"]`)\n        colorInput.prop('checked', true)\n        colorInput.trigger('change')\n    }\n\n    // Variant\n    static getVariantOption(params = {}) {\n        let variantOption = $(`#variant option[data-color_id=\"${CartItem.getColorId()}\"][data-size_id=\"${CartItem.getSizeId()}\"]`)\n        if (variantOption.length === 0) {\n            if (params.sizeId) { variantOption = $(`#variant option[data-size_id=\"${params.sizeId}\"]`) }\n            else if (params.colorId) { variantOption = $(`#variant option[data-color_id=\"${params.colorId}\"]`) }\n        }\n        return variantOption\n    }\n    static setVariantValue(value) {\n        $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__VARIANT).val(value)\n    }\n\n    // Quantity\n    static getQuantity() {\n        return parseInt( $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.INPUT__QUANTITY).val() )\n    }\n}\n\n\n\n//# sourceURL=webpack://webpack/./src/product-detail/cart-item.js?");

/***/ }),

/***/ "./src/product-detail/constant.js":
/*!****************************************!*\
  !*** ./src/product-detail/constant.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"name\": () => (/* binding */ name),\n/* harmony export */   \"selector\": () => (/* binding */ selector),\n/* harmony export */   \"value\": () => (/* binding */ value)\n/* harmony export */ });\nconst selector = {\n    SELECT__VARIANT: '#variant',\n    SELECT__SIZE: '#size',\n    INPUT__COLOR: 'input[name=\"color_id\"]',\n    \n    SELECT__LOGO_TEXT: '.logo-text__select',\n    SELECT__MAIN_LOGO_TEXT: '#main-logo-text__select', \n    SELECT__MAIN_POSITION: '#main-position',\n    INPUT__MAIN_TEXT_VALUE: '#main_text__value_option__input',\n    INPUT__MAIN_TEXT_FONT: '#main_text__font_option__input',\n    INPUT__MAIN_TEXT_COLOR: '#main_text__color_option__input',\n\n    SELECT__ADDITIONAL_POSITION: '#additional-position__select',\n    INPUT__ADDITIONAL_POSITIONS: 'input[name=\"main_logo_text__additional_positions\"]',\n    INPUT__ADDITIONAL_TEXT_VALUE: '#additional_text__value_option__input',\n    INPUT__ADDITIONAL_TEXT_FONT: '#additional_text__font_option__input',\n    INPUT__ADDITIONAL_TEXT_COLOR: '#additional_text__color_option__input',\n\n    SELECT__ADDITIONAL_LOGO_TEXT: '#additional-logo-text__select',\n    INPUT__ADDITIONAL_LOGO_TEXT__POSITIONS: 'input[name=\"additional_logo_text__positions\"]',\n    \n    SELECT__ADDITIONAL_NAME: '#additional-name__select',\n    INPUT__ADDITIONAL_NAME: '#input__additional-name',\n    INPUT__ADDITIONAL_NAME__POSITIONS: 'input[name=\"additional_name__positions\"]',\n\n    INPUT__QUANTITY: '#quantity',\n\n\n    // SUMMARY\n    SUMMARY__ROOT: '#summary',\n\n    SUMMARY__VARIANT: '#summary__variant',\n    SUMMARY__SIZE: '#summary__size',\n    SUMMARY__COLOR: '#summary__color',\n\n    SUMMARY__MAIN_LOGO_TEXT: '#summary__main-logo-text',\n    SUMMARY__MAIN_POSITION: '#summary__main-position',\n    SUMMARY__MAIN_ADDITIONAL_POSITIONS: '#summary__main-additional-positions',\n\n    SUMMARY__ADDITIONAL_LOGO_TEXT: '#summary__additional-logo-text', \n    SUMMARY__ADDITIONAL_LOGO_TEXT_POSITIONS: '#summary__additional-logo-text__positions',\n\n    SUMMARY__ADDITIONAL_NAME: '#summary__additional-name',\n    SUMMARY__ADDITIONAL_NAME_POSITIONS: '#summary__additional-name__positions',\n\n    SUMMARY__VOUCHER: '#summary__voucher',\n    SUMMARY__TOTAL_PRICE: '#total-price'\n}\n\nconst name = {\n    NAME__MAIN_LOGO : 'main_logo',\n    NAME__ADDITIONAL_LOGO : 'additional_logo',\n}\n\nconst value = {\n    LOGO_TEXT__TYPE_LOGO: '1',\n    LOGO_TEXT__TYPE_TEXT: '2',\n    LOGO_TEXT__TYPE_NONE: '0',\n}\n\n//# sourceURL=webpack://webpack/./src/product-detail/constant.js?");

/***/ }),

/***/ "./src/product-detail/index.js":
/*!*************************************!*\
  !*** ./src/product-detail/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"onChangePosition\": () => (/* binding */ onChangePosition),\n/* harmony export */   \"onSelect\": () => (/* binding */ onSelect),\n/* harmony export */   \"onSubmit\": () => (/* binding */ onSubmit),\n/* harmony export */   \"onUpload\": () => (/* binding */ onUpload),\n/* harmony export */   \"renderer\": () => (/* binding */ renderer),\n/* harmony export */   \"showHide\": () => (/* binding */ showHide),\n/* harmony export */   \"updateSummary\": () => (/* binding */ updateSummary)\n/* harmony export */ });\nconst renderer = __webpack_require__(/*! ./renderer */ \"./src/product-detail/renderer.js\")\nconst onSelect = __webpack_require__(/*! ./on-select */ \"./src/product-detail/on-select.js\")\nconst onSubmit = __webpack_require__(/*! ./on-submit */ \"./src/product-detail/on-submit.js\")\nconst onUpload = __webpack_require__(/*! ./on-upload */ \"./src/product-detail/on-upload.js\")\nconst showHide = __webpack_require__(/*! ./show-hide */ \"./src/product-detail/show-hide.js\")\nconst onChangePosition = __webpack_require__(/*! ./on-change-position */ \"./src/product-detail/on-change-position.js\")\nconst updateSummary = __webpack_require__(/*! ./update-summary */ \"./src/product-detail/update-summary.js\")\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    if (!isAuth) {\n        // const modalLogin = $('#modal-login')\n        // const modalSignup = $('#modal-signup')\n        // modalLogin.find('.close').remove()\n        // modalSignup.find('.close').remove()\n        // modalLogin.find('.fail-message').html('Please login to continue!')\n        // modalLogin.modal({backdrop: 'static', keyboard: false, show: true})  \n        // modalSignup.modal({backdrop: 'static', keyboard: false, show: false})  \n    }\n});\n\n\n//# sourceURL=webpack://webpack/./src/product-detail/index.js?");

/***/ }),

/***/ "./src/product-detail/on-change-position.js":
/*!**************************************************!*\
  !*** ./src/product-detail/on-change-position.js ***!
  \**************************************************/
/***/ (function() {

eval("const val = $('#main-position').val()\n$(`.position-input[value=\"${val}\"]`).not(this).prop('disabled', true);\n\n$('.position-input, #main-position').on('change', function() {\n    const val = $(this).val()\n    $(`.position-input[value=\"${val}\"]`).not(this).prop('checked', false)\n});\n\n$('#main-position').on('change', function() {\n    const val = $(this).val()\n    const positionInput = $(`.position-input[value=\"${val}\"]`)\n    positionInput.prop('checked', false)\n    positionInput.prop('disabled', true)\n    $('.position-input').not(positionInput).prop('disabled', false)\n});\n\n//# sourceURL=webpack://webpack/./src/product-detail/on-change-position.js?");

/***/ }),

/***/ "./src/product-detail/on-select.js":
/*!*****************************************!*\
  !*** ./src/product-detail/on-select.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const util = __webpack_require__(/*! ./util */ \"./src/product-detail/util.js\")\nconst reRenderer = __webpack_require__(/*! ./re-render */ \"./src/product-detail/re-render.js\")\nconst { selector } = __webpack_require__(/*! ./constant */ \"./src/product-detail/constant.js\");\nconst { CartItem } = __webpack_require__(/*! ./cart-item */ \"./src/product-detail/cart-item.js\");\n\n// Show/hide option\nfunction selectTrueFalseHandler(event) {\n    const choice =  $(this).val() === \"1\" ? true : false;\n    const root = util.getProductOptionRoot( $(this) )\n    const optionContainer = root.find('.option-container')\n    if (choice) {\n        optionContainer.show()\n    } else {\n        optionContainer.hide()\n    }\n}\n$(selector.SELECT__ADDITIONAL_NAME).on('change', selectTrueFalseHandler);\n$(selector.SELECT__ADDITIONAL_POSITION).on('change', selectTrueFalseHandler)\n\n// Show/hide logo_text\n$(selector.SELECT__LOGO_TEXT).on('change', function (event) {\n    const root = util.getProductOptionRoot( $(this) )\n    const optionContainer = root.find('.option-container')\n    const logo = optionContainer.find('.logo-option')\n    const text = optionContainer.find('.text-option')\n    const position = optionContainer.find('.position-option')\n    switch ($(this).val()) {\n        case '0':\n            logo.hide(); text.hide(); position.hide();\n            break;\n        case '1':\n            logo.show(); text.hide(); position.show();\n            break;\n        case '2':\n            logo.hide(); text.show(); position.show()\n            break;\n        default:\n            return;\n    }\n});\n\n// On select size-color\n$(selector.SELECT__SIZE).on('change', function(event) {\n    const variantOption = CartItem.getVariantOption( {sizeId: CartItem.getSizeId()} )\n    const variantId = variantOption.val()\n    const price = variantOption.data('price')\n    CartItem.setColorValue( variantOption.data('color_id') )\n    CartItem.setVariantValue(variantId)\n    reRenderer.reRenderPrice(price)\n    console.log('variantId :>> ', variantId);\n})\n\n$(selector.INPUT__COLOR).on('change', function(event) {\n    const variantOption = CartItem.getVariantOption( {colorId: CartItem.getColorId()} )\n    const variantId = variantOption.val()\n    const price = variantOption.data('price')\n    const src = $(this).find('~div img').attr('src')\n    CartItem.setSizeValue( variantOption.data('size_id') )\n    CartItem.setVariantValue(variantId)\n    reRenderer.reRenderPrice(price)\n    console.log('variantId :>> ', variantId);\n    $(`.product__thumb.nice-scroll .pt img[src=\"${src}\"]`)[0].click()\n})\n\n//# sourceURL=webpack://webpack/./src/product-detail/on-select.js?");

/***/ }),

/***/ "./src/product-detail/on-submit.js":
/*!*****************************************!*\
  !*** ./src/product-detail/on-submit.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { selector, value, name } = __webpack_require__(/*! ./constant */ \"./src/product-detail/constant.js\")\nconst { STRING } = __webpack_require__(/*! ../common/string */ \"./src/common/string.js\")\nconst { animator } = __webpack_require__(/*! ../util */ \"./src/util/index.js\")\nconst modal = __webpack_require__(/*! ../common/modal */ \"./src/common/modal.js\")\n\nfunction validateForm() {\n    switch ($(selector.SELECT__MAIN_LOGO_TEXT).val()) {\n        // logo\n        case value.LOGO_TEXT__TYPE_LOGO: {\n            if ( $(`input[name=\"${name.NAME__MAIN_LOGO}\"]:checked`).length === 0 ) {\n                animator.scrollToElement($(selector.SELECT__MAIN_LOGO_TEXT))\n                modal.showModal(STRING.Require_choose_main_logo)\n                return false\n            }\n            break\n        } \n\n        // text\n        case value.LOGO_TEXT__TYPE_TEXT: {\n            if ( $(selector.INPUT__MAIN_TEXT_VALUE).val().length === 0 ) {\n                $(selector.INPUT__MAIN_TEXT_VALUE)\n                animator.scrollToElement($(selector.SELECT__MAIN_LOGO_TEXT))\n                \n                modal.showModal(STRING.Require_main_text_value, STRING.Form_not_valid_title, () => {\n                    $(selector.INPUT__MAIN_TEXT_VALUE).focus()\n                })\n\n                return false\n            }\n            break\n        }\n    }\n    \n\n    switch ($(selector.SELECT__ADDITIONAL_LOGO_TEXT).val()) {\n        // logo\n        case value.LOGO_TEXT__TYPE_LOGO: {\n            if ( $(`input[name=\"${name.NAME__ADDITIONAL_LOGO}\"]:checked`).length === 0 ) {\n                animator.scrollToElement($(selector.SELECT__ADDITIONAL_LOGO_TEXT))\n                modal.showModal(STRING.Require_choose_additional_logo, STRING.Form_not_valid_title)\n                return false\n            }\n            break\n        } \n\n        // text\n        case value.LOGO_TEXT__TYPE_TEXT: {\n            if ( $(selector.INPUT__ADDITIONAL_TEXT_VALUE).val().length === 0 ) {\n                animator.scrollToElement($(selector.SELECT__ADDITIONAL_LOGO_TEXT))\n                modal.showModal(STRING.Require_additional_text_value, STRING.Form_not_valid_title, () => {\n                    $(selector.INPUT__ADDITIONAL_TEXT_VALUE).focus()\n                })\n                return false\n            }\n            break\n        }\n    }\n\n    if ($(selector.SELECT__ADDITIONAL_LOGO_TEXT).val() != value.LOGO_TEXT__TYPE_NONE) {\n        if ( $(selector.INPUT__ADDITIONAL_LOGO_TEXT__POSITIONS + ':checked').length === 0 ) {\n            animator.scrollToElement($(selector.INPUT__ADDITIONAL_LOGO_TEXT__POSITIONS))\n            modal.showModal(STRING.Require_additional_positions, STRING.Form_not_valid_title)\n            return false\n        }\n    }\n\n    if ($(selector.SELECT__ADDITIONAL_NAME).val() != '0') {\n        if ( $(selector.INPUT__ADDITIONAL_NAME).val().length === 0 ) {\n            animator.scrollToElement($(selector.INPUT__ADDITIONAL_NAME))\n            modal.showModal(STRING.Require_name_value, STRING.Form_not_valid_title)\n            return false\n        }\n        if ( $(selector.INPUT__ADDITIONAL_NAME__POSITIONS + ':checked').length === 0 ) {\n            animator.scrollToElement($(selector.INPUT__ADDITIONAL_NAME__POSITIONS))\n            modal.showModal(STRING.Require_name_positions, STRING.Form_not_valid_title)\n            return false\n        }  \n    }\n\n    return true\n}\n\n$('#add-cart').on('submit', function(event, loggedIn, csrf_token) {\n    event.preventDefault();\n    const url = $(this).attr('action')\n    const dataArray = $(this).serializeArray()\n    const formData = new FormData(document.querySelector('#add-cart'))\n\n    if (csrf_token) {\n        formData.set('csrfmiddlewaretoken', csrf_token)\n    }\n\n    isFormValid = validateForm()\n    if ( !isFormValid ) {\n        return\n    }\n\n    if (!loggedIn) {\n        if (!isAuth) {\n            const modalLogin = $('#modal-login')\n            const modalSignup = $('#modal-signup')\n            modalLogin.find('.fail-message').html('Please login to continue!')\n            modalLogin.modal({backdrop: 'static', keyboard: false, show: true})  \n            modalSignup.modal({backdrop: 'static', keyboard: false, show: false})  \n            return\n        }\n    }\n\n    $.ajax({\n        url,\n        data: formData,\n        processData: false,\n        contentType: false,\n        type: \"POST\",\n        success: function (data) {\n            modal.showModal('Added item to cart', 'Success')\n            $('#main-modal').on('hidden.bs.modal', function () {\n                window.location.reload()\n            });\n            console.log(`Post success ${url}\\nData: ${JSON.stringify(data, null, 4)}`)\n        },\n        error: function (XMLHttpRequest, textStatus, errorThrown) {\n            modal.showModal('Something went wrong... Please try again later!', 'Error')\n            console.log(`Post error ${url}\\nStatus: ${textStatus}\\nError: ${errorThrown}`)\n        },\n    });\n});\n\n//# sourceURL=webpack://webpack/./src/product-detail/on-submit.js?");

/***/ }),

/***/ "./src/product-detail/on-upload.js":
/*!*****************************************!*\
  !*** ./src/product-detail/on-upload.js ***!
  \*****************************************/
/***/ (() => {

eval("$('.file-upload__input').on('change', function (event) {\n    const val = $(this).val()\n    const files = $(this).prop('files')\n    if (files.length === 0) { return }\n    const file = files[0]\n    if (!file && file[\"type\"].split(\"/\")[0] !== \"image\") {\n        alert('File is not type of image')\n    }\n    \n    const root = $(this).closest('.logo-option')\n    const filePreview = root.find('.file-preview')\n    const img = filePreview.find('img')\n    const blob = URL.createObjectURL(file);\n    img.attr(\"src\", blob)\n    img.show()\n    filePreview.show()\n    \n    root.find('input').prop('checked', true);\n});\n\n//# sourceURL=webpack://webpack/./src/product-detail/on-upload.js?");

/***/ }),

/***/ "./src/product-detail/re-render.js":
/*!*****************************************!*\
  !*** ./src/product-detail/re-render.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"reRenderPrice\": () => (/* binding */ reRenderPrice)\n/* harmony export */ });\nconst { CURRENCY_SYMBOL } = __webpack_require__(/*! ../common/constant */ \"./src/common/constant.js\");\n\nconst reRenderPrice = function (price) {\n    $('.product-detail__price').text(CURRENCY_SYMBOL+price);\n    $('.product-detail__price span').text(CURRENCY_SYMBOL+price);\n}\n\n//# sourceURL=webpack://webpack/./src/product-detail/re-render.js?");

/***/ }),

/***/ "./src/product-detail/renderer.js":
/*!****************************************!*\
  !*** ./src/product-detail/renderer.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { CURRENCY_SYMBOL } = __webpack_require__(/*! ../common/constant */ \"./src/common/constant.js\")\n\nconsole.log('renderer')\n$(\"[data-price]:not([norender-price])\").each(function (i, element) { \n    let price = $(this).data('price')\n    let text = $(this).text() \n    text += ` (${price + CURRENCY_SYMBOL})`\n    if (parseFloat(price) !== 0) {\n        $(this).text(text)\n    }\n});\n\n\n//# sourceURL=webpack://webpack/./src/product-detail/renderer.js?");

/***/ }),

/***/ "./src/product-detail/show-hide.js":
/*!*****************************************!*\
  !*** ./src/product-detail/show-hide.js ***!
  \*****************************************/
/***/ (() => {

eval("$('.logo-option .expand').on('click', function () {\n    const root = $(this).closest('.logo-option')\n    const columns = root.find('[class^=\"col\"]:not(.file-preview)')\n    root[0].scrollIntoView({ behavior: 'smooth', block: 'start' })\n    if ( $(this).hasClass('expand--show') ) {\n        $(this).text('Hide all')\n        columns.each(function (i, column) { \n            $(column).show(200)\n        });\n        $(this).removeClass('expand--show').addClass('expand--hide');\n    } else {\n        $(this).text('Show all')\n        columns.each(function (i, column) { \n            if (i > 5) {\n                $(column).hide(200)\n            }\n        });\n        $(this).removeClass('expand--hide').addClass('expand--show');\n    }\n});\n\n//# sourceURL=webpack://webpack/./src/product-detail/show-hide.js?");

/***/ }),

/***/ "./src/product-detail/update-summary.js":
/*!**********************************************!*\
  !*** ./src/product-detail/update-summary.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ \"./src/product-detail/constant.js\");\n/* harmony import */ var _common_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/constant */ \"./src/common/constant.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ \"./src/util/index.js\");\n/* harmony import */ var _util_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/parser */ \"./src/util/parser.js\");\n/* harmony import */ var _voucher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../voucher */ \"./src/voucher/index.js\");\n/* harmony import */ var _cart_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart-item */ \"./src/product-detail/cart-item.js\");\n\n\n\n\n\n\n\n\n;(async() => {\n    const data = await (0,_voucher__WEBPACK_IMPORTED_MODULE_4__.getVouchers)('cart_item');\n    const vouchers = data.reduce(function(prev, voucher) {\n        prev.push(new _voucher__WEBPACK_IMPORTED_MODULE_4__.CartItemVoucher(voucher))\n        return prev\n    }, [])\n    console.log('vouchers :>> ', vouchers);\n\n    update({vouchers})\n    $('select, input').on('change', function() {\n        update({vouchers})\n    })\n})()\n\n\nfunction update(params) {\n    // Reset data-price\n    $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ROOT + ' .value').each(function() {\n        $(this).data('price', _common_constant__WEBPACK_IMPORTED_MODULE_1__.__.ZERO_PRICE)\n    })\n\n    updateVariant()\n\n    showHideLogoText()\n    showHideAdditionalPosition()\n    showHideAdditionalName()\n\n    updateMainPosition()\n    updatePositionInput()\n    updateAdditionalNameValue()\n\n    updateVoucher(params.vouchers)\n    updateTotalPrice()\n}\n\n\nfunction updateTotalPrice() {\n    const [title, value] = _getTitleValueElemet($(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__TOTAL_PRICE))\n\n    // Before\n    let eachItemPrice = 0\n    $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ROOT + ` .summary__item:not(${_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__TOTAL_PRICE}) .value`).each(function() {\n        let price = $(this).data('price')\n        if (price) {\n            eachItemPrice += parseFloat(price)\n        }\n    })\n    const allItemPrice = (0,_util_parser__WEBPACK_IMPORTED_MODULE_3__.toMoney)(eachItemPrice * _cart_item__WEBPACK_IMPORTED_MODULE_5__.CartItem.getQuantity())\n    // _setValue(value, toMoneyString(allItemPrice), allItemPrice)\n\n    let eachItemPrice_After = 0\n    $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ROOT + ` .summary__item:not(${_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__TOTAL_PRICE}) .value`).each(function() {\n        let price = $(this).data('price-after')\n        if (!price) { price = $(this).data('price') }\n        if (price) {\n            eachItemPrice_After += parseFloat(price)\n        }\n    })\n    const allItemPrice_After = (0,_util_parser__WEBPACK_IMPORTED_MODULE_3__.toMoney)(eachItemPrice_After * _cart_item__WEBPACK_IMPORTED_MODULE_5__.CartItem.getQuantity())\n\n    if (allItemPrice_After !== allItemPrice) {\n        value.html(`<span class=\"price-before\">${(0,_util_parser__WEBPACK_IMPORTED_MODULE_3__.toMoneyString)(allItemPrice)}</span><span class=\"price-after\">${(0,_util_parser__WEBPACK_IMPORTED_MODULE_3__.toMoneyString)(allItemPrice_After)}</span>`)\n    } else {\n        _setValue(value, (0,_util_parser__WEBPACK_IMPORTED_MODULE_3__.toMoneyString)(allItemPrice), allItemPrice)\n    }\n    value.html()\n}\n\nfunction updateVoucher(vouchers) {\n    const summary = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__VOUCHER)\n    const [title, value] = _getTitleValueElemet(summary)\n    value.empty()\n    summary.hide()\n\n    $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ROOT + ` .summary__item:not(${_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__TOTAL_PRICE}) .value`).each(function() {\n        $(this).removeData('price-after')\n    })\n\n    for (const voucher of vouchers) {\n        if (voucher.isValid()) {\n            voucher.doDiscount()\n            value.append( `<div>${voucher.name}</div>` )\n            summary.show()\n        }\n    }\n}\n\n\nfunction updateVariant(params) {\n    const summaryVariant = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__VARIANT)\n    const summarySize = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__SIZE)\n    const summaryColor = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__COLOR)\n    const selectedVariant = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__VARIANT + ' option:checked')\n\n    const variantTitle = (0,_util_parser__WEBPACK_IMPORTED_MODULE_3__.toMoneyString)(selectedVariant.data('price'))\n    const sizeTitle = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__SIZE + ` option[value=\"${ selectedVariant.data('size_id') }\"]`).text()\n    const colorTitle = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.INPUT__COLOR + `[value=\"${ selectedVariant.data('color_id') }\"] ~ div label`).attr('title')\n\n    const varaintPrice = selectedVariant.data('price')\n    _setValue(summaryVariant.find('.value'), variantTitle, varaintPrice)\n    _setValue(summarySize.find('.value'), sizeTitle, _common_constant__WEBPACK_IMPORTED_MODULE_1__.__.ZERO_PRICE)\n    _setValue(summaryColor.find('.value'), colorTitle, _common_constant__WEBPACK_IMPORTED_MODULE_1__.__.ZERO_PRICE)\n}\n\n\nfunction showHideLogoText() {\n    $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__LOGO_TEXT).each(function (i, element) { \n        const summary = '#' + $(this).attr('id') === _constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__MAIN_LOGO_TEXT ? $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__MAIN_LOGO_TEXT)\n            : '#' + $(this).attr('id') === _constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__ADDITIONAL_LOGO_TEXT ? $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ADDITIONAL_LOGO_TEXT)\n            : null\n        const [ title, value ] = _getTitleValueElemet(summary)\n        const option = $(this).find(`option[value=\"${ $(this).val() }\"]`)\n        const optionContainer = option.closest('.product-option')\n\n        if (option.val() === '0') { \n            summary.closest('.summary__container').hide()\n            return\n        } else {\n            summary.closest('.summary__container').show()\n        }\n\n        let optionText = option.text()\n\n        optionText = optionText.replace(/ *\\([^)]*\\) */g, \"\").trim();\n        optionText = '#' + $(this).attr('id') === _constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__ADDITIONAL_LOGO_TEXT ? 'Additional ' + optionText.toLowerCase() \n            : optionText\n\n\n        title.text(optionText)\n\n        switch (option.val()) {\n            case '1':\n                const checkedInput = optionContainer.find('input.logo__input:checked')\n                const checkedImage = optionContainer.find('input.logo__input:checked ~ label img')\n                const imageURI = checkedImage.attr('src')\n                if (imageURI) {\n                    value.html(`<img src=\"${imageURI}\" style=\"height: 64px\" />`)\n                    if (checkedInput.attr('setup') === undefined) {\n                        const priceText = ` (${_util__WEBPACK_IMPORTED_MODULE_2__.parser.toMoneyString(option.data('price'))})`\n                        title.text(title.text() + priceText)\n                    }\n                }\n                break;\n        \n            case '2':\n                const textInput = optionContainer.find('.text-input')\n                value.text(textInput.val())\n                break;\n            }\n        \n        _setValue(value, '', _common_constant__WEBPACK_IMPORTED_MODULE_1__.__.ZERO_PRICE)\n    });\n}\n\n\nfunction updateMainPosition() {\n    const [ title, value ] = _getTitleValueElemet( $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__MAIN_POSITION) )\n    const option = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__MAIN_POSITION).find(`option[value=\"${ $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__MAIN_POSITION).val() }\"]`)\n    var optionText = option.text().trim()\n    \n    _setValue(value, optionText, option.data('price'))\n}\n\n\nfunction showHideAdditionalPosition(params) {\n    const summary = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__MAIN_ADDITIONAL_POSITIONS)\n    switch ( $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__ADDITIONAL_POSITION).val() ) {\n        case '0':\n            summary.hide()\n            break;\n        case '1':\n            summary.show()\n            break;\n        default:\n            return\n    }\n}\n\n\nfunction __inputPositionHandler(element, summary, triggers, isTrigger=true) {\n    const [ title, value ] = _getTitleValueElemet(summary)\n    const checkedOption = $( `input[name=\"${ element.attr('name') }\"]:checked` )\n    const elements = checkedOption.toArray().reduce(function(prev, curr) {\n        prev.push( '<div>' + $(curr).find('~ label').text() + '</div>' )\n        return prev\n    }, [])\n    const raw_html = elements.join('')\n    _setValue(value, raw_html, checkedOption.data('price'), { innerType: 'html' })\n}\nfunction updatePositionInput(params) {\n    __inputPositionHandler($(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.INPUT__ADDITIONAL_POSITIONS), $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__MAIN_ADDITIONAL_POSITIONS))\n    __inputPositionHandler($(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.INPUT__ADDITIONAL_LOGO_TEXT__POSITIONS), $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ADDITIONAL_LOGO_TEXT_POSITIONS))\n    __inputPositionHandler($(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.INPUT__ADDITIONAL_NAME__POSITIONS), $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ADDITIONAL_NAME_POSITIONS))\n}\n\n\nfunction showHideAdditionalName() {\n    const summaryContainer = $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ADDITIONAL_NAME).closest('.summary__container')\n    switch ( $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SELECT__ADDITIONAL_NAME).val() ) {\n        case '0':\n            summaryContainer.hide()\n            break;\n        case '1':\n            summaryContainer.show()\n            break;\n        default:\n            break;\n    }\n}\n\n\nfunction updateAdditionalNameValue() {\n    const [ title, value ] = _getTitleValueElemet( $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.SUMMARY__ADDITIONAL_NAME) )\n    _setValue(value, $(_constant__WEBPACK_IMPORTED_MODULE_0__.selector.INPUT__ADDITIONAL_NAME).val(), _common_constant__WEBPACK_IMPORTED_MODULE_1__.__.ZERO_PRICE)\n}\n\n\nfunction _getTitleValueElemet(element) { \n    return [\n        element.find('.title'),\n        element.find('.value')\n    ] \n}\n\nfunction _setValue($value, text, price, params={}) {\n    const innerType = params.innerType || 'text'\n    $value.data('price', price)\n    if (text) {\n        $value[innerType](text)\n    }\n}\n\n\n\n//# sourceURL=webpack://webpack/./src/product-detail/update-summary.js?");

/***/ }),

/***/ "./src/product-detail/util.js":
/*!************************************!*\
  !*** ./src/product-detail/util.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProductOptionRoot\": () => (/* binding */ getProductOptionRoot)\n/* harmony export */ });\nconst getProductOptionRoot = function(element) { return element.closest('.product-option') }\n\n//# sourceURL=webpack://webpack/./src/product-detail/util.js?");

/***/ }),

/***/ "./src/util/animator.js":
/*!******************************!*\
  !*** ./src/util/animator.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"scrollToElement\": () => (/* binding */ scrollToElement)\n/* harmony export */ });\nconst scrollToElement = function($element, timeout=600, padding=64) {\n    \n    $([document.documentElement, document.body]).animate({\n        scrollTop: $element.offset().top - padding\n    }, timeout);\n}\n\n//# sourceURL=webpack://webpack/./src/util/animator.js?");

/***/ }),

/***/ "./src/util/getter.js":
/*!****************************!*\
  !*** ./src/util/getter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCSRFmiddlewaretoken\": () => (/* binding */ getCSRFmiddlewaretoken)\n/* harmony export */ });\nconst getCSRFmiddlewaretoken = function() {\n    return document.querySelector(\n        `input[name=\"csrfmiddlewaretoken\"]`\n    ).value;\n}\n\n//# sourceURL=webpack://webpack/./src/util/getter.js?");

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"animator\": () => (/* binding */ animator),\n/* harmony export */   \"getter\": () => (/* binding */ getter),\n/* harmony export */   \"parser\": () => (/* binding */ parser)\n/* harmony export */ });\nconst getter = __webpack_require__(/*! ./getter */ \"./src/util/getter.js\")\nconst parser = __webpack_require__(/*! ./parser */ \"./src/util/parser.js\")\nconst animator = __webpack_require__(/*! ./animator */ \"./src/util/animator.js\")\n\n//# sourceURL=webpack://webpack/./src/util/index.js?");

/***/ }),

/***/ "./src/util/parser.js":
/*!****************************!*\
  !*** ./src/util/parser.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toMoney\": () => (/* binding */ toMoney),\n/* harmony export */   \"toMoneyString\": () => (/* binding */ toMoneyString)\n/* harmony export */ });\n/* harmony import */ var _common_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constant */ \"./src/common/constant.js\");\n\n\nconst toMoneyString = function(num) { return (Math.round(parseFloat(num) * 100) / 100).toFixed(2).toString() + _common_constant__WEBPACK_IMPORTED_MODULE_0__.CURRENCY_SYMBOL; }\nconst toMoney = function(num) { return (Math.round(parseFloat(num) * 100) / 100).toFixed(2)}\n\n//# sourceURL=webpack://webpack/./src/util/parser.js?");

/***/ }),

/***/ "./src/voucher/index.js":
/*!******************************!*\
  !*** ./src/voucher/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CartItemVoucher\": () => (/* binding */ CartItemVoucher),\n/* harmony export */   \"CartVoucher\": () => (/* binding */ CartVoucher),\n/* harmony export */   \"getVouchers\": () => (/* binding */ getVouchers)\n/* harmony export */ });\n/* harmony import */ var _product_detail_cart_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../product-detail/cart-item */ \"./src/product-detail/cart-item.js\");\n/* harmony import */ var _cart_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cart/cart */ \"./src/cart/cart.js\");\n/* harmony import */ var _product_detail_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../product-detail/constant */ \"./src/product-detail/constant.js\");\n/* harmony import */ var _common_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/constant */ \"./src/common/constant.js\");\n/* harmony import */ var _util_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/parser */ \"./src/util/parser.js\");\n\n\n\n\n\n\n\nclass BaseVoucher {\n    constructor(params) {\n        Object.assign(this, params)\n    }\n\n    isValid(params) {}\n    discount() {}\n}\n\nclass CartItemVoucher extends BaseVoucher {\n    isValid(params) {\n        const condition = this.condition\n        const now = new Date().toISOString()\n        if ( this.start_at > now || (now > this.expired_at) ) { return false }\n        if ( condition.quantity_min && _product_detail_cart_item__WEBPACK_IMPORTED_MODULE_0__.CartItem.getQuantity() < condition.quantity_min ) { return false }\n        if ( condition.quantity_max && _product_detail_cart_item__WEBPACK_IMPORTED_MODULE_0__.CartItem.getQuantity() > condition.quantity_max ) { return false }\n        return true\n    }\n\n    doDiscount() {\n        const discount = this.discount\n        const discountValue = parseFloat(discount.value)\n        let priceBefore, priceAfter, discountTotal, $summary\n\n        if (discount.for_field === _common_constant__WEBPACK_IMPORTED_MODULE_3__.__.VOUCHER.FOR_FIELD__EACH_ITEM) {\n            $summary = $(_product_detail_constant__WEBPACK_IMPORTED_MODULE_2__.selector.SUMMARY__VARIANT)\n        } else {\n            // ...\n        }\n        priceBefore = (0,_util_parser__WEBPACK_IMPORTED_MODULE_4__.toMoney)( $summary.find('.value').data('price') )\n\n        discountTotal = discount.by_percent ? priceBefore * discountValue / 100 : discountValue\n        priceAfter = priceBefore - discountTotal\n\n        $summary.find('.value').data('price-after', priceAfter)\n\n        return { name: this.name }\n    }\n}\n\n\nclass CartVoucher extends BaseVoucher {\n    isValid(params) {\n        const condition = this.condition\n        const now = new Date().toISOString()\n        if ( this.start_at > now || (now > this.expired_at) ) { return false }\n        if ( condition.cart_subtotal_min && _cart_cart__WEBPACK_IMPORTED_MODULE_1__.Cart.getSubtotal() < parseFloat(condition.cart_subtotal_min) ) { return false }\n        if ( condition.cart_subtotal_max && _cart_cart__WEBPACK_IMPORTED_MODULE_1__.Cart.getSubtotal() > parseFloat(condition.cart_subtotal_max) ) { return false }\n        return true\n    }\n\n    doDiscount() {\n        const discount = this.discount\n        const discountValue = parseFloat(discount.value)\n        let priceBefore, priceAfter, discountTotal, prop\n        if (discount.for_field === _common_constant__WEBPACK_IMPORTED_MODULE_3__.__.VOUCHER.FOR_FIELD__DELIVERY_FEE) {\n            priceBefore = Fee.delivery_fee.before\n            prop = 'delivery_fee'\n        } else if (discount.for_field === _common_constant__WEBPACK_IMPORTED_MODULE_3__.__.VOUCHER.FOR_FIELD__LOGO_TEXT_FEE){\n            priceBefore = Fee.logo_fee.before\n            prop = 'logo_fee'\n        }\n        discountTotal = discount.by_percent ? priceBefore * discountValue / 100 : discountValue\n        priceAfter = priceBefore - discountTotal\n        Fee[prop].after = priceAfter\n        return { name: this.name }\n    }\n}\n\nconst getVouchers = function(context) {\n    return new Promise((resolve, reject) => {\n        try {\n            $.get(`/voucher/get_vouchers?context=${context}`, function(data, status){\n                resolve(data)\n            });\n        } catch (error) {\n            reject(error);\n        }\n    });   \n}\n\n//# sourceURL=webpack://webpack/./src/voucher/index.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/product-detail/index.js");
/******/ 	
/******/ })()
;