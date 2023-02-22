from django.shortcuts import render, redirect
from src.common.breadcrumb_path import BreadcrumbPath
from shop.models import Fee
from ..models import *
from ..forms import *
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.templatetags.static import static

# from orders.models import Order, OrderDetail


def _cart_id(request): 
    cart = request.session.session_key
    if not cart:
        cart = request.session.create()
    return cart
 

def cart(request, total=0, quantity=0, cart_items=None):
    if request.user.is_authenticated:
        tax = 0
        grand_total = 0
        delivery_fee = Fee.objects.get(name=Fee.Delivery).price
        logo_fee = Fee.objects.get(name=Fee.Logo).price

        cart_items = CartItem.objects.all().filter(user=request.user, is_ordered=False)
        tax = (2 * total)/100
        grand_total = total + tax

        breadcrumb_path = BreadcrumbPath()
        breadcrumb_path.add('Home', reverse('home'), 'fa fa-home')
        breadcrumb_path.add('Shop', reverse('shop'))
        breadcrumb_path.end('Shopping cart')

        context = {
            'breadcrumb_path': breadcrumb_path,
            'scripts': [static('js/cart.js')],
            'total': total,
            'quantity': quantity,
            'cart_items': cart_items,
            'tax': tax,
            'grand_total': grand_total,
            'delivery_fee': delivery_fee,
            'logo_fee': logo_fee
        }
        return render(request, 'cart/index/index.html', context)
    else:
        return redirect('login')
    

def confirm_order(request):

    context = {
        # 'total': total,
        # 'quantity': quantity,
        # 'cart_items': cart_items,
        # 'tax': tax,
        # 'grand_total': grand_total,
        # # 'delivery_fee': delivery_fee
    }
    return render(request, 'cart/confirm-order.html', context)






