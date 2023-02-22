from .models import *


def menu_links(request):
    categories = Category.objects.all()
    brands = Brand.objects.all()
    colours = Variants.objects.distinct().values('colour__title', 'colour_id', 'colour__colour_code')
    sizes = Size.objects.all()

    context = {
        'categories': categories,
        'brands': brands,
        'colours': colours,
        'sizes': sizes,
    }
    return dict(context)