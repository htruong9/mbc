const cartTotalElement = document.querySelector('.cart__total__procced')
const cartTotalSubtotalElement = cartTotalElement.querySelector('#cart_total__subtotal')
const cartTotalTaxElement = cartTotalElement.querySelector('#cart_total__tax')
const cartTotalDeliveryElement = cartTotalElement.querySelector('#cart_total__delivery')
const cartTotalSetupLogoElement = cartTotalElement.querySelector('#cart_total__setup_logo')
const cartTotalGrandTotalElement = cartTotalElement.querySelector('#cart_total__grand_total')

const checkoutButtonElement = $('#checkout')

function isValidVoucher(voucher, cartItemElement) {
    // console.log('voucher :>> ', voucher);
    // console.log('cartItemElement :>> ', cartItemElement);
    // console.log('\n')

    // Update later
    let condition = voucher.condition
    if (condition.quantity_min || condition.quantity_max) {
        let quantity = parseInt(cartItemElement.data('quantity'))
        if (condition.quantity_min && quantity < condition.quantity_min) { return false }
        if (condition.quantity_max && quantity > condition.quantity_max) { return false }
    }

    console.log('voucher :>> ', voucher);
    console.log('cartItemElement :>> ', cartItemElement);
    // console.log('\n')
    return true
}

window.addEventListener('load', function() {

    // Apply voucher
    $.ajax({
        url: '/voucher/get_vouchers',
        type: 'GET',
        data: {
            csrfmiddlewaretoken,
            'auto_apply': true
        },
        success: function(vouchers) {
            console.log('vouchers :>> ', vouchers);
            $('.cart-item').each(function() {
                vouchers.forEach(voucher => {
                    isValid = isValidVoucher(voucher, $(this))
                    console.log('isValid :>> ', isValid);
                })
                // console.log('this :>> ', $(this).data('each_item_price'));
            })
        }
    });

    // On change quantity
    $('.cart__quantity .pro-qty span').each(function(i) {
        $(this).on('click', function(event) {
            var increaseValue = 1
            var newValue = parseInt($(this).parent().find('input').val())
            if ($(this).hasClass('dec')) {
                increaseValue = -1
            }
            newValue += increaseValue
            if (newValue < 0) {
                newValue = 0
            }
            data = [{
                id: $(this).closest('.cart__wrapper').data('id'),
                field: "quantity",
                new_value: newValue
            }]
            updateCart(data, true)
        } )
    })


    // On delete cart
    $('.icon_close').each( function() {
        $(this).on('click', function(event) {
            if (confirm("Are you sure you want to delete this item?")) {
                const order_id = $(this).closest('.cart-item').data('id')
                $.ajax({
                    url: '/cart/remove_cart',
                    type: 'POST',
                    data: {
                        csrfmiddlewaretoken,
                        order_id
                    },
                    success: function(result) {
                        if (result.is_deleted) {
                            console.log('Deleted: ', result.order_id);
                            $(`.cart-item[data-id="${result.order_id}"]`).remove()
                        } else {
                            console.log('result :>> ', result);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(thrownError);
                    }
                })
                .fail(function (jqXHR, textStatus, error) {
                    console.error(`Ajax fail: ${jqXHR.responseText}`)
                    console.error(error)
                });
            }
        })
    })


    $('#checkout').on('click', function(event) {
        data = {
            cart_items
        }
        $(`.checkout__form input[type='text']`).each(function() {
            data[`bill__${ $(this).attr('name') }`] = $(this).val()
        })
        checkout($(this).data('url'),data)
        console.log('data :>> ', data);
        // Validate form
    })
    

    getCartTotal()
})
var subtotal, tax, setupLogo, grandTotal, deliveryFee, setupLogoFee

function setCartTotalValue(e, value, valueAfter) {
    value = parseFloat(value)
    if (valueAfter) {
        valueAfter = parseFloat(valueAfter)
        if (valueAfter !== value) {
            del = document.createElement('del')
            del.textContent = (Math.round(value * 100) / 100).toFixed(2)
            e.appendChild(del)
            e.querySelector('span').textContent = (Math.round(valueAfter * 100) / 100).toFixed(2)
        } else {
            e.querySelector('span').textContent = (Math.round(value * 100) / 100).toFixed(2)
        }
    } else {
        e.querySelector('span').textContent = (Math.round(value * 100) / 100).toFixed(2)
    }
}  



function getGrandtotal(params) {
    var result = 0

    subtotal = parseFloat(params.subtotal)
    deliveryFee = parseFloat(params.delivery_fee)
    deliveryFeeAfterDiscount = parseFloat(params.delivery_fee_after_discount)
    setupLogoFee = parseFloat(params.setup_logo_fee)
    setupLogoFeeAfterDiscount = parseFloat(params.setup_logo_fee_after_discount)
    setupLogoLength = parseInt(params.setup_logo.length)
    tax = parseFloat(params.tax)

    result = subtotal + tax
    if (typeof setupLogoFeeAfterDiscount === 'number') {
        result += (setupLogoFeeAfterDiscount * setupLogoLength)
    } else {
        result += (setupLogoFee * setupLogoLength)
    }
    if (typeof deliveryFeeAfterDiscount === 'number') {
        result += deliveryFeeAfterDiscount
    } else {
        result += deliveryFee
    }
    console.log('result :>> ', result);
    return result
}

// API
function getCartTotal() {
    $.ajax({
        url: '/cart/get_cart_total',
        type: 'POST',
        data: {
            csrfmiddlewaretoken,
            cart_items
        },
        success: function(result) {
            console.log('result :>> ', result);
            subtotal = result.subtotal
            setupLogo = [...result.setup_logo]
            tax = result.tax
            deliveryFee = result.delivery_fee
            delivery_fee_after_discount = result.delivery_fee_after_discount
            setupLogoFee = result.setup_logo_fee
            setupLogoFeeAfterDiscount = result.setup_logo_fee_after_discount
    
            setCartTotalValue(cartTotalSubtotalElement, subtotal)
            setCartTotalValue(cartTotalTaxElement, tax)
            setCartTotalValue(cartTotalDeliveryElement, deliveryFee, delivery_fee_after_discount)
    
            if (setupLogo.length > 0) {
                setupLogoItemsContainer.closest('li').style.display =  'list-item'
                setupLogo.forEach(e => { createSetupLogoItem(e, setupLogoFee, setupLogoFeeAfterDiscount) })
            } else {
                setupLogoItemsContainer.closest('li').style.display =  'none'
            }
    
            setCartTotalValue(cartTotalGrandTotalElement, getGrandtotal(result))
            // subtotal = result.subtotalc
        }
    });
}



function checkout(url, data) {
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            csrfmiddlewaretoken,
            data
        },
        success: function(result) {
            console.log('checkout result :>> ', result);
        }
    });
}