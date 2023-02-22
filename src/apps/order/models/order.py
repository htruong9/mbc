from email.policy import default
from accounts.models import Account, Logo
from shop.models import Fee
from voucher.models import VoucherDiscount
from carts.models import CartItem
from common.utils import *
from django.db import models
from django.utils import timezone
from voucher.models import Voucher

from order.models.order_receiver import ReceiverInfo
from order.models.payment import Payment


class OrderManager(models.Manager):
    def create( 
        self, 
        *args, **kwargs):

        return super(OrderManager, self).create(
            *args, **kwargs
        ) 


class OrderQuerySet(models.QuerySet):

    def delete(self, *args, **kwargs):
        print('deleteing...')
        for obj in self:
            obj.cart_items.clear()

        super(OrderQuerySet, self).delete(*args, **kwargs)


class Order(models.Model):
    PENDING = 'Pending'
    ACCEPT = 'Accepted'
    CANCELLED = 'Cancelled'
    COMPLETE = 'Completed'
    STATUS = (
        (PENDING, 'Pending'),
        (CANCELLED, 'Cancelled'),
        (ACCEPT, 'Accepted'),
        (COMPLETE, 'Completed'),
    )

    user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)

    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, blank=True, null=True)
    receiver_info = models.ForeignKey(ReceiverInfo, on_delete=models.SET_NULL, blank=True, null=True)

    cart_items = models.ManyToManyField(CartItem)

    order_number = models.CharField(default='', editable=False, max_length=100)
    note = models.CharField(max_length=100, null=True)

    tax = models.FloatField(null=True)
    delivery_fee = models.DecimalField(max_digits=5, decimal_places=2, default=None, null=True)
    set_up_fee = models.DecimalField(max_digits=5, decimal_places=2, default=None, null=True)

    status = models.CharField(max_length=10, choices=STATUS, null=True, default=PENDING)

    sub_total = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    ip = models.CharField(blank=True, max_length=20)

    # objects = OrderManager()
    # objects = OrderQuerySet.as_manager()

    def __str__(self):
        return self.receiver_info.first_name

    def set_total_price(self):
        if not self.delivery_fee:
            self.delivery_fee = Fee.objects.get(name=Fee.Delivery).price
        if not self.set_up_fee:
            self.set_up_fee = Fee.objects.get(name=Fee.Logo).price


        subtotal = 0
        current_time = timezone.now()
        vouchers: list[Voucher] = Voucher.objects.all().filter(
            start_at__lte = current_time,
            expired_at__gte = current_time, 
            auto_apply = True,
            context = Voucher.CONTEXT_CART
        )

        logo_not_setup = set()
        cart_item: CartItem
        for cart_item in self.cart_items.all():
            subtotal += cart_item.get_total_price
            if cart_item.main_logo_text and cart_item.main_logo_text.type==cart_item.main_logo_text.TYPE_LOGO:
                logo_id = cart_item.main_logo_text.logo.pk
                logo = Logo.objects.get(id=logo_id)
                if not logo.is_setup:
                    logo_not_setup.add(logo_id)
                    logo.is_setup = True
                    logo.save()
            if cart_item.additional_logo_text and cart_item.additional_logo_text.type==cart_item.additional_logo_text.TYPE_LOGO:
                logo_id = cart_item.additional_logo_text.logo.pk
                logo = Logo.objects.get(id=logo_id)
                if not logo.is_setup:
                    logo_not_setup.add(logo_id)
                    logo.is_setup = True
                    logo.save()


        self.sub_total = subtotal
        self.save()

        total = subtotal
        voucher: Voucher
        for voucher in vouchers:
            if voucher.condition.is_valid_order(self):
                if voucher.discount.for_field == VoucherDiscount.FOR_DELIVERY_FEE:
                    if voucher.discount.by_percent:
                        discount_total = self.delivery_fee * voucher.discount.value/100
                    else:
                        discount_total = voucher.discount.value
                    self.delivery_fee -= discount_total
                elif voucher.discount.for_field == VoucherDiscount.FOR_LOGO_TEXT_FEE:
                    if voucher.discount.by_percent:
                        discount_total = self.set_up_fee * voucher.discount.value/100
                    else:
                        discount_total = voucher.discount.value
                    self.set_up_fee -= discount_total

        self.set_up_fee = self.set_up_fee * len(logo_not_setup)
        total += self.delivery_fee
        total += self.set_up_fee

        self.total = total
        self.save()
        

    def save(self, *args, **kwargs):
        # update timestamps on save
        # https://stackoverflow.com/questions/1737017/django-auto-now-and-auto-now-add
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()

        return super(Order, self).save(*args, **kwargs)


