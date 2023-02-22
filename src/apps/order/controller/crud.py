import datetime
import uuid
from django.shortcuts import render, redirect
from django.http import HttpRequest, JsonResponse, HttpResponseRedirect
from carts.models.cart_item import CartItem
# from django.utils
from order.models.order_receiver import ReceiverInfo
from order.models import Order
from django.contrib import messages
from django.urls import reverse
from order.forms import OrderForm


def create_order(request: HttpRequest):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if not form.is_valid():
            # messages.error(request, form.errors)
            return JsonResponse({
                'status': 'invalid', 
                'message': list(form.errors.values())[0]
            })


        data = request.POST
        order: Order = Order()
        order.user = request.user
        order.note = data['note']
        order.tax = data['tax']
        order.ip = request.META.get('REMOTE_ADDR')

        receiver_info: ReceiverInfo = ReceiverInfo()
        receiver_info.first_name = data['first_name']
        receiver_info.last_name = data['last_name']
        receiver_info.phone = data['phone']
        receiver_info.email = data['email']
        receiver_info.address_line_1 = data['address_line_1']
        receiver_info.address_line_2 = data['address_line_2']
        receiver_info.country = data['country']
        receiver_info.city = data['city']
        receiver_info.state = data['state']
        receiver_info.save()

        order.receiver_info = receiver_info
        order.save()

        # Generate order number
        yy = int(datetime.date.today().strftime('%Y'))
        dd = int(datetime.date.today().strftime('%d'))
        mm = int(datetime.date.today().strftime('%m'))
        today = datetime.date.today()
        today_str = today.strftime('%Y%m%d')
        # current_date = d.strftime("%Y%m%d")
        order_number = today_str + str(order.id)
        order.order_number = order_number
        order.save()

        # Cart items
        cart_items = request.POST.getlist('cart_items')
        for id in cart_items:
            cart_item: CartItem = CartItem.objects.get(id=id)
            order.cart_items.add(cart_item)

        order.save()

        order.set_total_price()


        # order = Order.objects.get(user=request.user, sta=False, order_number=order_number)
        return JsonResponse({
            'status': 'ok', 
            'redirect_uri': reverse('confirm_order') + f'?order_id={order.id}'
        })
    else:
        return render(request, 'orders/payments.html')
 

def get_order(request: HttpRequest):
    if request.method == 'GET':
        order_id = request.GET.get('id')
        order = Order.objects.get(id=order_id)

        context = {
            'order': order
        }
        
        return render(request, 'orders/order_detail.html', context=context)