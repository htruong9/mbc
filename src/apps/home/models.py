from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models

# Create your models here.
from django.forms import ModelForm, TextInput, Textarea
from django.http import request
from django.utils.html import mark_safe


class Setting(models.Model):
    title = models.CharField(max_length=150, blank=True)
    keywords = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    company = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    fax = models.CharField(max_length=15, blank=True)
    email = models.CharField(max_length=50, blank=True)
    about_us = RichTextUploadingField(blank=True)
    contact = RichTextUploadingField(blank=True)
    references = RichTextUploadingField(blank=True)
    status = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    STATUS = (
        ('New', 'New'),
        ('Read', 'Read'),
        ('Closed', 'Closed'),
    )
    name = models.CharField(blank=True,max_length=20)
    email = models.CharField(blank=True,max_length=50)
    subject = models.CharField(blank=True,max_length=50)
    message = models.TextField(blank=True,max_length=255)
    status = models.CharField(max_length=10,choices=STATUS,default='New')
    ip = models.CharField(blank=True, max_length=20)
    note = models.CharField(blank=True, max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name