const { updateCart } = require('./update')

$('.cart__quantity input').on('change', function() {
    const newValue = parseInt($(this).parent().find('input').val())
    data = [{
        id: $(this).closest('.cart-item').data('id'),
        field: "quantity",
        new_value: newValue
    }]
    console.log('data :>> ', data);
    updateCart(data, true)
})