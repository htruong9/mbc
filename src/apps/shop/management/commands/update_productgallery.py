import csv
from django.core.management.base import BaseCommand
from shop.models import *
from django.utils import timezone


class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."

    def add_arguments(self, parser):
        parser.add_argument('--file', default='.csv/product_gallery.csv', type=str,)
        

    def handle(self, *args, **options):
        start_time = timezone.now()
        
        # upload data
        with open(options.get('file') , "r") as csv_file:
            data = list(csv.reader(csv_file, delimiter=","))
            
            for i, row in enumerate(data[1:]):
                print(f' Update productgallery {i+1}/{len(data)-1}', end='\r')
                product = Product.objects.filter(product_group=row[1])

                product_gallery, _ = ProductGallery.objects.update_or_create(
                    title=row[0],
                    defaults={
                        'title': row[0],
                        'product': product[0],
                        'image': row[2] 
                    }
                    
                )

                # product_gallery = ProductGallery(
                #     title=row[0],
                #     product=product[0],
                #     image=row[2]
                # )
                
                product_gallery.save()
           
            # time
            end_time = timezone.now()
            
            self.stdout.write(
                self.style.SUCCESS(
                    f"Updated productgallery ({(end_time - start_time).total_seconds()}sec)"
                )
            )

