const { CURRENCY_SYMBOL } = require("../common/constant");

export const reRenderPrice = function (price) {
    $('.product-detail__price').text(CURRENCY_SYMBOL+price);
    $('.product-detail__price span').text(CURRENCY_SYMBOL+price);
}