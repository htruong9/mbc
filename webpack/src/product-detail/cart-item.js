import { selector } from "./constant"

export class CartItem {
    // Size
    static getSizeId() { return $('#size').val() }
    static setSizeValue(value) { $('#size').val(value) }

    // Color
    static getColorId() { return $('input[name="color_id"]:checked').val() }
    static setColorValue (value) {
        const colorInput = $(`input[name="color_id"][value="${value}"]`)
        colorInput.prop('checked', true)
        colorInput.trigger('change')
    }

    // Variant
    static getVariantOption(params = {}) {
        let variantOption = $(`#variant option[data-color_id="${CartItem.getColorId()}"][data-size_id="${CartItem.getSizeId()}"]`)
        if (variantOption.length === 0) {
            if (params.sizeId) { variantOption = $(`#variant option[data-size_id="${params.sizeId}"]`) }
            else if (params.colorId) { variantOption = $(`#variant option[data-color_id="${params.colorId}"]`) }
        }
        return variantOption
    }
    static setVariantValue(value) {
        $(selector.SELECT__VARIANT).val(value)
    }

    // Quantity
    static getQuantity() {
        return parseInt( $(selector.INPUT__QUANTITY).val() )
    }
}

