const { getter } = require('../util')

export const updateCart = function(data, isRefresh = false) {
    const csrfmiddlewaretoken = getter.getCSRFmiddlewaretoken()
    // data: [
        //     JSON.stringify({
        //         "id": 4,
        //         "field": "quantity",
        //         "new_value": 4
        //     }),
        //     JSON.stringify({
        //         "id": 4,
        //         "field": "additional_name__name",
        //         "new_value": 'bar'
        //     }),
        // ]
    for (var i=0; i<data.length; i++) {
        data[i] = JSON.stringify(data[i])
    }
    $.ajax({
        url: '/cart/update_cart',
        type: 'POST',
        data: {
            csrfmiddlewaretoken,
            data
        },
        success: function(result) {
            if (isRefresh) {
                location.reload()
            }
        }
    });
}