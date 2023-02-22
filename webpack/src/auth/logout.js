$('[id="logout"]').click(function(event) {
    const target = $(event.target)
    console.log('target :>> ', target);
    const href = target.data('target')

    $.ajax({
        type: 'GET',
        url: href,
    }).then(() => {
        window.location.reload()
    })
    return false
})  