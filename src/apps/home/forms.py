from django import forms
from .models import ContactMessage
from django.forms import ModelForm, TextInput, Textarea


class ContactForm(ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name' : TextInput(attrs={'class': 'input', 'placeholder':'Your Name'}),
            'subject' : TextInput(attrs={'class': 'input', 'placeholder':'Subject'}),
            'email' : TextInput(attrs={'class': 'input', 'placeholder':'Your Email'}),
            'message' : Textarea(attrs={'class': 'input', 'placeholder':'Your Message', 'rows':'5'}),
        }