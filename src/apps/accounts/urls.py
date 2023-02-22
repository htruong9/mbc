from django.urls import path
from . import views


urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views._logout, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('edit-profile/', views.edit_profile, name='edit-profile'),
    path('change-password/', views.change_password, name='change-password'),
    path('my-orders/', views.view_order, name='my-orders'),
]