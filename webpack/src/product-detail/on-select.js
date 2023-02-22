const util = require('./util')
const reRenderer = require('./re-render')
const { selector } = require('./constant');
const { CartItem } = require('./cart-item');

// Show/hide option
function selectTrueFalseHandler(event) {
    const choice =  $(this).val() === "1" ? true : false;
    const root = util.getProductOptionRoot( $(this) )
    const optionContainer = root.find('.option-container')
    if (choice) {
        optionContainer.show()
    } else {
        optionContainer.hide()
    }
}
$(selector.SELECT__ADDITIONAL_NAME).on('change', selectTrueFalseHandler);
$(selector.SELECT__ADDITIONAL_POSITION).on('change', selectTrueFalseHandler)

// Show/hide logo_text
$(selector.SELECT__LOGO_TEXT).on('change', function (event) {
    const root = util.getProductOptionRoot( $(this) )
    const optionContainer = root.find('.option-container')
    const logo = optionContainer.find('.logo-option')
    const text = optionContainer.find('.text-option')
    const position = optionContainer.find('.position-option')
    switch ($(this).val()) {
        case '0':
            logo.hide(); text.hide(); position.hide();
            break;
        case '1':
            logo.show(); text.hide(); position.show();
            break;
        case '2':
            logo.hide(); text.show(); position.show()
            break;
        default:
            return;
    }
});

// On select size-color
$(selector.SELECT__SIZE).on('change', function(event) {
    const variantOption = CartItem.getVariantOption( {sizeId: CartItem.getSizeId()} )
    const variantId = variantOption.val()
    const price = variantOption.data('price')
    CartItem.setColorValue( variantOption.data('color_id') )
    CartItem.setVariantValue(variantId)
    reRenderer.reRenderPrice(price)
    console.log('variantId :>> ', variantId);
})

$(selector.INPUT__COLOR).on('change', function(event) {
    const variantOption = CartItem.getVariantOption( {colorId: CartItem.getColorId()} )
    const variantId = variantOption.val()
    const price = variantOption.data('price')
    const src = $(this).find('~div img').attr('src')
    CartItem.setSizeValue( variantOption.data('size_id') )
    CartItem.setVariantValue(variantId)
    reRenderer.reRenderPrice(price)
    console.log('variantId :>> ', variantId);
    $(`.product__thumb.nice-scroll .pt img[src="${src}"]`)[0].click()
})