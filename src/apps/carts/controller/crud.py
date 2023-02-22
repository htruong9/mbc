import json, traceback
from django.http import HttpRequest, HttpResponse, HttpResponseNotFound, JsonResponse
from django.shortcuts import redirect
from accounts.models import Logo
from carts.models.cart_item import CartItem
from django.contrib import messages
from carts.models import CartManager
from order.models.order import Order
from shop.models import Fee
from voucher.models import Voucher, VoucherDiscount

"""
    C: add_cart
    R: #TODO create get_cart if necessary
    U: update_cart
    D: remove_cart
"""


def create_cart(request: HttpRequest, product_id=None):
    # if not request.user.is_authenticated
    get_POST = request.POST.get

    # TODO: validate data
    kwargs = {}
    kwargs['user_id'] = request.user.id
    str_keys = ['quantity', 'variant_id', 'color_id', 'size_id']
    list_keys = []
    file_keys = []
    
    # Main logo/text
    main_logo_text__type = get_POST('main_logo_text__type')

    if main_logo_text__type == '1':
        str_keys.append('main_logo')
        file_keys.append('main_logo')
    elif main_logo_text__type == '2':
        kwargs['main_text'] = {
                'value': get_POST('main_text__value'),
                'font': get_POST('main_text__font'),
                'color': get_POST('main_text__color')
        }
    if get_POST('main_logo_text__additional_position__is_select') == '1':
        list_keys.append('main_logo_text__additional_positions')
    list_keys.append('main_logo_text__position')
    
    # Additional logo/text
    additional_logo_text__type = get_POST('additional_logo_text__type')

    if additional_logo_text__type != '0':
        list_keys.append('additional_logo_text__positions')
        if additional_logo_text__type == '1':
            str_keys.append('additional_logo')
            file_keys.append('additional_logo')
        elif additional_logo_text__type == '2':
            kwargs['additional_text'] = {
                'value': get_POST('additional_text__value'),
                'font': get_POST('additional_text__font'),
                'color': get_POST('additional_text__color')
            }

    # Additional name
    additional_name__is_select = get_POST('additional-name__is_select')

    if additional_name__is_select == '1':
        str_keys.append('additional_name__value')
        list_keys.append('additional_name__positions')

    for key in str_keys:
        kwargs[key] = request.POST.get(key, None)
    for key in list_keys:
        kwargs[key] = request.POST.getlist(key, [])
    for key in file_keys:
        if kwargs[key] == '-1':
            kwargs[key] = request.FILES.get(key, None)

    CartItem.objects.create(**kwargs)
    return JsonResponse(request.POST.dict())


def update_cart(request: HttpRequest):
    if request.method == "POST":
        data = {
                'user': request.user,
                'update': request.POST.getlist('data[]')
            }
        res_json = CartManager.update_one(data)
        return JsonResponse(res_json)
    return HttpResponseNotFound("")  


def delete_cart(request):
    if request.method == "POST":
        is_deleted = False
        try:
            cart_item_id = request.POST.get('cart_item_id')
            cart_item = CartItem.objects.filter(user=request.user, id=cart_item_id)
            cart_item.delete()
            is_deleted = True
        except Exception as e:
            print(traceback.format_exc())
        return JsonResponse({
                "cart_item_id": cart_item_id,
                "is_deleted": is_deleted,
            })
    return HttpResponseNotFound("")  