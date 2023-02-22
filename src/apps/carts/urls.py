from django.urls import path

from .controller import crud, views
from .controller import api

app_name  = 'cart'

urlpatterns = [
    path('', views.cart, name='index'),
    path('add_cart/<int:product_id>', crud.create_cart, name='add_cart'),
    path('add_cart', crud.create_cart, name='add_cart'),
    path('update_cart', crud.update_cart, name='update_cart'),
    path('remove_cart', crud.delete_cart, name='remove_cart'),
    path('get_cart_total', api.get_cart_total, name='get_cart_total'),
]