from voucher.models import Voucher, VoucherCondition, VoucherDiscount
from django.utils import timezone
from datetime import datetime, timedelta 

from django.core.management.base import BaseCommand
from shop.models import Fee

class Command(BaseCommand):
    def handle(self, *args, **options):
        datas = [
            [5, 14, 1.0, '5+ items'],
            [15, 24, 2.0, '15+ items'],
            [25, 49, 3.0, '25+ items'],
            [50, 99, 3.5, '50+ items'],
            [100, None, 4.2, '100+ items'],
        ]

        Voucher.objects.all().delete()
        VoucherCondition.objects.all().delete()
        VoucherDiscount.objects.all().delete()

        # Discount by quantity
        for [quantity_min, quantity_max, value, name] in datas:
            voucher = Voucher()
            condition = VoucherCondition()
            discount = VoucherDiscount()

            voucher.context = voucher.CONTEXT_CART_ITEM
            voucher.condition = condition
            voucher.discount = discount
            voucher.name = name

            voucher.start_at = timezone.now()
            voucher.expired_at = timezone.now() + timedelta(weeks= 52*20)
            voucher.auto_apply = True

            condition.quantity_min = quantity_min
            condition.quantity_max = quantity_max

            discount.by_percent = False
            discount.for_field = VoucherDiscount.FOR_EACH_ITEM
            discount.value = value
            discount.is_include_deli_fee = False

            condition.save()
            discount.save()
            voucher.save()

        # Free ship for bill > 100
        voucher = Voucher()
        condition = VoucherCondition()
        discount = VoucherDiscount()
        voucher.condition = condition
        voucher.discount = discount

        voucher.context = voucher.CONTEXT_CART
        voucher.name = 'Order greater than £100'
        voucher.start_at = timezone.now()
        voucher.expired_at = timezone.now() + timedelta(weeks= 52*20)
        voucher.auto_apply = True

        condition.cart_subtotal_min = 100.0

        discount.by_percent = True
        discount.for_field = VoucherDiscount.FOR_DELIVERY_FEE
        discount.value = 100
        discount.is_include_deli_fee = False

        condition.save()
        discount.save()
        voucher.save()

        # Free setup fee (require logo text) for bill > 100
        voucher = Voucher()
        condition = VoucherCondition()
        discount = VoucherDiscount()
        voucher.condition = condition
        voucher.discount = discount

        voucher.context = voucher.CONTEXT_CART
        voucher.name = 'Order greater than £100'
        voucher.start_at = timezone.now()
        voucher.expired_at = timezone.now() + timedelta(weeks= 52*20)
        voucher.auto_apply = True

        condition.cart_subtotal_min = 100.0

        discount.by_percent = True
        discount.for_field = VoucherDiscount.FOR_LOGO_TEXT_FEE
        discount.value = 100
        discount.is_include_deli_fee = False

        condition.save()
        discount.save()
        voucher.save()






    
