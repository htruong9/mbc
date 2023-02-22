export const renderer = require('./renderer')
export const onSelect = require('./on-select')
export const onSubmit = require('./on-submit')
export const onUpload = require('./on-upload')
export const showHide = require('./show-hide')
export const onChangePosition = require('./on-change-position')
export const updateSummary = require('./update-summary')

window.addEventListener('DOMContentLoaded', (event) => {
    if (!isAuth) {
        // const modalLogin = $('#modal-login')
        // const modalSignup = $('#modal-signup')
        // modalLogin.find('.close').remove()
        // modalSignup.find('.close').remove()
        // modalLogin.find('.fail-message').html('Please login to continue!')
        // modalLogin.modal({backdrop: 'static', keyboard: false, show: true})  
        // modalSignup.modal({backdrop: 'static', keyboard: false, show: false})  
    }
});
