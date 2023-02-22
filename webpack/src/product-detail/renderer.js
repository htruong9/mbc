const { CURRENCY_SYMBOL } = require('../common/constant')

console.log('renderer')
$("[data-price]:not([norender-price])").each(function (i, element) { 
    let price = $(this).data('price')
    let text = $(this).text() 
    text += ` (${price + CURRENCY_SYMBOL})`
    if (parseFloat(price) !== 0) {
        $(this).text(text)
    }
});
