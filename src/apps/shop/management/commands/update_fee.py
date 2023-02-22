from django.core.management.base import BaseCommand
from shop.models import Fee

class Command(BaseCommand):
    def handle(self, *args, **options):
        Fee.objects.all().delete()

        data = [
            [Fee.Logo, 14.95],
            [Fee.Text, 0.00],
            [Fee.Delivery, 7.99]
        ]

        for e in data:
            r = Fee()
            r.name = e[0]
            r.price = e[1]
            r.save()
            
        self.stdout.write(
            self.style.SUCCESS(
                f"Created all Fee"
            )
        )
