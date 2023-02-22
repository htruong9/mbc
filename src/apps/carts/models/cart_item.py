from django.db import models
from django.core.files import File
from typing import Union
from django.utils import timezone

from accounts.models import Account
from shop.models import Fee
from shop.models import Colour, Position, Product, Size, Variants
from voucher.models import VoucherDiscount
from voucher.models import Voucher
from carts.models.logotext import BaseLogoText
from carts.models.additional_name import AdditionalName
from carts.models.logotext import MainLogoText, AdditionalLogoText

from common.utils import decimal_sum


class CartItemManager(models.Manager):
    def create( 
        self, user_id: str, variant_id: str, quantity: int,
        main_logo: Union[str, File] = None, 
        main_text: dict = None, 
        main_logo_text__position: list = [], 
        main_logo_text__additional_positions: list = [],
 
        additional_logo: Union[str, File] = None,
        additional_text: dict = None, 
        additional_logo_text__positions: list = [],

        additional_name__value: str = '',
        additional_name__positions: list = [],
        *args, **kwargs):

        main_logo_text = MainLogoText.objects.create(
            user_id=user_id, 
            logo=main_logo, 
            text=main_text,
            positions=main_logo_text__position,
            additional_positions=main_logo_text__additional_positions
            )
        
        additional_logo_text = None
        if any([ additional_logo, additional_text ]): 
            additional_logo_text = AdditionalLogoText.objects.create(
                user_id=user_id, 
                logo=additional_logo, 
                text=additional_text,
                positions=additional_logo_text__positions
                )

        additional_name = None
        if any([ additional_name__value, additional_name__positions ]):
            additional_name = AdditionalName.objects.create(
                value = additional_name__value,
                positions = additional_name__positions
            )
        return super(CartItemManager, self).create(
            user_id=user_id, 
            variant_id=variant_id, 
            quantity=quantity,
            main_logo_text=main_logo_text,
            additional_logo_text=additional_logo_text,
            additional_name=additional_name
            ) 
        

class CartItem(models.Model):
    user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)

    variant: Variants = models.ForeignKey(Variants, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    main_logo_text: MainLogoText = models.ForeignKey(MainLogoText, on_delete=models.SET_NULL, null=True, related_name='logo_text')
    additional_logo_text: AdditionalLogoText = models.ForeignKey(AdditionalLogoText, on_delete=models.SET_NULL, null=True, related_name='additional_logo_text')
    additional_name: AdditionalName = models.ForeignKey(AdditionalName, on_delete=models.SET_NULL, null=True)
    is_ordered = models.BooleanField(default=False)
    objects = CartItemManager()

    @property
    def get_total_price(self):
        total_price = 0

        current_time = timezone.now()
        vouchers: list[Voucher] = Voucher.objects.filter(
            start_at__lte = current_time,
            expired_at__gte = current_time, 
            auto_apply = True,
            context = Voucher.CONTEXT_CART_ITEM
        )   
     
        total_price += self.variant.price
        
        position: Position
        positions: list
        logo_text: BaseLogoText
        for logo_text in [self.main_logo_text, self.additional_logo_text]:
            if logo_text:
                if isinstance(logo_text, MainLogoText):
                    total_price += sum(position.price for position in logo_text.positions.all())
                    total_price += sum(position.additional_price for position in logo_text.additional_positions.all())
                elif isinstance(logo_text, AdditionalLogoText):
                    total_price += sum(position.additional_price for position in logo_text.positions.all())

        if self.additional_name:
            positions = self.additional_name.positions.all()
            for position in positions:
                total_price += position.name_price
        
        for voucher in vouchers:
            if voucher.condition.is_valid(self):
                if voucher.discount.for_field == VoucherDiscount.FOR_EACH_ITEM:
                    if voucher.discount.by_percent:
                        discount_total = total_price * voucher.discount.value/100
                    else:
                        discount_total = voucher.discount.value
                    total_price -= discount_total

        total_price *= self.quantity
        return total_price

