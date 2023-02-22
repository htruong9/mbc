from decimal import Decimal
from django.templatetags.static import static
from accounts.models import Logo
from common.models import *
from django.core import serializers
from django.core.paginator import Paginator
from django.db.models import Max, Min, Q, QuerySet
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.http import HttpRequest
from order.models import *
from shop.forms import *
from shop.models import *
from src.common.breadcrumb_path import BreadcrumbPath


# Shop
def shop(request):
    # Get query params
    page = request.GET.get('page', 1)

    params = {}
    params_key__single = ['brand', 'category', 'min_price', 'max_price']
    params_key__multi = ['gender', 'size', 'colour']
    for key in params_key__single:
        params[key] = request.GET.get(key)
    for key in params_key__multi:
        params[key] = request.GET.getlist(key)

    args = {'is_available': True}
    # args['position'] = 'L R'
    if params['brand'] != None: args['brand'] = params['brand']
    if params['category'] != None: args['category'] = params['category']
    if params['min_price'] != None: args['price__gte'] = Decimal(params['min_price'])
    if params['max_price'] != None: args['price__lte'] = params['max_price']
    if len(params['gender']) > 0: args['gender__in'] = params['gender']
    if len(params['size']) > 0: args['variants__size_id__in'] = params['size']
    if len(params['colour']) > 0: args['variants__colour_id__in'] = params['colour']

    # args['gender__in'] = [3]
    products = Product.objects.all().filter(
        **args
    ).order_by('id').distinct()

    min_price = Variants.objects.aggregate(Min('price'))
    max_price = Variants.objects.aggregate(Max('price'))
    paginator = Paginator(products, 60)
    paged_products = paginator.get_page(page)
    product_count = products.count()
    page_object = paginator.get_page(page)
    page_object.adjusted_elided_pages = paginator.get_elided_page_range(page)

    context = {
        'products': paged_products,
        'product_count': product_count,
        'min_price': min_price,
        'max_price': max_price,
        'page_object': page_object,
    }

    return render(request, 'shop/shop.html', context)


# Category
def category_list(request):
    categories = Category.objects.all()

    context = {
        'categories': categories,
    }
    return render(request, 'shop/category_list.html', context)


# Brand
def brand_list(request):
    brands = Brand.objects.all().order_by('id')

    context = {
        'brands': brands,
    }
    return render(request, 'shop/brand_list.html', context)


# Product list according to category
def products_by_category(request, category_id, category_slug):
    categories = get_object_or_404(Category, id=category_id)
    products = Product.objects.filter(Q(category=categories) | Q(category2=categories), is_available=True)
    paginator = Paginator(products, 60)
    page = request.GET.get('page')
    paged_products = paginator.get_page(page)
    product_count = products.count()

    context = {
        'products': paged_products,
        'product_count': product_count,
    }
    return render(request, 'shop/shop.html', context)


# Product list according to brand
def products_by_brand(request, brand_id):
    brands = get_object_or_404(Brand, id=brand_id)
    products = Product.objects.filter(brand=brands, is_available=True)
    paginator = Paginator(products, 60)
    page = request.GET.get('page')
    paged_products = paginator.get_page(page)
    product_count = products.count()

    context = {
        'products': paged_products,
        'product_count': product_count,
    }
    return render(request, 'shop/shop.html', context)


def _convert_positions(lst):
    for i, pos in enumerate(lst):
        if pos == 'BF': lst[i] = 'LF'
        elif pos == 'BB': lst[i] = 'LB'
    return lst


# Product detail
def product_detail(request: HttpRequest, product_id, product_slug):
    product = Product.objects.get(id=product_id)
    

    query = request.GET.get('q') #TODO: deprecated
    LOGO_FEE = Fee.objects.get(name=Fee.Logo).price
    TEXT_FEE = Fee.objects.get(name=Fee.Text).price
    logo_suggest = []
    has_any_ordered_success = False
    reviews = Review.objects.filter(product_id=product.id, status='True')
    product_gallery = ProductGallery.objects.filter(product_id=product_id)

    logos = []
    logos_alr_setup = []
    logos_not_setup = []
    if request.user.is_authenticated:
        logos = [logo for logo in Logo.objects.filter(user_id=request.user).order_by('-is_setup') if logo.is_exists]
        logos_alr_setup = []
        logos_not_setup = []
        for logo in logos:
            if logo.is_setup: logos_alr_setup.append(logo)
            else: logos_not_setup.append(logo)

        logo_suggest = [obj for obj in Logo.objects.filter(user_id=request.user) if obj.is_exists == True]
        has_any_ordered_success = Order.objects.filter(user=request.user, status=Order.COMPLETE).exists()
        for logo in logo_suggest:
            # Check if image in Order is ordered, then set attribute
            # is_logo_ordered = int(Order.objects.all().filter(user=request.user, order_detail__require_logo_text__logo_id=logo.id, status=Order.COMPLETE).exists())
            is_logo_ordered = False
            setattr(logo, 'ordered', is_logo_ordered)

    try:
        positions = product.positions.all()
        positions = _convert_positions(positions)
        positions = Position.objects.filter(position__in = positions)
    except Exception as e:
        raise e

    # Get the variation
    if product.variant != "None":
        variants: QuerySet = Variants.objects.filter(product_id=product_id)
        variants_json = serializers.serialize('json', variants)
        first_variant = variants.first()
        variant: Variants = first_variant
        variants_by_color = Variants.objects.raw('SELECT * FROM  shop_variants  WHERE product_id=%s GROUP BY colour_id', [product_id])
        variants_by_size = Variants.objects.raw('SELECT * FROM  shop_variants  WHERE product_id=%s GROUP BY size_id', [product_id])
        # variant = Variants.objects.get(id=variants[0].id)

    breadcrumb_path = BreadcrumbPath()
    breadcrumb_path.add('Home', reverse('home'), 'fa fa-home')
    breadcrumb_path.add(product.category.category_name, product.category.get_url())
    breadcrumb_path.end(product.product_name)

    context = {
        'breadcrumb_path': breadcrumb_path,
        'scripts': [static('js/product-detail.js')],

        'LOGO_FEE': LOGO_FEE,
        'TEXT_FEE': TEXT_FEE,
        'product': product,
        'reviews': reviews,
        'product_gallery': product_gallery,
        # 'order_product': order_product,
        # 'in_cart': in_cart,
        'variants': variants,
        'variants_json': variants_json,
        'first_variant': first_variant,
        'variant': variant,
        'variants_by_size': variants_by_size,
        'variants_by_color': variants_by_color,
        # 'colors': colors,
        'query': query,

        'logos': logos,
        'logo_suggest': logo_suggest or [],
        'logos_alr_setup': logos_alr_setup or [],
        'logos_not_setup': logos_not_setup or [],
        'has_any_ordered_success': has_any_ordered_success,
        'positions': positions
    }

    path_home = reverse('home')

    
    return render(request, 'shop/product_detail/index.html', context)

