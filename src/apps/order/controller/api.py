from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from carts.models import CartItem
from ..forms import OrderForm
import datetime
from ..models import order, payment
import json
from shop.models import Product
from django.core.mail import EmailMessage
from django.template.loader import render_to_string