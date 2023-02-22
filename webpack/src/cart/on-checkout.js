const { selector, value, name } = require('./constant')
const { STRING } = require('../common/string')
const { animator } = require('../util')
const modal = require('../common/modal');



$('#checkout').on('click', function(event) {
    event.preventDefault();
    const form = document.querySelector('#checkout-form')
    $(form).find('.fail-message').html('')
    const formData = new FormData(form)

    const url = $(form).attr('action')
    
    const cart_items_id = $('[name="cart_id"]:checked')
        .toArray()
        .reduce((prev, curr) => {
            prev.push(curr.dataset.id)
            return prev
        }, [])

    if (cart_items_id.length < 1) {
        modal.showModal('Please select at least 1 cart item')
        return
    }

    for (let i = 0; i < cart_items_id.length; i++) {
        const cart_item = cart_items_id[i];
        formData.append('cart_items', cart_item)
    }


    $.ajax({
        url,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            if (data.status == 'ok') {
                window.location.href = data.redirect_uri
            }
            else {
                modal.showModal(data.message, 'Form error')
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(`Post error ${url}\nStatus: ${textStatus}\nError: ${errorThrown}`)

        },
    });
});