from django.urls import path
from .controller import views, api, crud


urlpatterns = [
    path('', views.index, name='order'),
    path('confirm_order/', views.confirm_order, name='confirm_order'),
    path('checkout/', views.checkout, name='order_checkout'),
    path('payments/', views.payments, name='payments'),
    path('order_complete/', views.order_complete, name='order_complete'),
    path('create_order/', crud.create_order, name='create_order'),
    path('get_order/', crud.get_order, name='get_order'),
]
