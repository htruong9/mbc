import csv
from ...models import Product
from shop.models import Position


from django.core.management.base import BaseCommand
from shop.models import Fee

class Command(BaseCommand):
     
    def handle(self, *args, **options):
        Position.objects.all().delete()
        
        data_title = {
            Position.RIGHT_BREAST: 'Right Breast',
            Position.LEFT_BREAST: 'Left Breast',
            Position.RIGHT_ARM: 'Right Arm',
            Position.LEFT_ARM: 'Left Arm',
            Position.NAPE_NECK: 'Nape of Neck',
            Position.LARGE_LOGO_FRONT: 'Large Logo Front',
            Position.LARGE_TEXT_FRONT: 'Large Text Front',
            Position.LARGE_LOGO_BACK: 'Large Logo Back',
            Position.LARGE_TEXT_BACK: 'Large Text Back',
            Position.STANDARD_LOGO: 'Standard Logo',
        }

        for pos in [Position.RIGHT_BREAST, Position.LEFT_BREAST, Position.RIGHT_ARM, Position.LEFT_ARM, Position.NAPE_NECK, Position.STANDARD_LOGO]:
            obj = Position()
            obj.position = pos
            obj.price = 0
            obj.additional_price = 1.75
            obj.name_price = 1.25
            obj.title = data_title[pos]
            obj.save()

        for pos in [Position.LARGE_LOGO_FRONT, Position.LARGE_LOGO_BACK]:
            obj = Position()
            obj.position = pos
            obj.price = 3
            obj.additional_price = 2.95
            obj.title = data_title[pos]
            obj.save()

        for pos in [Position.LARGE_TEXT_FRONT, Position.LARGE_TEXT_BACK]:
            obj = Position()
            obj.position = pos
            obj.price = 2
            obj.additional_price = 2.95
            obj.title = data_title[pos]
            obj.save()
            
        self.stdout.write(
            self.style.SUCCESS(
                f"Created all Positions"
            )
        )
