from django.http import HttpRequest, HttpResponse, HttpResponseNotFound, JsonResponse
from accounts.models import Logo
from carts.models import CartItem
from shop.models import Fee
from voucher.models import Voucher, VoucherDiscount
from carts.models import util

def get_cart_total(request):
    if request.method == "POST":
        data = {
            'user': request.user,
            'ids': request.POST.getlist('cart_items[]')
        }
        res_json = util.checkout(data)
        return JsonResponse(res_json)
    return HttpResponseNotFound("")