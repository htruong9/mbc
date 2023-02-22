from django.http import JsonResponse, HttpRequest
from django.shortcuts import render
from django.core import serializers
from django.utils import timezone

from voucher.models import Voucher, VoucherCondition, VoucherDiscount

# Create your views here.
def get_auto_apply_voucher(request):
    current_time = timezone.now()
    vouchers = Voucher.objects.filter(
        start_at__lte = current_time,
        expired_at__gte = current_time, 
        auto_apply = True
    ).exclude(discount__for_field__in=[VoucherDiscount.FOR_DELIVERY_FEE, VoucherDiscount.FOR_LOGO_TEXT_FEE])

    result = []

    for voucher in vouchers:
        t = voucher.condition.is_valid(request.GET.dict())
        if t:
            result.append({
                'name': voucher.name,
                'value': voucher.discount.value,
                'by_percent': voucher.discount.by_percent,
                'for_field': voucher.discount.for_field,
                'is_include_deli_fee': voucher.discount.is_include_deli_fee,
            })

    return JsonResponse(result, safe = False)


def get_vouchers(request: HttpRequest):
    contexts = request.GET.getlist('context')
    auto_apply = request.GET.get('auto_apply')
    current_time = timezone.now()
    vouchers = Voucher.objects.filter(
        start_at__lte = current_time,
        expired_at__gte = current_time, 
        auto_apply = True,
        context__in = contexts
    )
    # .exclude(discount__for_field__in=[VoucherDiscount.FOR_DELIVERY_FEE, VoucherDiscount.FOR_LOGO_TEXT_FEE])
    result = [voucher.get_dict() for voucher in vouchers]

    # print(context)
    return JsonResponse(result, safe = False)