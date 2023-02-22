const { SELECTOR } = require('./constant')
const { STRING } = require('./string')


export const showModal = function(body='', title=STRING.Form_not_valid_title, buttons=[],onHidden = () => {}) {
    $(SELECTOR.MAIN_MODAL_TITLE).html('')
    $(SELECTOR.MAIN_MODAL_BODY).html('')
    $(SELECTOR.MAIN_MODAL_FOOTER).html('')

    $(SELECTOR.MAIN_MODAL_TITLE).append(title || '')
    $(SELECTOR.MAIN_MODAL_BODY).append(body || '')

    if (buttons.length === 0) {
        const buttonClose = jQuery('<button type="button" class="btn btn-secondary" data-dismiss="modal"> Close </button>')
        buttons.push(buttonClose)
    }
    buttons.forEach(button => {
        $(SELECTOR.MAIN_MODAL_FOOTER).append(button)
    })

    $(SELECTOR.MAIN_MODAL).on('hidden.bs.modal', onHidden);
    $(SELECTOR.MAIN_MODAL).modal('show')
}