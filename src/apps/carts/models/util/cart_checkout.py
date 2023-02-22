from accounts.models import Logo
from carts.models import CartItem
from shop.models import Fee
from voucher.models import Voucher, VoucherDiscount

def checkout(data) -> dict:
    """
    Example data:
        {
            "user": <request.user object>
            "ids": ["1", "2", ...]
        }
    """
    res_json = {}
    res_json['setup_logo'] = []

    # TODO: get tax from db
    # tax = Fee.objects.get(name=Fee.Tax).price
    tax=0
    res_json['tax'] = tax

    delivery_fee = Fee.objects.get(name=Fee.Delivery).price
    res_json['delivery_fee'] = delivery_fee

    logo_fee = Fee.objects.get(name=Fee.Logo).price
    res_json['setup_logo_fee'] = logo_fee

    subtotal = 0

    # subtotal += cart item price
    # get all logo in cart
    logos = []
    carts = CartItem.objects.filter(user = data['user'], pk__in = data['ids'])
    for item in carts:
        subtotal += item.each_item_price
        if item.require_logo_text and item.require_logo_text.is_logo:
            logos.append(item.require_logo_text.logo)
        if item.additional_logo_text and item.additional_logo_text.is_logo:
            logos.append(item.additional_logo_text.logo)

    # remove duplicated logo by id
    tmp = []
    logos_distinct = []
    for i, logo in enumerate(logos):
        if logo.id not in tmp:
            logos_distinct.append(logo)
            tmp.append(logo.id)

    # is_exists image
    logos_distinct = list(filter(lambda logo: Logo.is_exists.__get__(logo) == True, logos_distinct))

    # get only "not setup" logo
    logo_not_setup = list(filter(lambda logo: logo.is_setup == False, logos_distinct))

    for logo in logo_not_setup:
        res_json['setup_logo'].append(str(logo.image))

    res_json['subtotal'] = subtotal

    # Add voucher: Delivery fee
    params = {
        'Subtotal': subtotal,
        # 'Grandtotal': gr

    }
    vouchers = Voucher.objects.filter(discount__for_field = VoucherDiscount.FOR_DELIVERY_FEE)
    vouchers = filter(lambda voucher: voucher.condition.is_valid(params), vouchers)
    discount = 0
    for voucher in vouchers:
        if voucher.discount.by_percent:
            discount += delivery_fee * voucher.discount.value / 100
        else:
            discount += voucher.discount.value
    delivery_fee -= discount

    # Add voucher: LogoText fee
    params = {
        'Subtotal': subtotal,
        # 'Grandtotal': gr

    }
    vouchers = Voucher.objects.filter(discount__for_field = VoucherDiscount.FOR_LOGO_TEXT_FEE)
    vouchers = filter(lambda voucher: voucher.condition.is_valid(params), vouchers)
    discount = 0
    for voucher in vouchers:
        if voucher.discount.by_percent:
            discount += logo_fee * voucher.discount.value / 100
        else:
            discount += voucher.discount.value
    logo_fee -= discount

    res_json['delivery_fee_after_discount'] = delivery_fee
    res_json['setup_logo_fee_after_discount'] = logo_fee

    return res_json