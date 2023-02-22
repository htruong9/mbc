$('#select-all').on('change', function() {
    $('[name="cart_id"]').prop('checked', this.checked);
    // console.log('$(this).val() :>> ', this.checked);
})