const { selector, value, name } = require('./constant')
const { STRING } = require('../common/string')
const { animator } = require('../util')
const modal = require('../common/modal')

function validateForm() {
    switch ($(selector.SELECT__MAIN_LOGO_TEXT).val()) {
        // logo
        case value.LOGO_TEXT__TYPE_LOGO: {
            if ( $(`input[name="${name.NAME__MAIN_LOGO}"]:checked`).length === 0 ) {
                animator.scrollToElement($(selector.SELECT__MAIN_LOGO_TEXT))
                modal.showModal(STRING.Require_choose_main_logo)
                return false
            }
            break
        } 

        // text
        case value.LOGO_TEXT__TYPE_TEXT: {
            if ( $(selector.INPUT__MAIN_TEXT_VALUE).val().length === 0 ) {
                $(selector.INPUT__MAIN_TEXT_VALUE)
                animator.scrollToElement($(selector.SELECT__MAIN_LOGO_TEXT))
                
                modal.showModal(STRING.Require_main_text_value, STRING.Form_not_valid_title, () => {
                    $(selector.INPUT__MAIN_TEXT_VALUE).focus()
                })

                return false
            }
            break
        }
    }
    

    switch ($(selector.SELECT__ADDITIONAL_LOGO_TEXT).val()) {
        // logo
        case value.LOGO_TEXT__TYPE_LOGO: {
            if ( $(`input[name="${name.NAME__ADDITIONAL_LOGO}"]:checked`).length === 0 ) {
                animator.scrollToElement($(selector.SELECT__ADDITIONAL_LOGO_TEXT))
                modal.showModal(STRING.Require_choose_additional_logo, STRING.Form_not_valid_title)
                return false
            }
            break
        } 

        // text
        case value.LOGO_TEXT__TYPE_TEXT: {
            if ( $(selector.INPUT__ADDITIONAL_TEXT_VALUE).val().length === 0 ) {
                animator.scrollToElement($(selector.SELECT__ADDITIONAL_LOGO_TEXT))
                modal.showModal(STRING.Require_additional_text_value, STRING.Form_not_valid_title, () => {
                    $(selector.INPUT__ADDITIONAL_TEXT_VALUE).focus()
                })
                return false
            }
            break
        }
    }

    if ($(selector.SELECT__ADDITIONAL_LOGO_TEXT).val() != value.LOGO_TEXT__TYPE_NONE) {
        if ( $(selector.INPUT__ADDITIONAL_LOGO_TEXT__POSITIONS + ':checked').length === 0 ) {
            animator.scrollToElement($(selector.INPUT__ADDITIONAL_LOGO_TEXT__POSITIONS))
            modal.showModal(STRING.Require_additional_positions, STRING.Form_not_valid_title)
            return false
        }
    }

    if ($(selector.SELECT__ADDITIONAL_NAME).val() != '0') {
        if ( $(selector.INPUT__ADDITIONAL_NAME).val().length === 0 ) {
            animator.scrollToElement($(selector.INPUT__ADDITIONAL_NAME))
            modal.showModal(STRING.Require_name_value, STRING.Form_not_valid_title)
            return false
        }
        if ( $(selector.INPUT__ADDITIONAL_NAME__POSITIONS + ':checked').length === 0 ) {
            animator.scrollToElement($(selector.INPUT__ADDITIONAL_NAME__POSITIONS))
            modal.showModal(STRING.Require_name_positions, STRING.Form_not_valid_title)
            return false
        }  
    }

    return true
}

$('#add-cart').on('submit', function(event, loggedIn, csrf_token) {
    event.preventDefault();
    const url = $(this).attr('action')
    const dataArray = $(this).serializeArray()
    const formData = new FormData(document.querySelector('#add-cart'))

    if (csrf_token) {
        formData.set('csrfmiddlewaretoken', csrf_token)
    }

    isFormValid = validateForm()
    if ( !isFormValid ) {
        return
    }

    if (!loggedIn) {
        if (!isAuth) {
            const modalLogin = $('#modal-login')
            const modalSignup = $('#modal-signup')
            modalLogin.find('.fail-message').html('Please login to continue!')
            modalLogin.modal({backdrop: 'static', keyboard: false, show: true})  
            modalSignup.modal({backdrop: 'static', keyboard: false, show: false})  
            return
        }
    }

    $.ajax({
        url,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            modal.showModal('Added item to cart', 'Success')
            $('#main-modal').on('hidden.bs.modal', function () {
                window.location.reload()
            });
            console.log(`Post success ${url}\nData: ${JSON.stringify(data, null, 4)}`)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            modal.showModal('Something went wrong... Please try again later!', 'Error')
            console.log(`Post error ${url}\nStatus: ${textStatus}\nError: ${errorThrown}`)
        },
    });
});