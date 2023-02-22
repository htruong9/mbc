import json
from django.http import HttpRequest

from carts.models.additional_name import AdditionalName
from carts.models.cart_item import CartItem
from carts.models.logotext import MainLogoText, AdditionalLogoText
from common.utils import is_false, parse_boolean
from shop.models import Position

class CartManager:

    # CREATE
    def create_one(data: dict):
        cart = CartItem()
        cart.user_id = data['user'].id

        cart.product_id = data['Product__id']
        cart.variant_id = data['Variant__id']
        cart.colour_id = data['Colour__id']
        cart.size_id = data['Size__id']
        cart.quantity = int(data['Quantity'])

        cart.save()

        position = json.loads(data['Position'])

        # Require logo/text
        if 'Require_logo_text__is_require' in data:
            tmp = data['Require_logo_text__is_require']
            if parse_boolean(tmp):
                tmp = data['Require_logo_text__selected']
                logo_text = MainLogoText()
                if tmp == 'logo':
                    logo_text.is_logo = True
                    img_id = data['Require_logo_text__image_id']
                    if is_false(img_id):
                        logo_text.set_logo( data['Require_logo_text__file'], data['user'].id )
                    else:
                        logo_text.logo_id = img_id
                elif tmp == 'text':
                    logo_text.is_text = True
                    logo_text.text = data['Require_logo_text__text']
                    logo_text.font = data['Require_logo_text__font']
                    logo_text.color = data['Require_logo_text__color']

                logo_text.price = data['Require_logo_text__price']
                logo_text.save()

                pos = {k:v for (k,v) in position.items() if v['type'] == 'main'}
                for e in pos.keys():
                    logo_text.positions.add(Position.objects.get(position = e))
                
                logo_text.save()
                cart.require_logo_text = logo_text

        # Additional positions
        
        pos = {k:v for (k,v) in position.items() if v['type'] == 'Additional position'}
        for e in pos.keys():
            cart.additional_positions.add(Position.objects.get(position = e))

        # Additional logo/text
        tmp = data['Additional_logo_text__selected']
        if not is_false(tmp):
            logo_text = AdditionalLogoText()
            if tmp == 'logo':
                logo_text.is_logo = True
                img_id = data['Additional_logo_text__image_id']
                if is_false(img_id):
                    logo_text.set_logo( data['Additional_logo_text__file'], data['user'].id )
                else:
                    logo_text.logo_id = img_id
            elif tmp == 'text':
                logo_text.is_text = True
                logo_text.text = data['Additional_logo_text__text']
                logo_text.font = data['Additional_logo_text__font']
                logo_text.color = data['Additional_logo_text__color']
            logo_text.price = data['Additional_logo_text__price']

            logo_text.save()

            pos = {k:v for (k,v) in position.items() if v['type'] == 'Additional logo text'}
            for e in pos.keys():
                logo_text.positions.add(Position.objects.get(position = e))
            
            logo_text.save()
            cart.additional_logo_text = logo_text

        # Additional name
        tmp = data['Additional_name__selected']
        if parse_boolean(tmp):
            additional_name = AdditionalName()
            additional_name.name = data['Additional_name__name']
            additional_name.save()
            cart.additional_name = additional_name

            pos = data['Additional_name__positions']
            pos = json.loads(pos)
            for e in pos.keys():
                additional_name.positions.add(Position.objects.get(position = e))

        cart.save()
        
        cart.set_prices()

    def create_many(lst: list):
        for data in list():
            CartManager.create_one(data)


    # UPDATE
    """
        - field foo__bar__baz  =>  foo.bar.baz
        - Example data:
            {
                'user': 1,
                'update': 
                    [
                        {
                            "id": 1,
                            "field": "quantity",
                            "new_value": 4
                        },
                        {
                            "id": 2,
                            "field": "additional_name__name"
                            "new_value": 'foo'
                        },
                    ]
            }
            
            =>
                <Cart id=1>.quantity = 4
                <Cart id=2>.additional_name.name = 'foo'
        """
    def update_one(data): 
        carts = CartItem.objects.filter(user=data['user'])
        res_json = {}
        res_json['updated'] = []
        res_json['failed'] = []
        for e in data['update']:
            try:
                e = json.loads(e)
                item = carts.get(id = e['id'])

                fields = e['field'].split('__')
                tmp = item
                for i in range( 0, len(fields)-1 ):
                    tmp = getattr(tmp, fields[i])

                setattr(tmp, fields[-1], e['new_value'])
                tmp.save()
                item.set_prices()
                res_json['updated'].append(e)
            except Exception as exc:
                print(f'exc: {exc}')
                res_json['failed'].append({
                    'data': e,
                    'exception': str(exc)
                })
        return res_json

    # update_many mean update many user, not many field
    def update_many(lst):
        res_json = []
        for data in lst:
            res_json.append( CartManager.update_one(data) )
        return res_json
            

    def delete(ids: list):
        carts = CartItem.objects.filter(user=user)
        res_json = {}

        is_deleted = False
        try:
            order_id = ids
            carts.filter(pk__in=order_id).delete()
            is_deleted = True
        except:
            pass
        return ({
                "order_id": order_id,
                "is_deleted": is_deleted,
            })