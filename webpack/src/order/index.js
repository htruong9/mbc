function viewOrderDetail(id) {
    $.ajax({
        type: "get",
        url: `/order/get_order?id=${id}`,
        success: function (response) {
            $('body').append(response);
        }
    });
}

window.viewOrderDetail = viewOrderDetail