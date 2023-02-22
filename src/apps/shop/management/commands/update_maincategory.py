import csv
from django.core.management.base import BaseCommand
from shop.models import *
from django.utils import timezone


class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."

    def add_arguments(self, parser):
        parser.add_argument('--file', default='.csv/main_category.csv', type=str)

    def handle(self, *args, **options):
        start_time = timezone.now()
        
        # upload data
        with open(options.get('file') , "r") as csv_file:
            data = list(csv.reader(csv_file, delimiter=","))

            for i, row in enumerate(data[1:]):
                print(f' Add maincategory {i+1}/{len(data)-1}', end='\r')
                
                if Category.objects.filter(category_name=row[0]).count() == 0:
                    category = Category.objects.create(
                        category_name=row[0]
                    )
                    
                    category.save()
                    

        # create slugs for categories and products:
        # categories = Category.objects.all()

        # for i, category in enumerate(categories):
        #     print(f' Save maincategory {i+1}/{len(categories)}', end='\r')
        #     category.save()

        # time
        end_time = timezone.now()
        
        self.stdout.write(
            self.style.SUCCESS(
                f"Add maincategory ({(end_time - start_time).total_seconds()} sec)"
            )
        )
