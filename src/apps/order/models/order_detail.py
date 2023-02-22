from turtle import position
from django.db import models
from accounts.models import Logo
from common.utils import decimal_sum

from shop.models import Position, Product, Variants, Colour, Size
from decimal import Decimal

# class LogoText(models.Model):
#     is_logo = models.BooleanField(default=False)
#     is_text = models.BooleanField(default=False)
#     logo = models.ForeignKey(ImageUpload, on_delete=models.SET_NULL, blank=True, null=True)
#     text = models.CharField(max_length=100, null=True, blank=True)
#     price = models.DecimalField(max_digits=5, decimal_places=2)

#     positions = models.ManyToManyField(Position)

#     def set_logo(self, image, user_id):
#         m = ImageUpload()
#         m.user_id = user_id
#         m.image = image
#         m.save()
#         self.logo = m


# class AdditionalName(models.Model):
#     name = models.CharField(max_length=100, null=True, blank=True)
#     positions = models.ManyToManyField(Position)
#     # positions = models.CharField(max_length=1000, null=True, blank=True)


# class OrderDetail(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
#     quantity = models.IntegerField(default=1)

#     variant = models.ForeignKey(Variants, on_delete=models.CASCADE, null=True)
#     colour = models.ForeignKey(Colour, on_delete=models.CASCADE, null=True)
#     size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True)

#     require_logo_text = models.ForeignKey(LogoText, on_delete=models.SET_NULL, null=True, related_name='require_logo_text')
#     additional_positions = models.ManyToManyField(Position)
#     additional_logo_text = models.ForeignKey(LogoText, on_delete=models.SET_NULL, null=True, related_name='additional_logo_text')
#     additional_name = models.ForeignKey(AdditionalName, on_delete=models.SET_NULL, null=True)

#     delivery_fee = models.DecimalField(max_digits=5, decimal_places=2, null=True)

#     each_item_price = models.DecimalField(max_digits=5, decimal_places=2, null=True)
#     all_item_price = models.DecimalField(max_digits=5, decimal_places=2, null=True)
#     total_price = models.DecimalField(max_digits=5, decimal_places=2, null=True) # not include deli fee

#     positions_json = models.CharField(max_length=1000, null=True, blank=True)

#     data_json = models.CharField(max_length=2000, null=True, blank=True)

#     def set_each_item_price(self):
#         result = self.variant.price
        
#         if self.require_logo_text:
#             # result = decimal_sum(result, self.require_logo_text.price)
#             for pos in self.require_logo_text.positions.all():
#                 result = decimal_sum(result, pos.price)

#         if self.additional_positions:
#             for pos in self.additional_positions.all():
#                 result = decimal_sum(result, pos.additional_price)

#         if self.additional_logo_text:
#             # result = decimal_sum(result, self.additional_logo_text.price)
#             for pos in self.additional_logo_text.positions.all():
#                 result = decimal_sum(result, pos.additional_price)

#         if self.additional_name:
#             for pos in self.additional_name.positions.all():
#                 result = decimal_sum(result, pos.name_price)

#         self.each_item_price = result
#         self.save()

#     def set_all_item_price(self):
#         result = self.each_item_price * self.quantity
#         self.all_item_price = result
#         self.save()

