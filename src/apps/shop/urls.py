from django.urls import path
from .controller import views, api

urlpatterns = [
    path('', views.shop, name='shop'),
    path('category_list', views.category_list, name='category_list'),
    path('brand_list', views.brand_list, name='brand_list'),
    path('product/<int:product_id>/<slug:product_slug>/', views.product_detail, name='product_detail'),
    # path('product_old/<int:product_id>/<slug:product_slug>/', views.product_detail_old, name='product_detail'), #TODO: remove it
    path('category_list/<int:category_id>/<slug:category_slug>/', views.products_by_category, name='products_by_category'),
    path('brand_list/<int:brand_id>/', views.products_by_brand, name='products_by_brand'),
    path('search/', views.search, name='search'),
    path('search_auto/', api.search_auto, name='search_auto'),
    path('ajaxcolour/', api.ajaxcolour, name='ajaxcolour'),
    path('submit_review/<int:product_id>/', api.submit_review, name='submit_review'),
]