def product_detail_old(request, product_id, product_slug):
    logo_suggest = []
    has_any_ordered_success = False
    query = request.GET.get('q')
    try:
        product = Product.objects.get(id=product_id)
        positions = product.positions.all()
        positions = _convert_positions(positions)
        positions = Position.objects.filter(position__in = positions)
        # in_cart = CartItem.objects.filter(cart__cart_id=_cart_id(request), product=product).exists()
    except Exception as e:
        raise e

    if request.user.is_authenticated:
        try:
            # Get all image in ImageUpload by user_id, check if image exist in storage
            logo_suggest = [obj for obj in Logo.objects.filter(user_id=request.user) if obj.is_exists == True]

            # If False, force user select
            has_any_ordered_success = Order.objects.filter(user=request.user, status=Order.COMPLETE).exists()
            print(f'has_any_ordered_success: {has_any_ordered_success}')
            orders = Order.objects.filter(user = request.user)

            for logo in logo_suggest:
                # Check if image in Order is ordered, then set attribute
                # is_logo_ordered = int(Order.objects.all().filter(user=request.user, order_detail__require_logo_text__logo_id=logo.id, status=Order.COMPLETE).exists())
                is_logo_ordered = False
                setattr(logo, 'ordered', is_logo_ordered)

            # order_product = CartItem.objects.filter(user=request.user, product_id=product.id).exists()
            order_product = None
        except Order.DoesNotExist:
            order_product = None
    else:
        order_product = None

    # Get the reviews
    reviews = Review.objects.filter(product_id=product.id, status='True')

    # Get the product gallery
    product_gallery = ProductGallery.objects.filter(product_id=product_id)

    # Get the variation
    if product.variant != "None":  # Product have variants
        if request.method == 'POST':  # if we select color
            variant_id = request.POST.get('variantid')
            variant = Variants.objects.get(id=variant_id)  # selected product by click color radio
            colours = Variants.objects.filter(product_id=product_id, size_id=variant.size_id)
            sizes = Variants.objects.raw('SELECT * FROM  shop_variants  WHERE product_id=%s GROUP BY size_id', [product_id])
            query += variant.title + ' Size:' + str(variant.size) + ' Colour:' + str(variant.colour)
        else:
            variants = Variants.objects.filter(product_id=product_id)
            colours = Variants.objects.filter(product_id=product_id, size_id=variants[0].size_id)
            sizes = Variants.objects.raw('SELECT * FROM  shop_variants  WHERE product_id=%s GROUP BY size_id', [product_id])
            variant = Variants.objects.get(id=variants[0].id)

    context = {
        'product': product,
        'reviews': reviews,
        'product_gallery': product_gallery,
        'order_product': order_product,
        # 'in_cart': in_cart,
        'variant': variant,
        'sizes': sizes,
        'colours': colours,
        'query': query,

        'logo_suggest': logo_suggest or [],
        'has_any_ordered_success': has_any_ordered_success,
        'positions': positions
    }

    print(f'variant.colour_id: {variant.colour_id}')
    # print(f"Size: {serializers.serialize('json', variant)}")
    # print(f"in_cart: {serializers.serialize('json', in_cart)}")

    return render(request, 'shop/product_detail.html', context)


# search
def search(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            keyword = form.cleaned_data['keyword']  # get form input data
            if keyword:
                products = Product.objects.order_by('-created_date').filter(Q(description__icontains=keyword) | Q(product_name__icontains=keyword))
                product_count = products.count()

            context = {
                'products': products,
                'product_count': product_count,
            }
            return render(request, 'shop/shop.html', context)
    return redirect('shop')





