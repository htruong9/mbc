# import uuid
# from django.db import models
# from common.utils import *
# from accounts.models import Account, ImageUpload
# from shop.models import Colour, Product, Size, Variants
# from accounts.models import ImageUpload
# from django.utils import timezone

# class LogoText(models.Model):
#     is_logo = models.BooleanField(default=False)
#     is_text = models.BooleanField(default=False)
#     logo = models.ForeignKey(ImageUpload, on_delete=models.SET_NULL, blank=True, null=True)
#     text = models.CharField(max_length=100, null=True, blank=True)
#     price = models.DecimalField(max_digits=5, decimal_places=2)

#     def set_logo(self, image, user_id):
#         m = ImageUpload()
#         m.user_id = user_id
#         m.image = image
#         m.save()
#         self.logo = m

# class AdditionalName(models.Model):
#     name = models.CharField(max_length=100, null=True, blank=True)
#     positions = models.CharField(max_length=1000, null=True, blank=True)


# class OrderDetail(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
#     variant = models.ForeignKey(Variants, on_delete=models.CASCADE, null=True)
#     colour = models.ForeignKey(Colour, on_delete=models.CASCADE, null=True)
#     size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True)

#     additional_logo_text = models.ForeignKey(LogoText, on_delete=models.SET_NULL, null=True, related_name='additional_logo_text')
#     require_logo_text = models.ForeignKey(LogoText, on_delete=models.SET_NULL, null=True, related_name='require_logo_text')
#     additional_name = models.ForeignKey(AdditionalName, on_delete=models.SET_NULL, null=True)

#     delivery_fee = models.DecimalField(max_digits=5, decimal_places=2, null=True)
#     total_price = models.DecimalField(max_digits=5, decimal_places=2, null=True) # not include deli fee

#     positions_json = models.CharField(max_length=1000, null=True, blank=True)

#     data_json = models.CharField(max_length=2000, null=True, blank=True)


# class Payment(models.Model):
#     user = models.ForeignKey(Account, on_delete=models.CASCADE)
#     payment_id = models.CharField(max_length=100)
#     payment_method = models.CharField(max_length=100)
#     amount_paid = models.CharField(max_length=100) # this is the total amount paid
#     status = models.CharField(max_length=100)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.payment_id


# class OrderReceiver(models.Model):
#     first_name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)
#     phone = models.CharField(max_length=15)
#     email = models.EmailField(max_length=50)
#     address_line_1 = models.CharField(max_length=50)
#     address_line_2 = models.CharField(max_length=50, blank=True)
#     country = models.CharField(max_length=50)
#     state = models.CharField(max_length=50)
#     city = models.CharField(max_length=50)

#     ip = models.CharField(blank=True, max_length=20)

#     def full_name(self):
#         return f'{self.first_name} {self.last_name}'

#     def full_address(self):
#         return f'{self.address_line_1} {self.address_line_2}'


# class Order(models.Model):
#     CANCELLED = 'Cancelled'
#     IN_CART = 'In cart'
#     ORDER = 'Ordered'
#     ACCEPT = 'Accepted'
#     COMPLETE = 'Completed'
#     STATUS = (
#         (CANCELLED, 'Cancelled'),
#         (IN_CART, 'In cart'),
#         (ORDER, 'Ordered'),
#         (ACCEPT, 'Accepted'),
#         (COMPLETE, 'Completed'),
#     )

#     user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
#     payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, blank=True, null=True)
#     order_detail = models.ForeignKey(OrderDetail, on_delete=models.SET_NULL, blank=True, null=True)
#     order_receiver = models.ForeignKey(OrderReceiver, on_delete=models.SET_NULL, blank=True, null=True)

#     order_number = models.UUIDField(default=uuid.uuid4, editable=False)
#     order_note = models.CharField(max_length=100, blank=True)
#     order_total = models.FloatField(null=True)
#     tax = models.FloatField()
#     status = models.CharField(max_length=10, choices=STATUS, null=True)
#     created_at = models.DateTimeField(editable=False)
#     updated_at = models.DateTimeField()
#     # is_ordered = models.BooleanField(default=False)  --> base on status, ex is_ordered equal to status Completed 

#     def set_order_total(self):
#         # define how to count order_total base on order_detail
#         pass

#     def __str__(self):
#         return self.first_name

