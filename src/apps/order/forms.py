from django import forms


class OrderForm(forms.Form):
    first_name = forms.CharField(required=True, error_messages={'required': 'First name is required!'})
    last_name = forms.CharField(required=True, error_messages={'required': 'Last name is required!'})
    phone = forms.CharField(required=True, error_messages={'required': 'Phone number is required!'})
    email = forms.CharField(required=True, error_messages={'required': 'Email is required!'})
    country = forms.CharField(required=True, error_messages={'required': 'Country is required!'})
    address_line_1 = forms.CharField(required=True, error_messages={'required': 'Address is required!'})
    city = forms.CharField(required=True, error_messages={'required': 'Town/City is required!'})
    state = forms.CharField(required=True, error_messages={'required': 'Country/State is required!'})
