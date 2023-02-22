$('.logo-option .expand').on('click', function () {
    const root = $(this).closest('.logo-option')
    const columns = root.find('[class^="col"]:not(.file-preview)')
    root[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
    if ( $(this).hasClass('expand--show') ) {
        $(this).text('Hide all')
        columns.each(function (i, column) { 
            $(column).show(200)
        });
        $(this).removeClass('expand--show').addClass('expand--hide');
    } else {
        $(this).text('Show all')
        columns.each(function (i, column) { 
            if (i > 5) {
                $(column).hide(200)
            }
        });
        $(this).removeClass('expand--hide').addClass('expand--show');
    }
});