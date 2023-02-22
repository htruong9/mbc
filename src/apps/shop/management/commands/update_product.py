import csv
from django.core.management.base import BaseCommand
from shop.models import *
from django.utils import timezone
from decimal import Decimal
from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."

    def add_arguments(self, parser):
        parser.add_argument('--file', default='.csv/products.csv' , type=str,)

    def handle(self, *args, **options):
        start_time = timezone.now()
                
        # upload data
        with open(options.get('file'), "r") as csv_file:
            data = list(csv.reader(csv_file, delimiter=","))

            for i, row in enumerate(data[1:]):
                print(f' Add product {i+1}/{len(data)-1}', end='\r')
                
                genders = Gender.objects.get_or_create(title=row[1])
                brands = Brand.objects.get_or_create(brand_name=row[6])
                
                category = Category.objects.filter(category_name=row[3], parent__category_name=row[2])
                category2 = Category.objects.filter(category_name=row[5], parent__category_name=row[4])
                                
                product: Product
                
                # try 
                product, _ = Product.objects.get_or_create(
                    product_group=row[0],
                    defaults={
                        'product_group': row[0], 
                        'gender': genders[0],
                        'category': category[0],
                        'brand': brands[0],
                        'product_name': row[7],
                        'detail': row[8],
                        'description': row[9],
                        'washing': row[14],
                        'fabric': row[15],
                        'weight': row[16],
                        'images': row[19],
                        'price': Decimal(row[20]),
                        
                        'slug': row[0].lower(),
                        'category2': category2[0] if category2 else None,
                        'variant': row[21],
                    }
                    
                )
                
                positions = row[22].split(' ')
                for pos in positions:
                    if pos == 'BF':
                        pos = 'LF'
                    elif pos == 'BB':
                        pos = 'LB'
                    else:
                        pos = pos
                        
                    product.positions.add(Position.objects.get(position=pos))

                product.save()
                

        # create slugs for categories and products:
        # categories = Category.objects.all()
        # products = Product.objects.all()
        
        # for category in categories:
        #     category.save()

        # for product in products:
        #     product.save()

        # time
        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"Updated all products ({(end_time - start_time).total_seconds()} sec)"
            )
        )
