from django.core.management.base import BaseCommand
from home.models import Setting

class Command(BaseCommand):
    def handle(self, *args, **options):
        Setting.objects.all().delete()

        setting = Setting(
            title = 'Example title',
            keywords = 'Example keywords',
            description = 'Example description',
            company = 'Example company',
            address = 'Example address',
            phone = 'Example phone',
            fax = 'Example fax',
            email = 'Example email',
            about_us = 'Example about_us',
            contact = 'Example contact',
            references = 'Example references',
            status = True,
        )

        setting.save()
