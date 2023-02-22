import json

from common.models import *
from django.contrib import messages
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from order.models import *
from shop.forms import *
from shop.models import *


# TODO: deprecated
def ajaxcolour(request):
    data = {}
    if request.POST.get('action') == 'post':
        size_id = request.POST.get('size')
        colour_id = request.POST.get('colour')
        productid = request.POST.get('productid')
        colours = Variants.objects.filter(product_id=productid, size_id=size_id)
        context = {
            'size_id': size_id,
            'productid': productid,
            'colours': colours,
        }
        data = []
        # print(json.dumps(data))
        for i, e in enumerate(colours):
            tmp = serializers.serialize('json', [e, ])
            print(e.size)
            tmp = json.loads(tmp)[0]['fields']
            tmp['image'] = e.image()
            tmp['variant_id'] = e.pk
            tmp['colour_title'] = e.colour.title
            tmp['size_title'] = e.size.title
            print(tmp)

            data.append(tmp)

        data = json.dumps(data)
        return HttpResponse(data, content_type='application/json')
    return JsonResponse(data)

def search_auto(request):
    if request.is_ajax():
        keyword = request.GET.get('term', '')
        products = Product.objects.filter(product_name__icontains=keyword)
        results = []
        for product in products:
            product_json = {}
            product_json = product.product_name
            results.append(product_json)
        data = json.dumps(results)
    else:
        data = 'fail'
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)


def submit_review(request, product_id):
    url = request.META.get('HTTP_REFERER')
    if request.method == 'POST':
        try:
            reviews = Review.objects.get(user__id=request.user.id, product__id=product_id)
            form = ReviewForm(request.POST, instance=reviews)
            form.save()
            messages.success(request, 'Thank you! Your review has been updated.')
            return redirect(url)
        except Review.DoesNotExist:
            form = ReviewForm(request.POST)
            if form.is_valid():
                data = Review()
                data.subject = form.cleaned_data['subject']
                data.rating = form.cleaned_data['rating']
                data.review = form.cleaned_data['review']
                data.ip = request.META.get('REMOTE_ADDR')
                data.product_id = product_id
                data.user_id = request.user.id
                data.save()
                messages.success(request, 'Thank you! Your review has been submitted.')
                return redirect(url)
