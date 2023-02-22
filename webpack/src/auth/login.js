$('#login').submit(function(event) {
    const form = $(event.target)
    const successElement = form.find('.success-message')
    const failElement = form.find('.fail-message')

    successElement.text('')
    failElement.text('')

    try {
        const url = form.attr('action')
        const method = form.attr('method')

        const data = {}
        form.serializeArray().map(function(x){data[x.name] = x.value;}); 

        $.ajax({
            type: method,
            url,
            data,
            success: function(res) {
                if (res.success) {
                    successElement.text(res.message)
                    let addCartForm = document.getElementById('add-cart')
                    if (addCartForm) {
                        const modalLogin = $('#modal-login')
                        modalLogin.modal('hide')
                        $(addCartForm).trigger('submit', [true, res.csrf_token])
                    } else {
                        window.location.reload()
                    }
                } else {
                    failElement.text(res.message)
                }
            }
        });
    } catch (error) {
        failElement.text('Something went wrong... Please try again later')
    }
    
    return false;
}); 