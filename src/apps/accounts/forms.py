from django import forms
from .models import Account


class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter Password',
        'class': 'form-control',
    }))
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Confirm Password'
    }))

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'phone_number', 'email', 'password']


    def clean(self):
        cleaned_data = super(RegistrationForm, self).clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password != confirm_password:
            raise forms.ValidationError(
                "Password does not match!"
            )

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        self.fields['first_name'].widget.attrs['placeholder'] = 'Enter First Name'
        self.fields['last_name'].widget.attrs['placeholder'] = 'Enter last Name'
        self.fields['phone_number'].widget.attrs['placeholder'] = 'Enter Phone Number'
        self.fields['email'].widget.attrs['placeholder'] = 'Enter Email Address'
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'


class EditProfileForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'phone_number', 'profile_picture', 
        'address_line_1', 'address_line_2', 'city', 'county', 'country']

        labels = {
            "first_name": "First name",
            "last_name": "Last name",
            "phone_number": "Phone number",
            "profile_picture": "Profile picture",
            "address_line_1": "Address line 1",
            "address_line_2": "Address line 2",
            "city": "City",
            "county": "County",
            "country": "Country",
        }

    def __init__(self, *args, **kwargs):
        initial = kwargs.pop('initial', {})
        user = kwargs.pop('user')

        for key in self.Meta.fields:
            if key in ['profile_picture']: continue
            if hasattr(user, key):
                initial[key] = initial.get(key) or getattr(user, key)
        kwargs['initial'] = initial

        super(EditProfileForm, self).__init__(*args, **kwargs)

        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'

    def clean(self):
        pass


class ChangePasswordForm(forms.ModelForm):
    old_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter old password',
        'class': 'form-control',
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter new password',
        'class': 'form-control',
    }))
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter confirm password',
        'class': 'form-control',
    }))

    field_order = ['old_password', 'password', 'confirm_password']

    class Meta:
        model = Account
        fields = ['password']

    def __init__(self, *args, **kwargs):
        super(ChangePasswordForm, self).__init__(*args, **kwargs)
        self.fields['old_password'].label = "Your old password"
        self.fields['password'].label = "Enter new password"
        self.fields['confirm_password'].label = "Confirm your password"


    def clean(self):
        cleaned_data = super(ChangePasswordForm, self).clean()
        user: Account = self.instance

        old_password = cleaned_data.get('old_password')
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if not user.check_password(old_password):
            self._errors['old_password'] = self.error_class([
                "Wrong password!"])

        if len(password) < 6:
            self._errors['password'] = self.error_class([
                "Minimum 6 characters required!"])

        if password != confirm_password:
            self._errors['confirm_password'] = self.error_class([
                "Password does not match!"])

        return self.cleaned_data

