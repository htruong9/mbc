$('#signup').submit(function(event) {
    const form = $(event.target)
    const successElement = form.find('.success-message')
    const failElement = form.find('.fail-message')

    successElement.html('')
    failElement.html('')

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
                    successElement.html(res.message)
                    // $('#modal-signup').modal('hide')
                    // $('#modal-login').modal('show')
                } else {
                    failElement.html(res.message)
                }
            }
        });
    } catch (error) {
        failElement.html('Something went wrong... Please try again later')
    }
    
    return false;
}); 