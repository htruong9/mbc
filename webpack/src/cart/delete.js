const modal = require('../common/modal')


function deleteCartItem(id) {
    $.ajax({
        url: '/cart/remove_cart',
        type: 'POST',
        data: {
            csrfmiddlewaretoken,
            cart_item_id: id
        },
        success: function(result) {
            if (result.is_deleted) {
                console.log('Deleted: ', result.cart_item_id);
                $(`.cart-item[data-id="${result.cart_item_id}"]`).remove()
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


function confirmDeleteCartItem(id) { 
    buttons = jQuery('<div></div>')
    buttonClose = jQuery('<button type="button" class="btn btn-secondary" data-dismiss="modal"> Close </button>')
    buttonConfirm = jQuery('<button type="button" class="btn btn-danger" data-dismiss="modal"> Delete </button>')
    buttonConfirm.on('click', () => {
        deleteCartItem(id)
    })

    modal.showModal('Are you sure you want to delete this cart item?', 'Confirm', [buttonClose, buttonConfirm]) 
}

window.confirmDeleteCartItem = confirmDeleteCartItem