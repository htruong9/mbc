const { Cart  } = require('./cart')


;(() => {
    $('input[name="cart_id"]').on('change', () => {
        Cart.render()
    })
    Cart.render()
})()