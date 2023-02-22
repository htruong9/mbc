from django import forms
from django.forms import ModelForm, TextInput, Textarea, Form
from .models import *


class SearchForm(Form):
    keyword = forms.CharField(max_length=100)


class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ['subject', 'review', 'rating']