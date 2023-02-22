import csv
from django.core.management.base import BaseCommand
from shop.models import *
from django.utils import timezone


class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."

    def add_arguments(self, parser):
        parser.add_argument('--file', default='.csv/sub_category.csv', type=str,)

    def handle(self, *args, **options):
        start_time = timezone.now()
        
        with open(options.get('file'), "r") as csv_file:
            data = list(csv.reader(csv_file, delimiter=","))

            for i, row in enumerate(data[1:]):
                print(f' Update sub_category {i+1}/{len(data)-1}', end='\r')
                
                if Category.objects.filter(category_name=row[1]).count() == 0:
                    parent = Category.objects.get_or_create(
                        category_name=row[0]
                    )
                    parent_category = Category.objects.filter(category_name=row[0])

                    category = Category.objects.create(
                        category_name = row[1],
                        parent = parent_category[0]
                    )
                    
                    category.save()
                # categories = Category.objects.filter(category_name=row[0])
                # Category.objects.create(category_name = row[1])

        # create slugs for categories and products:
        # categories = Category.objects.all()

        # for category in categories:
        #     category.save()

        # time
        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"Updated all sub_category ({(end_time - start_time).total_seconds()} sec)"
            )
        )
