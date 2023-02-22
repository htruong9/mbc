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

/***/ "./src/cart/cart-total.js":
/*!********************************!*\
  !*** ./src/cart/cart-total.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Cart  } = __webpack_require__(/*! ./cart */ \"./src/cart/cart.js\")\n\n\n;(() => {\n    $('input[name=\"cart_id\"]').on('change', () => {\n        Cart.render()\n    })\n    Cart.render()\n})()\n\n//# sourceURL=webpack://webpack/./src/cart/cart-total.js?");

/***/ }),

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

/***/ "./src/cart/delete.js":
/*!****************************!*\
  !*** ./src/cart/delete.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const modal = __webpack_require__(/*! ../common/modal */ \"./src/common/modal.js\")\n\n\nfunction deleteCartItem(id) {\n    $.ajax({\n        url: '/cart/remove_cart',\n        type: 'POST',\n        data: {\n            csrfmiddlewaretoken,\n            cart_item_id: id\n        },\n        success: function(result) {\n            if (result.is_deleted) {\n                console.log('Deleted: ', result.cart_item_id);\n                $(`.cart-item[data-id=\"${result.cart_item_id}\"]`).remove()\n            } else {\n                console.log('result :>> ', result);\n            }\n        },\n        error: function (xhr, ajaxOptions, thrownError) {\n            alert(xhr.status);\n            alert(thrownError);\n        }\n    })\n    .fail(function (jqXHR, textStatus, error) {\n        console.error(`Ajax fail: ${jqXHR.responseText}`)\n        console.error(error)\n    });\n}\n\n\nfunction confirmDeleteCartItem(id) { \n    buttons = jQuery('<div></div>')\n    buttonClose = jQuery('<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\"> Close </button>')\n    buttonConfirm = jQuery('<button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\"> Delete </button>')\n    buttonConfirm.on('click', () => {\n        deleteCartItem(id)\n    })\n\n    modal.showModal('Are you sure you want to delete this cart item?', 'Confirm', [buttonClose, buttonConfirm]) \n}\n\nwindow.confirmDeleteCartItem = confirmDeleteCartItem\n\n//# sourceURL=webpack://webpack/./src/cart/delete.js?");

/***/ }),

/***/ "./src/cart/index.js":
/*!***************************!*\
  !*** ./src/cart/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("window.addEventListener('load', function() { \n    __webpack_require__(/*! ./on-change */ \"./src/cart/on-change.js\")\n    __webpack_require__(/*! ./delete */ \"./src/cart/delete.js\")\n    __webpack_require__(/*! ./cart-total */ \"./src/cart/cart-total.js\")\n    __webpack_require__(/*! ./on-checkout */ \"./src/cart/on-checkout.js\")\n    __webpack_require__(/*! ./on-checkbox */ \"./src/cart/on-checkbox.js\")\n})\n\n//# sourceURL=webpack://webpack/./src/cart/index.js?");

/***/ }),

/***/ "./src/cart/on-change.js":
/*!*******************************!*\
  !*** ./src/cart/on-change.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { updateCart } = __webpack_require__(/*! ./update */ \"./src/cart/update.js\")\n\n$('.cart__quantity input').on('change', function() {\n    const newValue = parseInt($(this).parent().find('input').val())\n    data = [{\n        id: $(this).closest('.cart-item').data('id'),\n        field: \"quantity\",\n        new_value: newValue\n    }]\n    console.log('data :>> ', data);\n    updateCart(data, true)\n})\n\n//# sourceURL=webpack://webpack/./src/cart/on-change.js?");

/***/ }),

/***/ "./src/cart/on-checkbox.js":
/*!*********************************!*\
  !*** ./src/cart/on-checkbox.js ***!
  \*********************************/
/***/ (() => {

eval("$('#select-all').on('change', function() {\n    $('[name=\"cart_id\"]').prop('checked', this.checked);\n    // console.log('$(this).val() :>> ', this.checked);\n})\n\n//# sourceURL=webpack://webpack/./src/cart/on-checkbox.js?");

/***/ }),

/***/ "./src/cart/on-checkout.js":
/*!*********************************!*\
  !*** ./src/cart/on-checkout.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { selector, value, name } = __webpack_require__(/*! ./constant */ \"./src/cart/constant.js\")\nconst { STRING } = __webpack_require__(/*! ../common/string */ \"./src/common/string.js\")\nconst { animator } = __webpack_require__(/*! ../util */ \"./src/util/index.js\")\nconst modal = __webpack_require__(/*! ../common/modal */ \"./src/common/modal.js\");\n\n\n\n$('#checkout').on('click', function(event) {\n    event.preventDefault();\n    const form = document.querySelector('#checkout-form')\n    $(form).find('.fail-message').html('')\n    const formData = new FormData(form)\n\n    const url = $(form).attr('action')\n    \n    const cart_items_id = $('[name=\"cart_id\"]:checked')\n        .toArray()\n        .reduce((prev, curr) => {\n            prev.push(curr.dataset.id)\n            return prev\n        }, [])\n\n    if (cart_items_id.length < 1) {\n        modal.showModal('Please select at least 1 cart item')\n        return\n    }\n\n    for (let i = 0; i < cart_items_id.length; i++) {\n        const cart_item = cart_items_id[i];\n        formData.append('cart_items', cart_item)\n    }\n\n\n    $.ajax({\n        url,\n        data: formData,\n        processData: false,\n        contentType: false,\n        type: \"POST\",\n        success: function (data) {\n            if (data.status == 'ok') {\n                window.location.href = data.redirect_uri\n            }\n            else {\n                modal.showModal(data.message, 'Form error')\n            }\n        },\n        error: function (XMLHttpRequest, textStatus, errorThrown) {\n            console.log(`Post error ${url}\\nStatus: ${textStatus}\\nError: ${errorThrown}`)\n\n        },\n    });\n});\n\n//# sourceURL=webpack://webpack/./src/cart/on-checkout.js?");

/***/ }),

/***/ "./src/cart/update.js":
/*!****************************!*\
  !*** ./src/cart/update.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateCart\": () => (/* binding */ updateCart)\n/* harmony export */ });\nconst { getter } = __webpack_require__(/*! ../util */ \"./src/util/index.js\")\n\nconst updateCart = function(data, isRefresh = false) {\n    const csrfmiddlewaretoken = getter.getCSRFmiddlewaretoken()\n    // data: [\n        //     JSON.stringify({\n        //         \"id\": 4,\n        //         \"field\": \"quantity\",\n        //         \"new_value\": 4\n        //     }),\n        //     JSON.stringify({\n        //         \"id\": 4,\n        //         \"field\": \"additional_name__name\",\n        //         \"new_value\": 'bar'\n        //     }),\n        // ]\n    for (var i=0; i<data.length; i++) {\n        data[i] = JSON.stringify(data[i])\n    }\n    $.ajax({\n        url: '/cart/update_cart',\n        type: 'POST',\n        data: {\n            csrfmiddlewaretoken,\n            data\n        },\n        success: function(result) {\n            if (isRefresh) {\n                location.reload()\n            }\n        }\n    });\n}\n\n//# sourceURL=webpack://webpack/./src/cart/update.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/cart/index.js");
/******/ 	
/******/ })()
;