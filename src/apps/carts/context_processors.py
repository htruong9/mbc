from django.http import HttpRequest
from carts.models import CartItem


def cart_item_count(request: HttpRequest):
    count = 0
    if request.user.is_authenticated:
        count = CartItem.objects.filter(user=request.user, is_ordered=False).count()

    return {'cart_item_count': count}