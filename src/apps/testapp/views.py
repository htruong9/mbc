from django.http import HttpRequest, HttpResponse, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render, redirect
from django.urls import reverse


from carts.models.cart_item import CartItem

@csrf_exempt
def test(request: HttpRequest):
    print(request.user)
    print(request.user.is_authenticated)
    return JsonResponse({})
