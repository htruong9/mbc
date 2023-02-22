import { selector, value } from "./constant";
import { __ } from "../common/constant";
import {parser } from "../util";
import { toMoney, toMoneyString } from "../util/parser";
import { CartItemVoucher, getVouchers } from "../voucher";
import { CartItem } from "./cart-item";


;(async() => {
    const data = await getVouchers('cart_item');
    const vouchers = data.reduce(function(prev, voucher) {
        prev.push(new CartItemVoucher(voucher))
        return prev
    }, [])
    console.log('vouchers :>> ', vouchers);

    update({vouchers})
    $('select, input').on('change', function() {
        update({vouchers})
    })
})()


function update(params) {
    // Reset data-price
    $(selector.SUMMARY__ROOT + ' .value').each(function() {
        $(this).data('price', __.ZERO_PRICE)
    })

    updateVariant()

    showHideLogoText()
    showHideAdditionalPosition()
    showHideAdditionalName()

    updateMainPosition()
    updatePositionInput()
    updateAdditionalNameValue()

    updateVoucher(params.vouchers)
    updateTotalPrice()
}


function updateTotalPrice() {
    const [title, value] = _getTitleValueElemet($(selector.SUMMARY__TOTAL_PRICE))

    // Before
    let eachItemPrice = 0
    $(selector.SUMMARY__ROOT + ` .summary__item:not(${selector.SUMMARY__TOTAL_PRICE}) .value`).each(function() {
        let price = $(this).data('price')
        if (price) {
            eachItemPrice += parseFloat(price)
        }
    })
    const allItemPrice = toMoney(eachItemPrice * CartItem.getQuantity())
    // _setValue(value, toMoneyString(allItemPrice), allItemPrice)

    let eachItemPrice_After = 0
    $(selector.SUMMARY__ROOT + ` .summary__item:not(${selector.SUMMARY__TOTAL_PRICE}) .value`).each(function() {
        let price = $(this).data('price-after')
        if (!price) { price = $(this).data('price') }
        if (price) {
            eachItemPrice_After += parseFloat(price)
        }
    })
    const allItemPrice_After = toMoney(eachItemPrice_After * CartItem.getQuantity())

    if (allItemPrice_After !== allItemPrice) {
        value.html(`<span class="price-before">${toMoneyString(allItemPrice)}</span><span class="price-after">${toMoneyString(allItemPrice_After)}</span>`)
    } else {
        _setValue(value, toMoneyString(allItemPrice), allItemPrice)
    }
    value.html()
}

function updateVoucher(vouchers) {
    const summary = $(selector.SUMMARY__VOUCHER)
    const [title, value] = _getTitleValueElemet(summary)
    value.empty()
    summary.hide()

    $(selector.SUMMARY__ROOT + ` .summary__item:not(${selector.SUMMARY__TOTAL_PRICE}) .value`).each(function() {
        $(this).removeData('price-after')
    })

    for (const voucher of vouchers) {
        if (voucher.isValid()) {
            voucher.doDiscount()
            value.append( `<div>${voucher.name}</div>` )
            summary.show()
        }
    }
}


function updateVariant(params) {
    const summaryVariant = $(selector.SUMMARY__VARIANT)
    const summarySize = $(selector.SUMMARY__SIZE)
    const summaryColor = $(selector.SUMMARY__COLOR)
    const selectedVariant = $(selector.SELECT__VARIANT + ' option:checked')

    const variantTitle = toMoneyString(selectedVariant.data('price'))
    const sizeTitle = $(selector.SELECT__SIZE + ` option[value="${ selectedVariant.data('size_id') }"]`).text()
    const colorTitle = $(selector.INPUT__COLOR + `[value="${ selectedVariant.data('color_id') }"] ~ div label`).attr('title')

    const varaintPrice = selectedVariant.data('price')
    _setValue(summaryVariant.find('.value'), variantTitle, varaintPrice)
    _setValue(summarySize.find('.value'), sizeTitle, __.ZERO_PRICE)
    _setValue(summaryColor.find('.value'), colorTitle, __.ZERO_PRICE)
}


