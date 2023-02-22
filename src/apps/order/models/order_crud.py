# from orders.models.order import Order
# from orders.models.order_receiver import ReceiverInfo


# class OrderCRUD:
#     def create_one(data):
#             # Store all the billing information inside Order table
#         order = Order()
#         order.user = data['user']
        
#         # bill.county = data['county']
#         order.note = data['order_note']
#         # order.total = grand_total
#         order.tax = data['tax']
#         order.ip = data['ip']

#         bill = ReceiverInfo()
#         bill.first_name = data['bill__first_name']
#         bill.last_name = data['bill__last_name']
#         bill.phone = data['bill__phone']
#         bill.email = data['bill__email']
#         bill.address_line_1 = data['bill__address_line_1']
#         bill.address_line_2 = data['bill__address_line_2']
#         bill.country = data['bill__country']
#         bill.city = data['bill__city']

#         data.save()
#         # Generate order number
#         yr = int(datetime.date.today().strftime('%Y'))
#         dt = int(datetime.date.today().strftime('%d'))
#         mt = int(datetime.date.today().strftime('%m'))
#         d = datetime.date(yr, mt, dt)
#         current_date = d.strftime("%Y%m%d")  # 20210305
#         order_number = current_date + str(data.id)
#         data.order_number = order_number
#         data.save()

#         order = order.objects.get(user=current_user, is_ordered=False, order_number=order_number)