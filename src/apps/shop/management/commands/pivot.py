import csv
from django.core.management.base import BaseCommand
from shop.models import *
from django.utils import timezone


class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        start_time = timezone.now()
        # upload data
        with open('csv/pivot_category.csv', "r") as csv_file:
            data = list(csv.reader(csv_file, delimiter=","))

            products = []
            DATA_LENGTH = len(data[1:])
            print("Creating products ...")
            for i, row in enumerate(data[1:]):
                print(f"\t{i}/{DATA_LENGTH}", end="\r")
                genders = Gender.objects.get_or_create(title=row[1])
                brands = Brand.objects.get_or_create(brand_name=row[6])
                categories = Category.objects.filter(category_name=row[3], parent__category_name=row[2])
                category2 = Category.objects.filter(category_name=row[5], parent__category_name=row[4])

                product = Product(
                    product_group=row[0],
                    images=row[19],
                    gender=genders[0],
                    category=categories[0],
                    brand=brands[0],
                    product_name=row[7],
                    detail=row[8],
                    description=row[9],
                    washing=row[14],
                    fabric=row[15],
                    weight=row[16],
                    price=row[20],
                    
                    slug=row[0].lower(),
                    category2=category2[0] if category2 else None,
                    variant=row[21],
                )
                product.save()
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
                # products.append(product)
                # if len(products) > 5000:
                #     Product.objects.bulk_create(products)
                #     products = []

            # if products:
            #     Product.objects.bulk_create(products)
            #
            # # create slugs for categories and products:
            # products = Product.objects.all()
            #
            # for product in products:
            #     product.save()

            # time
            end_time = timezone.now()
            self.stdout.write(
                self.style.SUCCESS(
                    f"Loading CSV took: {(end_time - start_time).total_seconds()} seconds."
                )
            )


# Product.objects.all().delete()
# # Command().handle()
# "exec(open('shop/management/commands/pivot.py').read())"
