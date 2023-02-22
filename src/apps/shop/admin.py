from django.contrib import admin
from .models import *
import admin_thumbnails
from mptt.admin import DraggableMPTTAdmin


@admin_thumbnails.thumbnail('image')
class ProductGalleryInline(admin.TabularInline):
    model = ProductGallery
    readonly_fields = ('id',)
    extra = 1


class ProductVariationInline(admin.TabularInline):
    model = Variants
    readonly_fields = ('image_tag',)
    extra = 1


# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'slug')


class CategoryAdmin2(DraggableMPTTAdmin):
    mptt_indent_field = "category_name"
    list_display = ('id', 'tree_actions', 'indented_title',
                    'related_products_count', 'related_products_cumulative_count')
    list_display_links = ('indented_title',)
    prepopulated_fields = {'slug': ('category_name',)}

    def get_queryset(self, request):
        qs = super().get_queryset(request)

        # Add cumulative product count
        qs = Category.objects.add_related_count(
                qs,
                Product,
                'category',
                'products_cumulative_count',
                cumulative=True)

        # Add non cumulative product count
        qs = Category.objects.add_related_count(qs,
                 Product,
                 'category',
                 'products_count',
                 cumulative=False)
        return qs

    def related_products_count(self, instance):
        return instance.products_count
    related_products_count.short_description = 'Related products (for this specific category)'

    def related_products_cumulative_count(self, instance):
        return instance.products_cumulative_count
    related_products_cumulative_count.short_description = 'Related products (in tree)'


class ColourAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'colour_bg')


@admin_thumbnails.thumbnail('image')
class ProductGalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'image', 'image_thumbnail']


class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('product_group',)}
    readonly_fields = ('image_tag',)
    list_display = ('id', 'product_group', 'brand', 'product_name', 'category', 'image_tag', 'modified_date', 'is_available')
    inlines = [ProductVariationInline, ProductGalleryInline]


class VariantAdmin(admin.ModelAdmin):
    list_display = ('title', 'product', 'colour', 'size', 'price', 'is_active')


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['subject', 'review', 'status', 'created_at']
    list_filter = ['status']
    readonly_fields = ('subject', 'review', 'ip', 'user', 'product', 'rating', 'id')


admin.site.register(Brand)
admin.site.register(Size)
admin.site.register(Gender)
admin.site.register(Colour, ColourAdmin)
admin.site.register(Category, CategoryAdmin2)
admin.site.register(Product, ProductAdmin)
admin.site.register(Variants, VariantAdmin)
admin.site.register(ProductGallery, ProductGalleryAdmin)
admin.site.register(Review, ReviewAdmin)