function showHideLogoText() {
    $(selector.SELECT__LOGO_TEXT).each(function (i, element) { 
        const summary = '#' + $(this).attr('id') === selector.SELECT__MAIN_LOGO_TEXT ? $(selector.SUMMARY__MAIN_LOGO_TEXT)
            : '#' + $(this).attr('id') === selector.SELECT__ADDITIONAL_LOGO_TEXT ? $(selector.SUMMARY__ADDITIONAL_LOGO_TEXT)
            : null
        const [ title, value ] = _getTitleValueElemet(summary)
        const option = $(this).find(`option[value="${ $(this).val() }"]`)
        const optionContainer = option.closest('.product-option')

        if (option.val() === '0') { 
            summary.closest('.summary__container').hide()
            return
        } else {
            summary.closest('.summary__container').show()
        }

        let optionText = option.text()

        optionText = optionText.replace(/ *\([^)]*\) */g, "").trim();
        optionText = '#' + $(this).attr('id') === selector.SELECT__ADDITIONAL_LOGO_TEXT ? 'Additional ' + optionText.toLowerCase() 
            : optionText


        title.text(optionText)

        switch (option.val()) {
            case '1':
                const checkedInput = optionContainer.find('input.logo__input:checked')
                const checkedImage = optionContainer.find('input.logo__input:checked ~ label img')
                const imageURI = checkedImage.attr('src')
                if (imageURI) {
                    value.html(`<img src="${imageURI}" style="height: 64px" />`)
                    if (checkedInput.attr('setup') === undefined) {
                        const priceText = ` (${parser.toMoneyString(option.data('price'))})`
                        title.text(title.text() + priceText)
                    }
                }
                break;
        
            case '2':
                const textInput = optionContainer.find('.text-input')
                value.text(textInput.val())
                break;
            }
        
        _setValue(value, '', __.ZERO_PRICE)
    });
}


function updateMainPosition() {
    const [ title, value ] = _getTitleValueElemet( $(selector.SUMMARY__MAIN_POSITION) )
    const option = $(selector.SELECT__MAIN_POSITION).find(`option[value="${ $(selector.SELECT__MAIN_POSITION).val() }"]`)
    var optionText = option.text().trim()
    
    _setValue(value, optionText, option.data('price'))
}


function showHideAdditionalPosition(params) {
    const summary = $(selector.SUMMARY__MAIN_ADDITIONAL_POSITIONS)
    switch ( $(selector.SELECT__ADDITIONAL_POSITION).val() ) {
        case '0':
            summary.hide()
            break;
        case '1':
            summary.show()
            break;
        default:
            return
    }
}


function __inputPositionHandler(element, summary, triggers, isTrigger=true) {
    const [ title, value ] = _getTitleValueElemet(summary)
    const checkedOption = $( `input[name="${ element.attr('name') }"]:checked` )
    const elements = checkedOption.toArray().reduce(function(prev, curr) {
        prev.push( '<div>' + $(curr).find('~ label').text() + '</div>' )
        return prev
    }, [])
    const raw_html = elements.join('')
    _setValue(value, raw_html, checkedOption.data('price'), { innerType: 'html' })
}
function updatePositionInput(params) {
    __inputPositionHandler($(selector.INPUT__ADDITIONAL_POSITIONS), $(selector.SUMMARY__MAIN_ADDITIONAL_POSITIONS))
    __inputPositionHandler($(selector.INPUT__ADDITIONAL_LOGO_TEXT__POSITIONS), $(selector.SUMMARY__ADDITIONAL_LOGO_TEXT_POSITIONS))
    __inputPositionHandler($(selector.INPUT__ADDITIONAL_NAME__POSITIONS), $(selector.SUMMARY__ADDITIONAL_NAME_POSITIONS))
}


function showHideAdditionalName() {
    const summaryContainer = $(selector.SUMMARY__ADDITIONAL_NAME).closest('.summary__container')
    switch ( $(selector.SELECT__ADDITIONAL_NAME).val() ) {
        case '0':
            summaryContainer.hide()
            break;
        case '1':
            summaryContainer.show()
            break;
        default:
            break;
    }
}


function updateAdditionalNameValue() {
    const [ title, value ] = _getTitleValueElemet( $(selector.SUMMARY__ADDITIONAL_NAME) )
    _setValue(value, $(selector.INPUT__ADDITIONAL_NAME).val(), __.ZERO_PRICE)
}


function _getTitleValueElemet(element) { 
    return [
        element.find('.title'),
        element.find('.value')
    ] 
}

function _setValue($value, text, price, params={}) {
    const innerType = params.innerType || 'text'
    $value.data('price', price)
    if (text) {
        $value[innerType](text)
    }
}

