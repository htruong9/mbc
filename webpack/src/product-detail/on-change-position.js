const val = $('#main-position').val()
$(`.position-input[value="${val}"]`).not(this).prop('disabled', true);

$('.position-input, #main-position').on('change', function() {
    const val = $(this).val()
    $(`.position-input[value="${val}"]`).not(this).prop('checked', false)
});

$('#main-position').on('change', function() {
    const val = $(this).val()
    const positionInput = $(`.position-input[value="${val}"]`)
    positionInput.prop('checked', false)
    positionInput.prop('disabled', true)
    $('.position-input').not(positionInput).prop('disabled', false)
});