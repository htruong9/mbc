import { selector } from "./constant";
import { CartVoucher, getVouchers } from "../voucher";

export class Cart {
    static async render() {
        let grandTotal = 0
        const data = await getVouchers("cart");
        const vouchers = data.reduce(function (prev, voucher) {
            prev.push(new CartVoucher(voucher));
            return prev;
        }, []);

        vouchers.forEach((voucher) => {
            if (voucher.isValid()) {
                voucher.doDiscount();
            }
        });

        console.log("vouchers :>> ", vouchers);

        const subTotal = Cart.getSubtotal();
        const logoNotSetup = Cart.getLogoNotSetup();
        
        $(".setup_logo__items__container").html('')
        Object.values(logoNotSetup).forEach((src) => {
            Cart._renderSetupLogoItem(
                src,
                Fee.logo_fee.before,
                Fee.logo_fee.after
            );
            grandTotal += Fee.logo_fee.after
        });

        grandTotal += subTotal
        grandTotal += Fee.delivery_fee.after

        Cart._renderValue($(selector.CART_GRANDTOTAL), grandTotal)
        Cart._renderValue($(selector.CART_SUBTOTAL), subTotal);
        Cart._renderValue(
            $(selector.CART_DELIVERY),
            Fee.delivery_fee.before,
            Fee.delivery_fee.after
        );
    }

    static getCheckedItems() {
        const checkedItems = $('.cart-item').toArray().reduce(function(prev, curr) {
            if ($(curr).find('input[name="cart_id"]').is(":checked")) {
                prev.push(curr)
            }
            return prev
        }, [])

        return checkedItems
    }

    static getSubtotal() {
        const checkedItems = Cart.getCheckedItems()

        let result = 0
        checkedItems.forEach(cartItem => {
            const cartItemTotal = $(cartItem).find(selector.CART_ITEM__TOTAL)
                result += parseFloat($(cartItemTotal).data("price"));
        })
        return result
    }

    static getLogoNotSetup() {
        const checkedItems = Cart.getCheckedItems()

        const result = {}
        checkedItems.forEach(cartItem => {
            const logosNotSetup = $(cartItem).find(selector.DATA_LOGO_NOT_SETUP)
            logosNotSetup.toArray().forEach(logo => {
                result[$(logo).data("id")] = $(logo).data("src");
            })
        })
        return result
    }

    static _renderValue($element, value, valueAfter) {
        const divValue = $element.find("div.value");
        divValue.html('')

        const spanValue = jQuery('<span class="value"></span>').appendTo(divValue);
        value = parseFloat(value);

        if (valueAfter !== undefined) {
            valueAfter = parseFloat(valueAfter);
            if (valueAfter !== value) {
                const del = document.createElement("del");
                del.className = "mr-2";
                del.textContent = toMoneyString(value);
                spanValue.before(del);
                spanValue.text(toMoneyString(valueAfter));
            } else {
                spanValue.text(toMoneyString(value));
            }
        } else {
            spanValue.text(toMoneyString(value));
        }
    }



    static _renderSetupLogoItem(image, value, valueAfter) {
        const setupLogoItemsContainer = document.querySelector(
            ".setup_logo__items__container"
        );

        const container = document.createElement("div");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const spanWrapper = document.createElement("div");

        spanWrapper.appendChild(span);
        container.appendChild(img);
        container.appendChild(spanWrapper);

        container.className = "pair-container";
        spanWrapper.className = "value";
        img.src = `/media/${image}`;
        img.style.width = "64px";
        img.onerror = function () {
            this.parentNode.style = "color:red";
            this.parentNode.textContent = "Image not found";
        };
        span.className = "value";

        value = parseFloat(value);
        if (valueAfter !== undefined) {
            valueAfter = parseFloat(valueAfter);
            if (valueAfter !== value) {
                const del = document.createElement("del");
                del.className = "mr-2";
                del.textContent = toMoneyString(value);
                spanWrapper.appendChild(del);
                span.textContent = toMoneyString(valueAfter);
            } else {
                span.textContent = toMoneyString(value);
            }
        } else {
            span.textContent = (Math.round(value * 100) / 100).toFixed(2);
        }

        setupLogoItemsContainer.appendChild(container);
    }
}
