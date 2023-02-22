from unittest import result
from xmlrpc.client import Boolean
from django.db import models
from decimal import Decimal
from shop.models import Variants

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from carts.models.cart_item import CartItem
    from order.models import Order

class VoucherCondition(models.Model):
    quantity_min = models.IntegerField(null = True)
    quantity_max = models.IntegerField(null = True)
    variants = models.ManyToManyField(Variants)
    all_items_price_min = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    all_items_price_max = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    cart_subtotal_min = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    cart_subtotal_max = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    cart_grandtotal_min = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    cart_grandtotal_max = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    # more example field: is_user_has_payment, ... 

    def get_dict(self) -> dict:
        keys = [
            'quantity_min', 'quantity_max',
            'all_items_price_min', 'all_items_price_max',
            'cart_subtotal_min', 'cart_subtotal_max',
            'cart_grandtotal_min', 'cart_grandtotal_max',
            # 'variants',
        ]
        result = {
            key: self.__getattribute__(key) for key in keys
        }
        return result

    def is_valid(self, cart_item: 'CartItem') -> bool:
        # cart_item
        if self.quantity_min  and  cart_item.quantity < self.quantity_min :
            return False
        if self.quantity_max  and  cart_item.quantity > self.quantity_max :
            return False
        return True

    def is_valid_order(self, order: 'Order') -> bool:
        if self.cart_subtotal_min and order.sub_total < self.cart_subtotal_min:
            return False
        if self.cart_subtotal_max and order.sub_total > self.cart_subtotal_max: 
            return False
        return True

class VoucherDiscount(models.Model):
    FOR_LOGO_TEXT_FEE = 'Logo_text_Fee'
    FOR_ADDITIONAL_LOGO_TEXT = 'Additional_logo_text'
    FOR_DELIVERY_FEE = 'Delivery_Fee'
    FOR_EACH_ITEM = 'each_item'
    FOR_ALL_ITEM = 'all_item'
    FOR_ORDER_SUBTOTAL = 'Order_subtotal'
    FOR_ORDER_GRANDTOTAL = 'Order_grandtotal'
    FOR__VARIANT = 'variant'

    value = models.DecimalField(default=Decimal(0), max_digits=5, decimal_places=2)
    by_percent = models.BooleanField(default=False)
    for_field = models.CharField(max_length=100, null=True)

    def get_dict(self) -> dict:
        keys = ['value', 'by_percent', 'for_field']
        result = {
            key: self.__getattribute__(key) for key in keys
        }
        return result


class Voucher(models.Model):
    CONTEXT_CART = 'cart'
    CONTEXT_CART_ITEM = 'cart_item'

    _CONTEXT = (
        (CONTEXT_CART, 'order'),
        (CONTEXT_CART_ITEM, 'cart_item'),
    )

    context = models.CharField(choices=_CONTEXT, max_length=10, null=True)
    auto_apply = models.BooleanField(default=False)
    start_at = models.DateTimeField(null=True)
    expired_at = models.DateTimeField(null=True)
    condition: VoucherCondition = models.ForeignKey(VoucherCondition, on_delete=models.CASCADE)
    discount: VoucherDiscount = models.ForeignKey(VoucherDiscount, on_delete=models.CASCADE)
    name = models.CharField(default='', max_length=200)

    def get_dict(self) -> dict:
        keys = ['name', 'auto_apply', 'start_at', 'expired_at']
        result = {
            key: self.__getattribute__(key) for key in keys
        }
        result['condition'] = self.condition.get_dict()
        result['discount'] = self.discount.get_dict()
        return result

