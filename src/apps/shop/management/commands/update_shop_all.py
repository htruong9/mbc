from django.core.management.base import BaseCommand
from shop.models import *
import sys


class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."


    def add_arguments(self, parser):
        parser.add_argument('--file', default='.csv/variants.csv', type=str,)


    def handle(self, *args, **options):
        commands = [
                'update_positions',
                'update_fee',
                
                'update_maincategory',
                'update_subcategory',  
                
                'update_product',    
                
                'update_productgallery',
                'update_variations',
                
                # 'pivot',
            ] 

        for command in commands:
            exec(f"from . import {command}")
            exec(f"{command}.Command().run_from_argv([sys.argv[0], 'manage.py'])")
