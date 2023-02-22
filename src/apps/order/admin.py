from django.contrib import admin
from .models import Payment, Order, CartItem

# class OrderProductInline(admin.TabularInline):
#     model = Order
#     readonly_fields = ('payment', 'user', 'total')
#     extra = 0

@admin.action(description='Cancel order')
def cancel_order(modeladmin, request, queryset):
    queryset.update(status=Order.CANCELLED)

@admin.action(description='Complete order')
def complete_order(modeladmin, request, queryset):
    cart_item: CartItem
    for order in queryset:
        for cart_item in order.cart_items.all():
            for logo_text in [cart_item.main_logo_text, cart_item.additional_logo_text]:
                if logo_text.type == logo_text.TYPE_LOGO:
                    logo = logo_text.logo
                    logo.is_setup = True
                    logo.save()
    queryset.update(status=Order.COMPLETE)

@admin.action(description='Delete order (use this instead of "Delete selected orders")')
def delete_order(modeladmin, request, queryset):
    order: Order
    for order in queryset:
        order.cart_items.clear()
        order.delete()


class OrderAdmin(admin.ModelAdmin):
    # list_display = ['order_number', 'first_name', 'phone', 'email', 'city', 'order_total', 'tax', 'status', 'is_ordered', 'created_at']
    model = Order
    list_display = ['created_at', 'updated_at', 'order_number', 'status', 'sub_total', 'total']
    list_filter = ['status']
    search_fields = ['order_number', 'first_name', 'last_name', 'phone', 'email']
    list_per_page = 20
    actions = [cancel_order, complete_order, delete_order]
    # inlines = [OrderProductInline]

# admin.site.register(Payment)
# admin.site.register(OrderProduct)
admin.site.register(Order, OrderAdmin)