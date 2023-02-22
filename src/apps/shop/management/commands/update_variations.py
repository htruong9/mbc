import csv
from django.core.management.base import BaseCommand
from shop.models import *
from django.utils import timezone


class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."


    def add_arguments(self, parser):
        parser.add_argument('--file', default='.csv/variants.csv', type=str,)


    def handle(self, *args, **options):
        start_time = timezone.now()
        # upload data
        with open(options.get('file'), "r") as csv_file:
            data = list(csv.reader(csv_file, delimiter=","))

            for i, row in enumerate(data[1:]):
                print(f" Creating variants: {i}/{len(data)-1}", end="\r")
                
                product = Product.objects.filter(product_group=row[2])
                colour = Colour.objects.get_or_create(title=row[3], primary_colour=row[4])
                size = Size.objects.get_or_create(title=row[6])
                gallery = ProductGallery.objects.filter(title=row[1])

                variant = Variants(
                    title=row[0],
                    product=product[0],
                    colour=colour[0],
                    size=size[0],
                    image_gallery=gallery[0],
                    price=row[7]
                )
                
                variant.save()
            #     variants.append(variant)
            #     if len(variants) > 5000:
            #         Variants.objects.bulk_create(variants)
            #         variants = []
            # if variants:
            #     Variants.objects.bulk_create(variants)

        # time
        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"Loading CSV took: {(end_time - start_time).total_seconds()} seconds."
            )
        )
