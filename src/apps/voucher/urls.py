from django.urls import path
from . import views

urlpatterns = [
    path('get_auto_apply_vouchers', views.get_auto_apply_voucher, name='get_auto_apply_vouchers'),
    path('get_vouchers', views.get_vouchers, name='get_vouchers'),
]