import json
import traceback

from carts.models import CartItem
from django.core.mail import EmailMessage
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.template.loader import render_to_string
from django.templatetags.static import static
from django.urls import reverse
from order.forms import OrderForm
from order.models.order import Order
from order.models.payment import Payment
from shop.models import Product
from src.common.breadcrumb_path import BreadcrumbPath


def index(request: HttpRequest):
    breadcrumb_path = BreadcrumbPath()
    breadcrumb_path.add('Home', reverse('home'), 'fa fa-home')
    breadcrumb_path.add('Shop', reverse('shop'))
    breadcrumb_path.end('Order')

    orders = Order.objects.all().filter(user=request.user, status=Order.ACCEPT)

    context = {
        'orders': orders,
        'breadcrumb_path': breadcrumb_path,
        'scripts': [static('js/order.js')]
    }
    return render(request, 'orders/index.html', context)


def checkout(request):
    if request.method == 'POST':
        return render()
    return render(request, 'orders/checkout.html')

def payments(request): 
    body = json.loads(request.body)
    order = order.objects.get(user=request.user, is_ordered=False, order_number=body['orderID'])

    # Store transaction details inside Payment model
    payment = payment(
        user=request.user,
        payment_id=body['transID'],
        payment_method=body['payment_method'],
        amount_paid=order.order_total,
        status=body['status'],
    )
    payment.save()

    order.payment = payment
    order.is_ordered = True
    order.save()

    # Move the cart items to Order Product table
    cart_items = CartItem.objects.filter(user=request.user)

    for item in cart_items:
        orderproduct = OrderProduct()
        orderproduct.order_id = order.id
        orderproduct.payment = payment
        orderproduct.user_id = request.user.id
        orderproduct.product_id = item.product_id
        orderproduct.quantity = item.quantity
        orderproduct.product_price = item.product.price
        orderproduct.ordered = True
        orderproduct.save()

        cart_item = CartItem.objects.get(id=item.id)
        product_variation = cart_item.variations.all()
        orderproduct = OrderProduct.objects.get(id=orderproduct.id)
        orderproduct.variations.set(product_variation)
        orderproduct.save()

        # Reduce the quantity of the sold products
        product = Product.objects.get(id=item.product_id)
        product.stock -= item.quantity
        product.save()

    # Clear cart
    CartItem.objects.filter(user=request.user).delete()

    # Send order recieved email to customer
    mail_subject = 'Thank you for your order!'
    message = render_to_string('orders/order_received_email.html', {
        'user': request.user,
        'order': order,
    })
    to_email = request.user.email
    send_email = EmailMessage(mail_subject, message, to=[to_email])
    send_email.send()

    # Send order number and transaction id back to sendData method via JsonResponse
    data = {
        'order_number': order.order_number,
        'transID': payment.payment_id,
    }
    return JsonResponse(data)


def confirm_order(request: HttpRequest):
    current_user = request.user

    if request.method == 'GET':
        order_id = request.GET.get('order_id')
        order = Order.objects.get(user=current_user, id=order_id)
        context = {
            'order': order,
        }
        return render(request, 'orders/payments.html', context)

    elif request.method == 'POST':
        body = json.loads(request.body)
        order: Order = Order.objects.get(user=request.user, status=Order.PENDING, id=body['order_id'])

        # Store transaction details inside Payment model
        payment = Payment(
            user=request.user,
            payment_id=body['transID'],
            payment_method=body['payment_method'],
            amount_paid=order.total,
            status=body['status'],
        )
        payment.save()

        order.payment = payment
        order.status = Order.ACCEPT
        order.save()

        cart_item: CartItem
        for cart_item in order.cart_items.all():
            cart_item.is_ordered = True
            cart_item.save()
            # Reduce the quantity of the sold products
            # product: Product = Product.objects.get(id=cart_item.variant.product_id)
            # product.stock -= item.quantity
            # product.save()

        # Send order recieved email to customer
        mail_subject = 'Thank you for your order!'
        message = render_to_string('orders/order_received_email.html', {
            'user': request.user,
            'order': order,
        })
        to_email = request.user.email
        send_email = EmailMessage(mail_subject, message, to=[to_email])
        try:
            send_email.send()
        except Exception as e:
            print(traceback.format_exc())

        # Send order number and transaction id back to sendData method via JsonResponse
        data = {
            'status': 'ok',
            'order_number': order.order_number,
            'transID': payment.payment_id,
        }

        return JsonResponse(data)



def order_complete(request):
    order_number = request.GET.get('order_number')
    transID = request.GET.get('payment_id')

    order = Order.objects.get(order_number=order_number, status=Order.ACCEPT)
    payment = Payment.objects.get(payment_id=transID)
    try:

        context = {
            'order': order,
            'order_number': order.order_number,
            'transID': payment.payment_id,
            'payment': payment,
        }
        return render(request, 'orders/order_complete.html', context)
    except (payment.DoesNotExist, order.DoesNotExist):
        return redirect('home')
