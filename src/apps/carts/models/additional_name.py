from django.db import models
from shop.models import Position

class AdditionalNameManager(models.Manager):
    def create(
            self,
            value: str,
            positions: list,
            *args, **kwargs):

        model_item: AdditionalName = super(AdditionalNameManager, self).create(value=value)
        model_item.save()
        for position_id in positions:
            model_item.positions.add(Position.objects.get(id=position_id))
        model_item.save()
        return model_item

class AdditionalName(models.Model):
    value = models.CharField(max_length=100, null=True, blank=True)
    positions = models.ManyToManyField(Position)

    objects = AdditionalNameManager()