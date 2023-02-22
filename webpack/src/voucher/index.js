import { CartItem } from "../product-detail/cart-item"
import { Cart } from "../cart/cart"
import { selector } from "../product-detail/constant"
import { __ } from "../common/constant"
import { toMoney } from "../util/parser"


class BaseVoucher {
    constructor(params) {
        Object.assign(this, params)
    }

    isValid(params) {}
    discount() {}
}

export class CartItemVoucher extends BaseVoucher {
    isValid(params) {
        const condition = this.condition
        const now = new Date().toISOString()
        if ( this.start_at > now || (now > this.expired_at) ) { return false }
        if ( condition.quantity_min && CartItem.getQuantity() < condition.quantity_min ) { return false }
        if ( condition.quantity_max && CartItem.getQuantity() > condition.quantity_max ) { return false }
        return true
    }

    doDiscount() {
        const discount = this.discount
        const discountValue = parseFloat(discount.value)
        let priceBefore, priceAfter, discountTotal, $summary

        if (discount.for_field === __.VOUCHER.FOR_FIELD__EACH_ITEM) {
            $summary = $(selector.SUMMARY__VARIANT)
        } else {
            // ...
        }
        priceBefore = toMoney( $summary.find('.value').data('price') )

        discountTotal = discount.by_percent ? priceBefore * discountValue / 100 : discountValue
        priceAfter = priceBefore - discountTotal

        $summary.find('.value').data('price-after', priceAfter)

        return { name: this.name }
    }
}


export class CartVoucher extends BaseVoucher {
    isValid(params) {
        const condition = this.condition
        const now = new Date().toISOString()
        if ( this.start_at > now || (now > this.expired_at) ) { return false }
        if ( condition.cart_subtotal_min && Cart.getSubtotal() < parseFloat(condition.cart_subtotal_min) ) { return false }
        if ( condition.cart_subtotal_max && Cart.getSubtotal() > parseFloat(condition.cart_subtotal_max) ) { return false }
        return true
    }

    doDiscount() {
        const discount = this.discount
        const discountValue = parseFloat(discount.value)
        let priceBefore, priceAfter, discountTotal, prop
        if (discount.for_field === __.VOUCHER.FOR_FIELD__DELIVERY_FEE) {
            priceBefore = Fee.delivery_fee.before
            prop = 'delivery_fee'
        } else if (discount.for_field === __.VOUCHER.FOR_FIELD__LOGO_TEXT_FEE){
            priceBefore = Fee.logo_fee.before
            prop = 'logo_fee'
        }
        discountTotal = discount.by_percent ? priceBefore * discountValue / 100 : discountValue
        priceAfter = priceBefore - discountTotal
        Fee[prop].after = priceAfter
        return { name: this.name }
    }
}

export const getVouchers = function(context) {
    return new Promise((resolve, reject) => {
        try {
            $.get(`/voucher/get_vouchers?context=${context}`, function(data, status){
                resolve(data)
            });
        } catch (error) {
            reject(error);
        }
    });   
}