from django.db import models


class ReceiverInfo(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=50)
    address_line_1 = models.CharField(max_length=50)
    address_line_2 = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    ip = models.CharField(blank=True, max_length=20)

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    @property
    def full_address(self):
        return f'{self.address_line_1} {self.address_line_2}'