#     def save(self, *args, **kwargs):
#         # update timestamps on save
#         # https://stackoverflow.com/questions/1737017/django-auto-now-and-auto-now-add
#         if not self.id:
#             self.created_at = timezone.now()
#         self.updated_at = timezone.now()

#         return super(Order, self).save(*args, **kwargs)

#     def import_data(self, request):
#         POST = request.POST
#         FILES = request.FILES
#         USER_ID = request.user.id

#         self.user_id = USER_ID

#         self.variant_id = POST.get('Variant__id')
#         self.colour_id = POST.get('Colour__id')
#         self.size_id = POST.get('Size__id')

#         self.positions_json = POST.get('Position')

#         tmp = POST.get('Additional_logo_text__selected')
#         if not is_false(tmp):
#             m = LogoText()
#             if tmp == 'logo':
#                 m.is_logo = True
#                 img_id = POST.get('Additional_logo_text__image_id')
#                 if is_false(img_id):
#                     m.set_logo( FILES.get('Additional_logo_text__file'), USER_ID )
#                 else:
#                     m.logo_id = img_id
#             elif tmp == 'text':
#                 m.is_text = True
#                 m.text = POST.get('Additional_logo_text__text')
#             m.price = POST.get('Additional_logo_text__price')
#             m.save()
#             self.additional_logo_text = m

#         tmp = POST.get('Require_logo_text__is_require')
#         if parse_boolean(tmp):
#             tmp = POST.get('Require_logo_text__selected')
#             m = LogoText()
#             if tmp == 'logo':
#                 m.is_logo = True
#                 img_id = POST.get('Require_logo_text__image_id')
#                 if is_false(img_id):
#                     m.set_logo( FILES.get('Require_logo_text__file'), USER_ID )
#                 else:
#                     m.logo_id = img_id
#             elif tmp == 'text':
#                 m.is_text = True
#                 m.text = POST.get('Require_logo_text__text')
#             m.price = POST.get('Require_logo_text__price')
#             m.save()
#             self.require_logo_text = m

#         tmp = POST.get('Additional_name__selected')
#         if parse_boolean(tmp):
#             m = AdditionalName()
#             m.name = POST.get('Additional_name__name')
#             m.positions = POST.get('Additional_name__positions') #JSON
#             m.save()
#             self.additional_name = m

#         self.delivery_fee = POST.get('Delivery_Fee')
#         self.total_price = POST.get('Total_price') # not include deli fee

#         self.data_json
#         print(f"POST.get('Additional_logo_text__selected'): {POST.get('Additional_logo_text__selected')}")
#         # if 

#         self.Additional_logo_text_price = POST.get('Additional_logo_text__price')


# class VoucherCondition(models.Model):
#     quantity_gt = models.IntegerField(null = True)
#     quantity_lw = models.IntegerField(null = True)
#     # colours = models.ManyToManyField(Colour, null = True)
#     # sizes = models.ManyToManyField(Size, null = True)
#     variants = models.ManyToManyField(Variants, null = True)
#     total_price_gt = models.DecimalField(max_digits=5, decimal_places=2, null=True)
#     total_price_lw = models.DecimalField(max_digits=5, decimal_places=2, null=True)
#     # more example field: is_user_has_payment, ...


#     def is_valid(self, order):
#         if self.quantity_lw  and order['quantity'] < self.quantity_lw :
#             return False
#         if self.quantity_gt  and order['quantity'] > self.quantity_gt :
#             return False
#         if self.total_price_lw and order['total_price'] < self.total_price_lw:
#             return False
#         if self.total_price_gt and order['total_price'] < self.total_price_gt:
#             return False

#         if self.variants and order['variant'] not in self.variants:
#             return False


# class VoucherDiscount(models.Model):
#     by_percent = models.SmallIntegerField(default=0)
#     by_fixed = models.DecimalField(max_digits=5, decimal_places=2, null=True)

#     for_each_item = models.BooleanField(null=True)
#     for_all_item = models.BooleanField(null=True)

#     is_include_deli_fee = models.BooleanField(default=True)

#     def get_discount(self, order):
#         pass

# class Voucher(models.Model):
#     auto_apply = models.BooleanField(default=False)
#     start_at = models.DateTimeField(null=True)
#     expired_at = models.DateTimeField(null=True)
#     condition = models.ForeignKey(VoucherCondition, on_delete=models.CASCADE)
#     discount = models.ForeignKey(VoucherDiscount, on_delete=models.CASCADE)
