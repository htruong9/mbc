from typing import Union
from accounts.models import Logo
from django.db import models
from django.core.files import File
from shop.models import Position

class LogoTextManager(models.Manager):
    def create(
            self,
            user_id: str,
            logo: Union[str, File],
            text: dict,
            positions: list,
            additional_positions: list = None,
            *args, **kwargs):
        model_item: Union[MainLogoText, AdditionalLogoText] = None

        if logo:
            type = BaseLogoText.TYPE_LOGO
            if isinstance(logo, str) and logo != '-1':
                logo_id = logo
            elif isinstance(logo, File):
                new_logo = Logo.objects.create(user_id=user_id, image=logo)
                logo_id = new_logo.id
            model_item = super(LogoTextManager, self).create(type=type, logo_id=logo_id)
            
        elif text:
            type = BaseLogoText.TYPE_TEXT
            value, font, color = [text.get(key, None)
                                  for key in ['value', 'font', 'color']]
            model_item = super(LogoTextManager, self).create(type=type, text=value, font=font, color=color)

        if model_item:
            model_item.save()

            for position_id in positions:
                model_item.positions.add(Position.objects.get(id=position_id))
            if additional_positions:
                for position_id in additional_positions:
                    model_item.additional_positions.add(Position.objects.get(id=position_id))
            return model_item


class BaseLogoText(models.Model):
    class Meta:
        abstract = True

    TYPE_LOGO = 'Logo'
    TYPE_TEXT = 'Text'
    TYPE = (
        ('Logo', 'Logo'),
        ('Text', 'Text'),
    )
    type = models.CharField(choices=TYPE, max_length=4)
    logo = models.ForeignKey(Logo, on_delete=models.SET_NULL, null=True) # TODO: set default logo
    text = models.CharField(max_length=100, null=True)
    font = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=7, default='#000000')
    positions = models.ManyToManyField(Position)


class MainLogoText(BaseLogoText):
    # position = models.ForeignKey(Position, on_delete=models.SET_NULL, null=True)
    additional_positions = models.ManyToManyField(
        Position, related_name='logo_text_additional_positions')
    objects = LogoTextManager()

class AdditionalLogoText(BaseLogoText):
    objects = LogoTextManager()
    # positions = models.ManyToManyField(Position, related_name='additional_logo_text_positions')
